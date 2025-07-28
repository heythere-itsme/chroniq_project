"use client";
import React, { useState } from "react";
import { Form } from "../ui/form";
import FormInput from "../task/form-input";
import Link from "next/link";
import { Button } from "../ui/button";
import { HandleLogInSubmit } from "@/lib/utils/AuthFunction";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LogInSchema } from "@/lib/utils/FormSchemas";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, LogIn } from "lucide-react";

const supabase = createClient();

const LogInFrom = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const router = useRouter();

  const form = useForm<z.infer<typeof LogInSchema>>({
    resolver: zodResolver(LogInSchema),
    defaultValues: {
      user_email: "",
      user_password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LogInSchema>) => {
    await HandleLogInSubmit({ data, supabase, router });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth space-y-1 relative">
        <FormInput form={form} name="user_email" placeholder="Email Address" />
        <FormInput
          form={form}
          name="user_password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
        />
        <div className="absolute top-30 right-2">
          {showPassword ? (
            <EyeOff className="cursor-pointer" onClick={togglePassword} />
          ) : (
            <Eye className="cursor-pointer" onClick={togglePassword} />
          )}
        </div>
        <div className="text-right">
          <Link href="/passwordreset" className="text-4 !text-Selected">
            Forgot Password?
          </Link>
        </div>
        <Button
          type="submit"
          className="mx-auto w-full px-8 bg-primary-light cursor-pointer hover:bg-[hsl(120,20%,20%)]"
        >
          <LogIn />
          <h4>Log In</h4>
        </Button>
      </form>
    </Form>
  );
};

export default LogInFrom;
