import { Skeleton } from "@/components/ui/skeleton"
import ToolButton from "./tool-button"
import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react"

export default function Toolbar() {
  return (
    <section className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 ">
      <ul className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md list-none">
        <ToolButton label="Select" icon={MousePointer2} onClick={() => {}} isActive={false} />
        <ToolButton label="Text" icon={Type} onClick={() => {}} isActive={false} />
        <ToolButton label="Sticky Note" icon={StickyNote} onClick={() => {}} isActive={false} />
        <ToolButton label="Rectangle" icon={Square} onClick={() => {}} isActive={false} />
        <ToolButton label="Ellipse" icon={Circle} onClick={() => {}} isActive={false} />
        <ToolButton label="Pen" icon={Pencil} onClick={() => {}} isActive={false} />
      </ul>

      <ul className="bg-white list-none rounded-md p-1.5 flex flex-col items-center shadow-md ">
        <ToolButton label="Undo" icon={Undo2} onClick={() => {}} isDisabled={true} />
        <ToolButton label="Redo" icon={Redo2} onClick={() => {}} isDisabled={true} />
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