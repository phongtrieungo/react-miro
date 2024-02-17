'use client'

import { useCallback, useState } from "react"
import Info from "./info"
import Participant from "./participants"
import Toolbar from "./toolbar"
import { Camera, CanvasMode, CanvasState } from "@/types/canvas"
import { useCanRedo, useCanUndo, useHistory, useMutation } from "@/liveblocks.config"
import CursorsPresence from "./cursors-presence"
import { pointerEventToCanvasPointer } from "@/lib/utils"

interface CanvasProps {
	boardId: string;
}

export default function Canvas({ boardId }: CanvasProps) {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  });

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const history = useHistory();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();

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
        onPointerLeave={onPointerLeave}>
        <g>
          <CursorsPresence />
        </g>
      </svg>
		</main>
	)
}