"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { OrganizationSwitcher } from '@clerk/nextjs';
import { LayoutDashboard, Star } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const font = Poppins({
  subsets: ['latin'],
  weight: '600'
});

export default function OrgSidebar() {
  const searchParams = useSearchParams();
  const favorites = searchParams.get('favorites');

  return (
    <section className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
      <Link href='/'>
        <section className='flex items-center gap-x-2'>
          <Image src='/app-logo.svg' alt='logo' height={60} width={60} />
          <span className={cn(
            'font-semibold text-2xl', font.className
          )}>Board</span>
        </section>
      </Link>
      <OrganizationSwitcher hidePersonal 
        appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              width: '100%'
            },
            organizationSwitcherTrigger: {
              padding: '6px',
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              justifyContent: 'space-between',
              backgroundColor: 'white'
            }
          }
        }} />

      <section className='space-y-1 w-full'>
        <Button asChild variant={favorites ? 'ghost' : 'secondary'} size='lg' className='font-normal justify-start px-2 w-full'>
          <Link href='/'>
            <LayoutDashboard className='h4 w-4 mr-2' />
            Team Board
          </Link>
        </Button>

        <Button asChild variant={favorites ? 'secondary' : 'ghost'} size='lg' className='font-normal justify-start px-2 w-full'>
          <Link href={{
            pathname: '/',
            query: {
              favorites: true
            }
          }}>
            <Star className='h4 w-4 mr-2' />
            Favorite Board
          </Link>
        </Button>
      </section>
    </section>
  )
}