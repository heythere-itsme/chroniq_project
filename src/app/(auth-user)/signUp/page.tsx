"use client";
import Link from "next/link";
import CredButton from "@/components/AuthPage/cred-button";
import SignUpForm from "@/components/AuthPage/SignUpForm";

const SignUpPage = () => {

  return (
    <div className="auth-block">
      <h3 className="mb-4 text-center">Sign Up</h3>
      <SignUpForm />
      <div className="flex flex-col gap-2 my-5">
        <CredButton name="Sign In with Google" provider="google" Src="/icons/Google.png"/>
        <CredButton name="Sign In with GitHub" provider="github" Src="/icons/GitHub.png"/>
      </div>
      <Link href="/login">
      <h5 className="!text-Selected">Already have an Account?</h5>
      </Link>
    </div>
  );
};

export default SignUpPage;
