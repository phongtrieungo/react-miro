"use client"

import Image from 'next/image';

import {
  useOrganization,
  useOrganizationList
} from '@clerk/nextjs';

import { cn } from '@/lib/utils';
import Hint from '@/components/hint';

interface OrgListItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export default function OrgListItem({ id, name, imageUrl }: OrgListItemProps) {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!isActive) {
      return;
    }

    setActive && setActive({ organization: id });
  }

  return (
    <section className='aspect-square relative'>
      <Hint label={name} side='right' align='start' sideOffset={15}>
        <Image
          fill 
          src={imageUrl} 
          alt={name}
          className={
            cn('rounded-md cursor-pointer opacity-75 hover:opacity-100 transition', isActive && 'opacity-100')
          } 
          onClick={onClick} />
      </Hint>
    </section>
  )
}