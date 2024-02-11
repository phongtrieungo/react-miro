import { Button } from '@/components/ui/button';
import { CreateOrganization } from '@clerk/nextjs';
import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
import Image from 'next/image';

export default function EmptyBoards() {
  return (
    <section className='h-full flex flex-col items-center justify-center'>
      <Image src='./note.svg' alt='Empty Board' height={110} width={110}/>
      <h2 className='text-2xl font-semibold mt-6'>Create your first board</h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Start by creating a board for your organization
      </p>
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
  );
}