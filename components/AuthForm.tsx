"use client";

import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
//forms
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import CustomFormField from './CustomFormField';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { signIn, signUp } from '@/lib/actions/user.actions';

const AuthForm = ({ type }: {type: string}) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);
  // define the form

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  //submit
  const onSubmit = async(data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if(type === 'sign-up') {
        const userData = {
          name: data.name,
          email: data.email,
          password: data.password
        }

        const newUser = await signUp(userData);
        if (newUser?.success) {
          setUser(newUser.user);
          router.push('/');
        }
      }
      
      if(type ==='sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password
        })
        if(response) router.push('/')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
      <Link href="/" className="cursor-pointer flex items-center gap-1">
            <Image 
              src="/icons/logo1.svg"
              width={34}
              height={34}
              alt="git logo"
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-white">GitConnect</h1>
          </Link>

          <div className="flex flex-col gap-1 md:gap-3">
            <h1 className="text-24 lg:text-36 font-semibold text-gray-200">
              {user 
                ? 'Link Account'
                : type === 'sign-in'
                  ? 'Sign In'
                  : 'Sign Up'
              }
              <p className="text-16 font-normal text-gray-200">
              Please enter your details
              </p>  
            </h1>
          </div>
      </header>
      {/* form fields */}
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
         {type === 'sign-up' && (
          <>
        <CustomFormField
        control={form.control}
        name="name"
        label="Full Name"
        placeholder="Name"
        iconSrc="/icons/user.svg"
        iconAlt="user"
        />
        <CustomFormField
          control={form.control}
          name="email"
          label="Email"
          placeholder="janedoe@gmail.com"
          iconSrc="/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          control={form.control}
          name="password"
          label="Password"
          iconSrc="/icons/password.svg"
          iconAlt="user"
        />
         </>
         )} 
    {type === 'sign-in' && (
      <>
        <CustomFormField
          control={form.control}
          name="email"
          label="Email"
          placeholder="janedoe@gmail.com"
          iconSrc="/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          control={form.control}
          name="password"
          label="Password"
          iconSrc="/icons/password.svg"
          iconAlt="password"
        />
      </>
     )}

         <div className="flex flex-col gap-4">
          <Button type="submit" disabled={isLoading} className="form-btn">
          {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp;
                Loading...
              </>
            ) : type === 'sign-in' 
              ? 'Sign In' : 'Sign Up'}    
          </Button>
          </div>    
        </form>
        </Form>  

           <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in'
              ? "Don't have an account?"
              : "Already have an account?"}
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>   
    </section>
  )
}

export default AuthForm