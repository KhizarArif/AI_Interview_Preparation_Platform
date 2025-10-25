"use client";

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'


const authFormSchema = (type: FormType) => {
  return (
    z.object({
      name: type === "sign-in" ? z.string().optional() : z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    })
  )
}

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFormSchema(type)

  const defaultValues = {
    name: "",
    email: "",
    password: "",
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  return (
    <div className='card-border lg:min-w-[566px] '>
      <div className="flex flex-col justify-center items-center gap-4 py-14 px-10 card">
        <div className="flex justify-center items-center gap-2">
          <Image src="/logo.svg" width={32} height={32} alt="logo" />
          <h1 className="text-3xl font-bold">AI Interview</h1>
        </div>
        <h4 className=''> Practise Interviews with AI </h4>
      </div>
    </div>
  )
}

export default AuthForm