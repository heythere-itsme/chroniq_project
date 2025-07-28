"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CircleCheck } from "lucide-react";
import { isUsernameTaken } from "@/lib/utils/UsernameCheck";
import { toast } from "sonner";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient()

const formSchema = z.object({
  avatar_url: z.string().url("Must be a valid URL"),
  user_name: z.string().min(3, "At least 3 characters"),
  name: z.string().min(1, "Name is required"),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  data: {
    id: string;
    avatar_url: string;
    user_name: string;
    name: string;
  };
};

const ChangeUserDetails = ({ data }: Props) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar_url: "",
      user_name: "",
      name: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        avatar_url: data.avatar_url || "",
        user_name: data.user_name || "",
        name: data.name || "",
      });
    }
  }, [data, reset]);

  const handleCheck = async () => {
    const username = getValues("user_name");
    console.log(data.id);
    const isTaken = await isUsernameTaken(username, data.id);

    if (isTaken) {
      toast.warning("Username Taken");
    } else {
      toast.success("Good to go");
    }
  };

  const onSubmit = async (values: FormValues) => {
    const isTaken = await isUsernameTaken(values.user_name, data.id);

    if (isTaken) {
      toast.error("Username already taken. Choose another");
      return;
    }

    const {error} = await supabase.from("user_info").update({
        user_name: values.user_name,
        name: values.name,
        avatar_url: values.avatar_url
    }).eq("id", data.id)

    if (!error) toast.success("Data Updated")
    
  };

  const watchedUsername = watch("user_name");
  const watchedName = watch("name");
  const watchedAvatar = watch("avatar_url");

  return (
    <div>
      <h2 className="font-bold mx-5">Change User Details</h2>
      <div className="w-full h-[2px] bg-white/30 my-3"></div>
      <div className="bg-Secondary py-5 px-3 w-fit rounded-[4px] mx-auto">
        <div className="bg-primary-light w-fit flex gap-10 px-5 py-3 my-5 rounded-3xl">
          <Image
            src={watchedAvatar || data.avatar_url}
            width={80}
            height={80}
            className="rounded-2xl"
            alt="preview"
          />
          <div>
            <h4 className="w-30">{watchedName || "Name"}</h4>
            <h4 className="w-30">{watchedUsername || data.user_name}</h4>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2 flex items-center gap-2 h-10">
            <Label htmlFor="user_name" className="font-semibold w-18">
              Username
            </Label>
            <Input {...register("user_name")} className="w-50" />
            {errors.user_name && (
              <p className="!text-red-500 text-sm">
                {errors.user_name.message}
              </p>
            )}
            <div
              className="bg-Selected/20 hover:bg-Selected/50 flex items-center w-fit gap-2 px-2 h-fit rounded-[4px] cursor-pointer"
              onClick={handleCheck}
            >
              Check <CircleCheck size={20} />
            </div>
          </div>

          <div className="space-y-2 flex items-center gap-2">
            <Label htmlFor="name" className="font-semibold w-18">
              Name
            </Label>
            <Input {...register("name")} className="w-50" />
            {errors.name && (
              <p className="!text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar_url" className="font-semibold">
              Avatar URL
            </Label>
            <Input {...register("avatar_url")} className="w-120" />
            {errors.avatar_url && (
              <p className="!text-red-500 text-sm">
                {errors.avatar_url.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-Selected/20 cursor-pointer hover:bg-Selected/50"
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangeUserDetails;
