'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from "convex/react";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Hint from '@/components/hint';
import { useRenameModal } from '@/store/use-rename-modal';
import Actions from '@/components/actions';
import { Menu } from 'lucide-react';

interface InfoProps {
  boardId: string;
}

const font = Poppins({
  subsets: ['latin'],
  weight: '600'
});

function TabSeparator() {
  return (
    <span className='text-neutral-300 px-1.5'> | </span>
  )
} 

export default function Info({ boardId }: InfoProps) {
  const data = useQuery(api.board.get, { id: boardId as Id<'boards'> });
  const { initialValues, isOpen, onClose, onOpen } = useRenameModal();

  if (!data) {
    return <InfoSkeleton />;
  }

  return (
    <section className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label='Home' side='bottom' sideOffset={10} >
        <Button asChild variant='board' className="px-2">
          <Link href='/'>
            <Image src='/app-logo.svg' alt='Logo' height={40} width={40} />
            <span className={cn(
              'font-semibold text-xl ml-2 text-black', font.className
            )}>Board</span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />

      <Hint label='Edit title' side='bottom' sideOffset={10}>
        <Button 
          variant='board' 
          className='text-base font-normal px-2'
          onClick={() => onOpen(data._id, data.title)}>
          {data.title}
        </Button>
      </Hint>

      <TabSeparator />
      <Actions id={data._id} title={data.title} side='bottom' sideOffset={10}>
        <span>
          <Hint label='Main menu' side='bottom' sideOffset={10}>
            <Button size='icon' variant='board'>
              <Menu />
            </Button>
          </Hint>
        </span>
      </Actions>
    </section>
  )
}

export function InfoSkeleton() {
  return (
    <section className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]">
      <Skeleton className="h-full w-full bg-muted-400" />
    </section>
  )
}