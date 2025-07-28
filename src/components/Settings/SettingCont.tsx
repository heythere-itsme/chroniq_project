import { cn } from '@/lib/utils'
import { CircleArrowRight, LockKeyhole, UserRoundCog, UserRoundX } from 'lucide-react'
import React, { JSX } from 'react'
import Link from 'next/link'
import SettingPop from './SettingPop'
import SettingDialog from './SettingDialog'

const SettingBlock = ({title, icon: Icon, type} : {onClick?: () => void; title: string; type: string; icon: JSX.Element}) => {
    return (
        <div className={cn('rounded-xl py-2 px-5 w-fit space-y-10', type == "ok" ? "bg-Selected/5" : "bg-alert-accent/5")}>
            <div className='flex items-center gap-20'>
            <h3 className='font-medium'>{title}</h3>
            <Icon size={30} />
            </div>
            <Link href={"/passwordreset"} className={cn('px-3 py-2 rounded-xl w-20 flex justify-end cursor-pointer', type == "ok" ? "bg-Selected" : "bg-alert-accent")}>
                <CircleArrowRight size={25} />
            </Link>
        </div>
    )
}

const SettingCont = () => {
  return (
    <div className='ml-3 my-5 flex gap-5'>
        <SettingBlock title='Change Password' icon={LockKeyhole} type='ok' />
        <SettingPop type="ok" title='Change UserDetails' icon={UserRoundCog} />
        <SettingDialog type='no' title='Delete Account' icon={UserRoundX} />
    </div>
  )
}

export default SettingCont