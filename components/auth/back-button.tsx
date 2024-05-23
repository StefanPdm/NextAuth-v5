'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import Link from 'next/link';

interface BackButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
  const router = useRouter();

  function handleClick() {
    router.push(href);
  }

  return (
    <Button
      className='font-normal w-full hover:no-underline hover:font-semibold'
      variant='link'
      size='sm'
      asChild>
      <Link
        href={href}
        className=''>
        {label}
      </Link>
    </Button>
  );
}
