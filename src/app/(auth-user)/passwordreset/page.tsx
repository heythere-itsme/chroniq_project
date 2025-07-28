'use client'
import FormInput from '@/components/task/form-input'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { createClient } from '@/lib/supabase/client'
import { emailSchema } from '@/lib/utils/FormSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, RotateCcwKey } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import {useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const supabase = createClient()

const PasswordResetPage = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      user_email: '',
    }
  })

  type userData = {
    user_email: string;
  }

  const OnSubmit = async (data: userData) => {
    const {user_email} = data;

    const {error: autherror} = await supabase.auth.resetPasswordForEmail(user_email, {
      redirectTo: 'http://localhost:3000/passwordreset/reset'
    })
    if (autherror) {
      toast.error(autherror.message)
    }
    toast.success("Email Sent, If account exist")
  }
  return (
    <div className="auth-block relative">
      <ArrowLeft className='absolute top-4 left-5 cursor-pointer' onClick={() => router.push('/login')} />
      <h3 className="mb-4 text-center">Password Reset</h3>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(OnSubmit)} className='auth'>
              <FormInput form={form} name="user_email" placeholder="Email" />
              <Button className="mx-auto w-full text-primary-light px-8 bg-primary-light hover:bg-[hsl(120,20%,20%)] cursor-pointer" type='submit'>
                <h4>Password Reset Link</h4>
                <RotateCcwKey />
              </Button>
            </form>
        </Form>
    </div>
  )
}

export default PasswordResetPage