'use client'

import { useCallback, useState } from "react"
import Info from "./info"
import Participant from "./participants"
import Toolbar from "./toolbar"
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point } from "@/types/canvas"
import { useCanRedo, useCanUndo, useHistory, useMutation, useStorage } from "@/liveblocks.config"
import CursorsPresence from "./cursors-presence"
import { pointerEventToCanvasPointer } from "@/lib/utils"

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
    b: 0,
    g: 0,
    r: 0
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
              onLayerPointerDown={() => {}}
              selectionColor='#000' />
          ))}
          <CursorsPresence />
        </g>
      </svg>
		</main>
	)
}