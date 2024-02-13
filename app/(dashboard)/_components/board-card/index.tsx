'use client'

import { useAuth } from '@clerk/nextjs';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';

import { MoreHorizontal } from 'lucide-react';

import BoardCardOverlay from './overlay';
import BoardCardFooter from './footer';

import { Skeleton } from '@/components/ui/skeleton';
import Actions from '@/components/actions';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
}

export default function BoardCard({authorId, authorName, id, imageUrl, title, createdAt, isFavorite, orgId}: BoardCardProps) {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? 'You' : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });
  const { mutate: onFavorite, pending: favoritePending } = useApiMutation(api.board.favorite);
  const { mutate: onUnfavorite, pending: unfavoritePending } = useApiMutation(api.board.unfavorite);

  const onToggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({
        id
      })
      .then(() => toast.success('Unfavorite'))
      .catch(() => toast.error('Failed to unfavorite'));
    } else {
      onFavorite({
        id, orgId
      })
      .then(() => toast.success('Favorite'))
      .catch(() => toast.error('Failed to Favorite'));
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <article className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'>
        <section className='relative flex-1 bg-amber-50'>
          <Image src={imageUrl} alt={title} fill className='object-fit'/>
          <BoardCardOverlay />
          <Actions id={id} title={title} side='right'>
            <button className='absolute top-1 right-1 opacity-75 hover:opacity-100 transition-opacity px-3 py-2 outline-none'>
              <MoreHorizontal className='text-white opacity-75 hover:opacity-100 transition-opacity' />
            </button>
          </Actions>
        </section>
        <BoardCardFooter
          isFavorite={isFavorite}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          disabled={favoritePending || unfavoritePending}
          onClick={onToggleFavorite}
          title={title} />
      </article>
    </Link>
  )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <article className='aspect-[100/127] rounded-lg overflow-hidden'>
      <Skeleton className='w-full h-full' />
    </article>
  );
}