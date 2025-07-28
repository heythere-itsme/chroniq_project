'use client'
import { z } from "zod";
import { LogInSchema, SignUpSchema } from "./FormSchemas";
import { customAlphabet} from "nanoid";
import { toast } from "sonner";

const HandleSignUpSubmit = async ({ data, supabase, router } : {data:  z.infer<typeof SignUpSchema>; supabase: any; router:any}) => {
    const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 6);
    const generateRandomUsername = () => `u_${nanoid()}`;

    const { name, user_email, user_password } = data;
    const user_name = generateRandomUsername();
    const avatar_url =
      "https://nuqtcmecgufdbfzwtjwd.supabase.co/storage/v1/object/public/avatar/avatar-default.svg";

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: user_email.trim(),
      password: user_password,
    });

    if (authError) {
      toast.error(authError.message);
      return;
    }

    const userId = authData.user?.id;
    if (!userId) {
      toast.error("Error");
      return;
    }

    const { error: insertError } = await supabase.from("user_info").insert({
      id: userId,
      name,
      user_name,
      user_email,
      avatar_url,
      createdAt: new Date().toISOString(),
    });

    if (insertError) {
      toast.error("Error. Please try again.");
      return;
    }

    toast.success("Sign up successful! Redirecting...");
    router.push("/u/home");
  };

const HandleLogInSubmit = async ({data, supabase, router } : {data:  z.infer<typeof LogInSchema>; supabase: any; router:any}) => {
    const { user_email, user_password } = data;

    const { error } = await supabase.auth.signInWithPassword({
      email: user_email,
      password: user_password,
    });

    if (error) {
      toast.error(error.message || "Failed to sign in");
      console.error("Login error:", error.message);
      return;
    }

    toast.success("Logged in successfully!");
    router.push("/u/home");
  };

  export {HandleSignUpSubmit, HandleLogInSubmit}