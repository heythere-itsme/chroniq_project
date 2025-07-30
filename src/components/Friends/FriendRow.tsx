'use client'
import { CircleUserRound } from 'lucide-react'
import React from 'react'

const FriendRow = ({url ,name, lastMsg, time, onClick} : {url?: string; name: string; lastMsg: string; time: string; onClick?: () => void}) => {
  return (
    <div className='bg-primary-dark rounded-[8px] flex gap-3 items-center px-2 py-1 cursor-pointer' onClick={onClick}>
        <CircleUserRound size={30} />
        <div className='w-45'>
            <div className='flex justify-between items-center'>
                <h4>{name}</h4>
                <h5 className='font-bold !text-Selected'>3</h5>
            </div>
        <div className='flex items-center'>
        <h5 className='w-full h-[20px]'>{lastMsg.length > 30 ? `${lastMsg.slice(0, 30)}...` : lastMsg}</h5>
        <h5>{time}</h5>
        </div>
        </div>
    </div>
  )
}

export default FriendRow