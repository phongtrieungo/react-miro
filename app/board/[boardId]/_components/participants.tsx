'use client'

import { useOthers, useSelf } from "@/liveblocks.config"

import { Skeleton } from "@/components/ui/skeleton"
import UserAvatar from "./user-avatar";
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOWN_USER = 2;

export default function Participant() {
  const users = useOthers();
  const myself = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USER;

  return (
    <section className="absolute h-12 top-2 right-2 bg-white rounded-md px-1.5 flex items-center shadow-md">
      <section className="flex gap-x-2">
        { 
          users.slice(0, MAX_SHOWN_USER).map(user => (
            <UserAvatar 
              borderColor={connectionIdToColor(user.connectionId)}
              key={user.connectionId} 
              src={user.info?.picture} 
              name={user.info?.name}
              fallback={user.info?.name || 'T'} />
          ))
        }
        {
          myself && (
            <UserAvatar 
              borderColor={connectionIdToColor(myself.connectionId)}
              src={myself.info?.picture} 
              name={`${myself.info?.name} (You)`}
              fallback={myself.info?.name || 'M'} />
          )
        }

        {
          hasMoreUsers && (
            <UserAvatar 
              name={`${users.length - MAX_SHOWN_USER} more`}
              fallback={`+${users.length - MAX_SHOWN_USER}`}
            />
          )
        }
      </section>
    </section>
  )
}

export function ParticipantSkeleton() {
  return (
    <section className="absolute h-12 top-2 right-2 bg-white rounded-md px-1.5 flex items-center shadow-md w-[300px]">
      <Skeleton className="h-full w-full bg-muted-400" />
    </section>
  )
}