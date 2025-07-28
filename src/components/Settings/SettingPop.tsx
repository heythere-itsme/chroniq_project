import { getUserDetails } from "@/lib/(fetchings)/fetch"
import ButtonCompo from "./ButtonCompo"
import { cn } from "@/lib/utils"
import { JSX } from "react";

const SettingPop = async ({type, title, icon: Icon} : {type: string; title: string; icon: JSX.Element}) => {
    const user = await getUserDetails()

  return (
    <div className={cn('rounded-xl py-2 px-5 w-fit space-y-10 relative', type == "ok" ? "bg-Selected/5" : "bg-alert-accent/5")}>
        <div className='flex items-center gap-20'>
            <h3 className='font-medium'>{title}</h3>
            <Icon size={30} />
        </div>
        <ButtonCompo type={type} data={user} />
    </div>
  )
}

export default SettingPop