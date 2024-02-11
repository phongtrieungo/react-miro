import Image from 'next/image';
import { CreateOrganization } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function EmptyOrg() {
  return (
    <section className="h-full flex flex-col items-center">
      <Image src='./empty.svg' alt='Empty' height={200} width={200} />
      <h2 className='text-2xl font-semibold mt-6'>Welcome to Board</h2>
      <p className='text-muted-foreground text-sm mt-2'>Create an organization to get started</p>
      <section className='mt-6'>
        <Dialog>
          <DialogTrigger asChild>
            <Button size='lg'>
              Create organization
            </Button>
          </DialogTrigger>
          <DialogContent className='p-0, bg-transparent border-none max-w-[480px]'>
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </section>
    </section>
  )
}
