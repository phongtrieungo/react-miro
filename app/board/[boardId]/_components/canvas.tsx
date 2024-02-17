'use client'

import { useState } from "react"
import Info from "./info"
import Participant from "./participants"
import Toolbar from "./toolbar"
import { CanvasMode, CanvasState } from "@/types/canvas"
import { useCanRedo, useCanUndo, useHistory, useRedo } from "@/liveblocks.config"

interface CanvasProps {
	boardId: string;
}

export default function Canvas({ boardId }: CanvasProps) {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  });

  const history = useHistory();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();

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
		</main>
	)
}