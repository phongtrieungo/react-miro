'use client'

import Image from 'next/image';
import { Loader2 } from "lucide-react"
import { api } from '@/convex/_generated/api';
import { useOrganization } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function EmptyBoards() {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onCreateOrganization = () => {
    if (!organization) {
      return;
    }

    mutate({
      title: 'Untitled',
      orgId: organization.id
    })
    .then((id) => {
      toast.success('Board created');
      router.push(`/board/${id}`)
    })
    .catch(() => toast.error('Failed to create board'));
  };

  return (
    <section className='h-full flex flex-col items-center justify-center'>
      <Image src='./note.svg' alt='Empty Board' height={110} width={110}/>
      <h2 className='text-2xl font-semibold mt-6'>Create your first board</h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Start by creating a board for your organization
      </p>
      <Button disabled={pending} className='mt-6' size='lg' onClick={onCreateOrganization}>
        { pending ? (
          <span className='flex gap-2'>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Please wait</span>
          </span>
          ) : 'Create organization'
        }
      </Button>
    </section>
  );
}