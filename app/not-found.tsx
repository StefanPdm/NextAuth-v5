'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function notFound() {
  return (
    <div
      className='h-full flex flex-col items-center justify-center
     bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-slate-950 gap-y-8'>
      Error 404. Page not found.
      <Button>
        <Link href='/'>Back to start</Link>
      </Button>
    </div>
  );
}
