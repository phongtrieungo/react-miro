import { Skeleton } from "@/components/ui/skeleton"

export default function Info() {
  return (
    <section className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      Board Information
    </section>
  )
}

Info.Skeleton = function InfoSkeleton() {
  return (
    <section className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]">
      <Skeleton className="h-full w-full bg-muted-400" />
    </section>
  )
}