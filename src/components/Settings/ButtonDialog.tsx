'use client'
import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CircleArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { deleteAcc } from '@/lib/utils/DeleteAcc';
// import { handleAccDelete } from '@/lib/utils/TasknMeet';

const ButtonDialog = ({data, type}) => {
  return (
      <AlertDialog>
        <AlertDialogTrigger>
          <div
            className={cn(
              "px-3 py-2 rounded-xl w-20 flex justify-end cursor-pointer",
              type == "ok" ? "bg-Selected" : "bg-alert-accent"
            )}
          >
            <CircleArrowRight size={25} />
            <h5 className='font-bold !text-black'>!Working</h5>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="border-white/30">
          <AlertDialogHeader>
            <AlertDialogTitle>You really want to leave?</AlertDialogTitle>
            <AlertDialogDescription className="!text-3 !text-text-secondary">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-primary-light cursor-pointer hover:bg-primary-light/80">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-alert-accent/60 cursor-pointer hover:bg-alert-accent/80"
              onClick={() => deleteAcc({data: data})}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  )
}

export default ButtonDialog