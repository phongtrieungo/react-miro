"use client"

import { Plus } from 'lucide-react';
import { CreateOrganization } from '@clerk/nextjs';

import {
  Dialog,
  DialogContent,
  DialogTrigger
} from '@/components/ui/dialog';
import Hint from '@/components/hint';

export default function NewButton() {
  return(
    <Dialog>
      <DialogTrigger asChild>
        <section className='aspect-square'>
          <Hint label='Create new organization' side='right' align='start' sideOffset={15}>
            <button className='bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition'>
              <Plus className='text-white' />
            </button>
          </Hint>
        </section>
      </DialogTrigger>
      <DialogContent className='p-0 bg-transparent border-none max-w-[480px]'>
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  )
}