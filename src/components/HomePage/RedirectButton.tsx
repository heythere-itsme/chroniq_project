"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { checkSession } from "@/lib/(fetchings)/fetchClient";

const RedirectButton = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkSession(setIsLoggedIn);
  }, []);

  const handleRedirect = () => {
    if (isLoggedIn) {
      router.push("/u/home");
    } else {
      router.push("/login");
    }
  };

  return (
    <Button onClick={handleRedirect} className="bg-Secondary cursor-pointer">
      <h5 className="font-semibold">{isLoggedIn ? "Open ChroniQ" : "Log In"}</h5>
    </Button>
  );
};

export default RedirectButton;
