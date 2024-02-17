'use client'

import { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";

import { RoomProvider } from "@/liveblocks.config";

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode>;
}

export default function Room({ children, roomId, fallback }: RoomProps) {
  return (
    <RoomProvider id={roomId} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  )
}