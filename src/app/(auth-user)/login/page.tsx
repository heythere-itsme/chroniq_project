"use client";
import React from "react";
import Link from "next/link";
import CredButton from "@/components/AuthPage/cred-button";
import LogInFrom from "@/components/AuthPage/LogInFrom";

const LogInPage = () => {

  return (
    <div className="auth-block">
      <h3 className="mb-4 text-center">Log In</h3>
      <LogInFrom />
      <div className="flex flex-col gap-2 my-5">
        <CredButton name="Sign In with Google" provider="google" Src="/icons/Google.png"/>
        <CredButton name="Sign In with GitHub" provider="github" Src="/icons/GitHub.png"/>
      </div>
      <Link href="/signUp">
      <h5 className="!text-Selected">Already have an Account?</h5>
      </Link>
    </div>
  );
};

export default LogInPage;
