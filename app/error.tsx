'use client';
import { Button } from '@/components/ui/button';

export default function error() {
  return (
    <div
      className='h-full flex flex-col items-center justify-center
     bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-slate-950 gap-y-8'>
      An error occurred.
      <Button>
        <a href='/'>Back to start</a>
      </Button>
    </div>
  );
}
