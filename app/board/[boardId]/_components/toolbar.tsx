import { Skeleton } from "@/components/ui/skeleton"
import ToolButton from "./tool-button"
import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react"
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";

interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (state: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export default function Toolbar({ canRedo, canUndo, canvasState, redo, setCanvasState, undo }: ToolbarProps) {
  return (
    <section className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 ">
      <ul className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md list-none">
        <ToolButton 
          label="Select" 
          icon={MousePointer2} 
          onClick={() => setCanvasState({ mode: CanvasMode.None })} 
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Resizing
          } />
        <ToolButton 
          label="Text" 
          icon={Type} 
          onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layer: LayerType.Text })} 
          isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layer === LayerType.Text} />
        <ToolButton 
          label="Sticky Note" 
          icon={StickyNote} 
          onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layer: LayerType.Note })} 
          isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layer === LayerType.Note} />
        <ToolButton 
          label="Rectangle" 
          icon={Square} 
          onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layer: LayerType.Rectangle })} 
          isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layer === LayerType.Rectangle} />
        <ToolButton 
          label="Ellipse" 
          icon={Circle} 
          onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layer: LayerType.Ellipse })} 
          isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layer === LayerType.Ellipse} />
        <ToolButton 
          label="Pen" 
          icon={Pencil} 
          onClick={() => setCanvasState({ mode: CanvasMode.Pencil })} 
          isActive={canvasState.mode === CanvasMode.Pencil} />
      </ul>

      <ul className="bg-white list-none rounded-md p-1.5 flex flex-col items-center shadow-md ">
        <ToolButton label="Undo" icon={Undo2} onClick={undo} isDisabled={!canUndo} />
        <ToolButton label="Redo" icon={Redo2} onClick={redo} isDisabled={!canRedo} />
      </ul>
    </section>
  )
}

export function ToolbarSkeleton() {
  return (
    <section className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 ">
      <ul className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md list-none">
        <Skeleton />
        <Skeleton />
      </ul>

      <ul className="bg-white list-none rounded-md p-1.5 flex flex-col items-center shadow-md ">
        <Skeleton />
        <Skeleton />
      </ul>
    </section>
  )
}