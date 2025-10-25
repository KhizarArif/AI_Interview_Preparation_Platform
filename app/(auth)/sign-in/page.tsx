import AuthForm from '@/components/AuthForm'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <AuthForm type="sign-in" />
    </div>
  )
}

export default page