import { Skeleton } from "@/components/ui/skeleton"

export default function Toolbar() {
  return (
    <section className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 ">
      <ul className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md list-none">
        <li>Pencil</li>
        <li>Square</li>
      </ul>

      <ul className="bg-white list-none rounded-md p-1.5 flex flex-col items-center shadow-md ">
        <li>Undo</li>
        <li>Redo</li>
      </ul>
    </section>
  )
}

Toolbar.Skeleton = function ToolbarSkeleton() {
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