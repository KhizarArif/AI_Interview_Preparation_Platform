import AuthForm from '@/components/AuthForm'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <AuthForm type="sign-up" />
    </div>
  )
}

export default page