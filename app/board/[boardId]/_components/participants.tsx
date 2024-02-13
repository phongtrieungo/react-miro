import { Skeleton } from "@/components/ui/skeleton"

export default function Participant() {
  return (
    <section className="absolute h-12 top-2 right-2 bg-white rounded-md px-1.5 flex items-center shadow-md">
      Participants
    </section>
  )
}

Participant.Skeleton = function ParticipantSkeleton() {
  return (
    <section className="absolute h-12 top-2 right-2 bg-white rounded-md px-1.5 flex items-center shadow-md w-[300px]">
      <Skeleton className="h-full w-full bg-muted-400" />
    </section>
  )
}