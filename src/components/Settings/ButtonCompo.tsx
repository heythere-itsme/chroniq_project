'use client'
import React from 'react'
import SheetContainer from '../task/SheetContainer'
import { cn } from '@/lib/utils'
import { CircleArrowRight } from 'lucide-react'
import { useSheetStore } from '@/lib/utils/SheetContext'

const ButtonCompo = ({type, data} : {type: string; data: any}) => {
    const {openSheet} = useSheetStore()
  return (
    <div
    onClick={() => openSheet("user", data)}
     className={cn('px-3 py-2 rounded-xl w-20 flex justify-end cursor-pointer', type == "ok" ? "bg-Selected" : "bg-alert-accent")}>
        <CircleArrowRight size={25} />
        <SheetContainer />
    </div>
  )
}

export default ButtonCompo