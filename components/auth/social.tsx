'use client';

import { FcGoogle } from 'react-icons/fc';
import { IoLogoGithub } from 'react-icons/io5';
import { Button } from '../ui/button';
export default function Social() {
  return (
    <div className='w-full mt-6'>
      <p className='text-xs text-center'>Or login with: </p>
      <div className='flex justify-center items-center gap-x-4 mt-3'>
        <Button
          variant='outline'
          size='lg'
          className='w-full'
          onClick={() => {}}>
          <FcGoogle className='h-5 w-5' />
        </Button>
        <Button
          variant='outline'
          size='lg'
          className='w-full'
          onClick={() => {}}>
          <IoLogoGithub className='h-5 w-5' />
        </Button>
      </div>
    </div>
  );
}
