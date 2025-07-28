"use client";
import { handleLogout } from "@/lib/(fetchings)/fetchClient";
import { textAnimation } from "@/lib/utils/gsapAnimation";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

const LogoutBut = () => {
  const iconRef = useRef(null);
  const textRef = useRef(null);

  const { handleEnter, handleLeave } = textAnimation(textRef, iconRef);

  const router = useRouter();

  const handleButton = async () => {
    await handleLogout();
    router.push("/login");
  };
  return (
    <div
      className="flex gap-2 bg-[#BA494B] px-3 rounded-[4px] items-center py-1 cursor-pointer"
      onClick={handleButton}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <h4 className="text-center h-3" ref={textRef}>
        LogOut
      </h4>
      <LogOut className="h-fit" size={20} ref={iconRef} />
    </div>
  );
};

export default LogoutBut;
