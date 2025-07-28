import React from "react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Authorization",
  description: "Your Goto Task Management App",
  icons: {
    icon: "/favicon.svg",
  },
};



const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-primary-dark h-screen w-screen">
      {/* Top */}
      <div className="flex gap-2 px-50 h-fit pt-10 items-center">
        <Image
          className="h-fit"
          src="/chroniq.svg"
          width={80}
          height={40}
          alt="Logo || Chroniq"
        />
        <h1 className="font-main text-2 text-primary-light">ChroniQ</h1>
      </div>
      <div className="flex justify-between items-center px-90 h-[calc(100vh-200px)]">
        {/* Left */}
        <Image
          className="h-fit fill-amber-200"
          src={"/chroniq.svg"}
          width={450}
          height={450}
          alt="Logo || ChroniQ"
        />
        {/* Right */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
