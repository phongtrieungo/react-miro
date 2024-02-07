import Image from 'next/image';

export default function Loading() {
  return (
    <section id='cover-loader' className='h-full w-full flex flex-col justify-center items-center'>
      <Image src='/app-logo.svg' alt='Logo' height={120} width={120} className='animate-pulse duration-700 ' />
    </section>
  )
}