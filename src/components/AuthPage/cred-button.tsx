import { createClient } from "@/lib/supabase/client";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Image from "next/image";

const supabase = createClient();

const handleOAuth = async (provider: any) => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    toast.error(`OAuth Error: ${error.message}`);
  }
};

const CredButton = ({Src, provider, name} : {Src: string; provider: string; name: string}) => {
  return (
    <Button onClick={() => handleOAuth(provider)} type="button" className="bg-primary-light cursor-pointer hover:bg-[hsl(120,20%,20%)]">
      <h4>{name}</h4>
      <Image src={Src} width={30} height={30} alt={provider}/>
    </Button>
  );
};

export default CredButton;
