"use client";

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import FormField from './FormField';
import { Form } from './ui/form';
import { Button } from './ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/client';
import { signUp } from '@/lib/actions/auth.actions';


const authFormSchema = (type: FormType) => {

  return (
    z.object({
      name: type === "sign-in" ? z.string().optional() : z.string().nonempty("Name is required").min(3),
      email: z.string().nonempty("Email is required").email("Invalid email"),
      password: z.string().nonempty("Password is required").min(6),
    })
  )
}

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

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

  const isSignIn = type === "sign-in" ? true : false

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("onSubmit Data", data)

    if (type === "sign-in") {

      const { email, password } = data

      const userCrediential = await signInWithEmailAndPassword(auth, email, password);

      const idToken = await userCrediential.user.getIdToken();

      if (!idToken) {
        toast.error("Sign In Failed")
        return {
          success: false,
          message: "Sign In Failed"
        }
      }

      toast.success("Sign In Success")
      console.log("Sign In")
      router.push("/")
    } else {

      const { name, email, password } = data

      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

      const result = await signUp({
        uid: userCredentials.user.uid,
        name: name!,
        email,
        password
      });


      if (!result?.success) {
        toast.error(result?.message)
        return {
          success: false,
          message: result?.message
        }
      }


      toast.success("Sign Up Success")
      console.log("Sign Up")
      router.push("/sign-in")
    }

  }

  return (
    <div className='card-border lg:min-w-[366px] '>
      <div className="flex flex-col justify-center items-center gap-4 py-14 px-10 card">
        <div className="flex justify-center items-center gap-2">
          <Image src="/logo.svg" width={32} height={32} alt="logo" />
          <h1 className="text-3xl font-bold">AI Interview</h1>
        </div>
        <h2 className="text-2xl font-bold"> Practise Job Interviews with AI</h2>

        <Form {...form}>
          <form action="" className='w-full space-y-6 mt-4' onSubmit={form.handleSubmit(onSubmit)}>
            {!isSignIn && (<FormField name="name" label='Username' control={form.control} placeholder="Your Name" />)}
            <FormField name="email" label='Email' control={form.control} type="email" placeholder="Your Email" />
            <FormField name="password" label='Password' control={form.control} type="password" placeholder="Your Password" />
            <Button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"> {type === "sign-in" ? "Sign In" : "Create an account"} </Button>
          </form>
        </Form>
        <div className="flex items-center gap-2">
          <p> {type === "sign-in" ? "Don't have an account?" : "Already have an account?"} </p>
          <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className="text-blue-600 hover:text-blue-800 font-medium" >{type === "sign-in" ? "Create an account" : "Sign In"}</Link>
        </div>
      </div>
    </div>
  )
}

export default AuthForm