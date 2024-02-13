'use client'

import Info from "./info"
import Participant from "./participants"
import Toolbar from "./toolbar"

interface CanvasProps {
	boardId: string;
}

export default function Canvas({ boardId }: CanvasProps) {
	return (
		<main className="h-full w-full relative bg-neutral-100 touch-none">
			<Info />
			<Participant />
			<Toolbar />
		</main>
	)
}