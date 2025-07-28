import { cn } from "@/lib/utils";
import React, { JSX } from "react";
import ButtonDialog from "./ButtonDialog";
import { getUserDetails } from "@/lib/(fetchings)/fetch";


const SettingDialog = async ({
  title,
  type,
  icon: Icon,
}: {
  type: string;
  title: string;
  icon: JSX.Element;
}) => {

    const user = await getUserDetails()

  return (
    <div
      className={cn(
        "rounded-xl py-2 px-5 w-fit space-y-10 relative",
        type == "ok" ? "bg-Selected/5" : "bg-alert-accent/5"
      )}
    >
      <div className="flex items-center gap-20">
        <h3 className="font-medium">{title}</h3>
        <Icon size={30} />
      </div>
      <ButtonDialog data={user} type="no" />
    </div>
  );
};

export default SettingDialog;
