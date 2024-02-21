'use client'

import { useCallback, useMemo, useState } from "react"
import Info from "./info"
import Participant from "./participants"
import Toolbar from "./toolbar"
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point, Side, XYWH } from "@/types/canvas"
import { useCanRedo, useCanUndo, useHistory, useMutation, useOthersMapped, useStorage } from "@/liveblocks.config"
import CursorsPresence from "./cursors-presence"
import { connectionIdToColor, pointerEventToCanvasPointer, resizeBound } from "@/lib/utils"

import { nanoid } from 'nanoid';
import { LiveObject } from "@liveblocks/client"
import LayerPreview from "./layer-preview"
import SelectionBox from "./selection-box"

const MAX_LAYERS = 100;

interface CanvasProps {
	boardId: string;
}

export default function Canvas({ boardId }: CanvasProps) {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  });

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    b: 125,
    g: 222,
    r: 155
  });

  const history = useHistory();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();
  const layerIds = useStorage((root) => root.layerIds);

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY
    }))
  }, []);

  const unselectLayers = useMutation((
    { self, setMyPresence }
  ) => {
    if (self.presence.selection.length) {
      setMyPresence({ selection: []}, { addToHistory: true });
    }
  }, [])

  const resizeSelectedLayer = useMutation((
    { storage, self},
    point: Point
  ) => {
    if (canvasState.mode !== CanvasMode.Resizing) {
      return;
    }

    const bounds = resizeBound(canvasState.initialBounds, canvasState.corner, point);

    const liveLayers = storage.get('layers');
    const layer = liveLayers.get(self.presence.selection[0]);

    if (layer) {
      layer.update(bounds);
    }
  }, [canvasState]);

  const translateSelectedLayers = useMutation((
    { storage, self },
    point: Point
  ) => {
    if (canvasState.mode !== CanvasMode.Translating) {
      return;
    }

    let offset = { x: 0, y: 0 };
    if (canvasState.current) {
      offset.x = point.x - canvasState.current.x;
      offset.y = point.y - canvasState.current.y;
    }

    const liveLayers = storage.get('layers');

    for (const id of self.presence.selection) {
      const layer = liveLayers.get(id);

      if (layer) {
        layer.update({
          x: layer.get('x') + offset.x,
          y: layer.get('y') + offset.y
        });
      }
    }

    setCanvasState({ mode: CanvasMode.Translating, current: point, origin: point })
  }, [canvasState]);

  const onPointerMove = useMutation(({setMyPresence}, e: React.PointerEvent) => {
    e.preventDefault();
    const current = pointerEventToCanvasPointer(e, camera);

    switch (canvasState.mode) {
      case CanvasMode.Translating:
        translateSelectedLayers(current);
        break;
      case CanvasMode.Resizing:
        resizeSelectedLayer(current);
        break;
      default:
        break;
    }

    setMyPresence({ cursor: current })
  }, [canvasState, resizeSelectedLayer, camera, translateSelectedLayers]);

  const onPointerLeave = useMutation((
    { setMyPresence }
  ) => {
    setMyPresence({ cursor: null })
  }, []);

  const insertLayer = useMutation((
    { storage, setMyPresence },
    layerType: LayerType.Ellipse | LayerType.Note | LayerType.Rectangle | LayerType.Text,
    position: Point
  ) => {
    const liveLayers = storage.get('layers');
    if (liveLayers.size > MAX_LAYERS) {
      return;
    }

    const liveLayerIds = storage.get('layerIds');
    const layerId = nanoid(); 
    const layer = new LiveObject({
      type: layerType,
      x: position.x,
      y: position.y,
      height: 100,
      width: 100,
      fill: lastUsedColor
    });

    liveLayerIds.push(layerId);
    liveLayers.set(layerId, layer);

    setMyPresence({
      selection: [layerId],
    }, { addToHistory: true })

    setCanvasState({ mode: CanvasMode.None });
  }, [lastUsedColor]);

  const onPointerUp = useMutation(({}, e: React.PointerEvent) => {
    const point = pointerEventToCanvasPointer(e, camera);

    if (canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Pressing) {
      unselectLayers();
      setCanvasState({ mode: CanvasMode.None });
    } else if (canvasState.mode === CanvasMode.Inserting) {
      insertLayer(canvasState.layer, point);
    } else {
      setCanvasState({
        mode: CanvasMode.None
      });
    }
    history.resume();
  }, [camera, canvasState, history, insertLayer, unselectLayers]);

  const onLayerPointerDown = useMutation((
    { self, setMyPresence },
    e: React.PointerEvent,
    layerId: string
  ) => {
    if (canvasState.mode === CanvasMode.Inserting || canvasState.mode === CanvasMode.Pencil) {
      return;
    }

    history.pause();
    e.stopPropagation();

    const point = pointerEventToCanvasPointer(e, camera);

    if (!self.presence.selection.includes(layerId)) {
      setMyPresence({ selection: [layerId]}, { addToHistory: true });
    }

    setCanvasState({ mode: CanvasMode.Translating, origin: point, current: point })

  }, [setCanvasState, camera, history, canvasState.mode])

  const selections = useOthersMapped((otherUsers) => otherUsers.presence.selection);

  const layerIdsToColorSelection = useMemo(() => {
    const result: Record<string, string> = {};

    for (const [connectionId, selection] of selections) {
      for (const layerId of selection) {
        result[layerId] = connectionIdToColor(connectionId);
      }
    }

    return result;
  }, [selections]);

  const onResizeHandlePointerDown = useCallback( (corner: Side, initialBounds: XYWH) => {
    console.log({
      corner,
      initialBounds
    });
    
    history.pause();
    setCanvasState({
      corner,
      initialBounds,
      mode: CanvasMode.Resizing
    })
  }, [history]);

  const onPointerDown = useCallback((
    e: React.PointerEvent
  ) => {
    const point = pointerEventToCanvasPointer(e, camera);

    if (canvasState.mode === CanvasMode.Inserting) {
      return;
    }

    // TODO: drawing case

    setCanvasState({ origin: point, mode: CanvasMode.Pressing });
  }, [camera, canvasState, setCanvasState]);

	return (
		<main className="h-full w-full relative bg-neutral-100 touch-none">
			<Info boardId={boardId} />
			<Participant />
			<Toolbar 
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        redo={history.redo}
        undo={history.undo}
        />
      <svg 
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}>
        <g style={{
          transform: `translate(${camera.x}px, ${camera.y}px)`
        }}>
          {layerIds.map((layerId) => (
            <LayerPreview 
              key={layerId} 
              id={layerId} 
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]} />
          ))}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
          <CursorsPresence />
        </g>
      </svg>
		</main>
	)
}