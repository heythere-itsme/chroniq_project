"use client";
import React from "react";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { HandleSignUpSubmit } from "@/lib/utils/AuthFunction";
import { createClient } from "@/lib/supabase/client";
import { useForm } from "react-hook-form";
import { SignUpSchema } from "@/lib/utils/FormSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import FormInput from "../task/form-input";

const supabase = createClient();

const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      user_email: "",
      user_password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    HandleSignUpSubmit({ data, supabase, router });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth space-y-1">
        <FormInput form={form} name="name" placeholder="Name" />
        <FormInput form={form} name="user_email" placeholder="Email Address" />
        <FormInput
          form={form}
          name="user_password"
          placeholder="Password"
          type="password"
        />
        <Button
          type="submit"
          className="mx-auto w-full px-8"
        >
          Sign Up
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
