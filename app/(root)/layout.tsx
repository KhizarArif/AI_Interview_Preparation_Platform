import { isAuthenticated } from '@/lib/actions/auth.actions'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const layout = async ({ children }: { children: ReactNode }) => {

  const isAuthenticate = await isAuthenticated();

  if (!isAuthenticate) redirect('/sign-in');

  return (
    <div className='root-layout'>
      <nav className='flex justify-between items-center'>
        <Link href="/" className='flex gap-2 items-center'>
          <Image src="/logo.svg" alt="logo" width={32} height={38} />
          <h2 className='text-primary-200'> AI Interview</h2>
        </Link>
        <Image src="/user-avatar.png" alt="menu" width={32} height={38} className='avatar' />
      </nav>
      {children}
    </div>
  )
}

export default layout