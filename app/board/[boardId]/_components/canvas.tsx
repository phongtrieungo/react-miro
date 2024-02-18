'use client'

import { useCallback, useMemo, useState } from "react"
import Info from "./info"
import Participant from "./participants"
import Toolbar from "./toolbar"
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point } from "@/types/canvas"
import { useCanRedo, useCanUndo, useHistory, useMutation, useOthersMapped, useStorage } from "@/liveblocks.config"
import CursorsPresence from "./cursors-presence"
import { connectionIdToColor, pointerEventToCanvasPointer } from "@/lib/utils"

import { nanoid } from 'nanoid';
import { LiveObject } from "@liveblocks/client"
import LayerPreview from "./layer-preview"

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

  const onPointerMove = useMutation(({setMyPresence}, e: React.PointerEvent) => {
    e.preventDefault();
    const current = pointerEventToCanvasPointer(e, camera);
    setMyPresence({ cursor: current })
  }, []);

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
    if (canvasState.mode === CanvasMode.Inserting) {
      insertLayer(canvasState.layer, point);
    } else {
      setCanvasState({
        mode: CanvasMode.None
      });
    }
    history.resume();
  }, [camera, canvasState, history, insertLayer]);

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
  }, [selections])

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
        onPointerUp={onPointerUp}>
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
          <CursorsPresence />
        </g>
      </svg>
		</main>
	)
}