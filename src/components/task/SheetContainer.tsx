import React from "react";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
import { AddTaskPopOver } from "./Pop-Overs";
import PopOverMeet from "../Meeting/PopOverMeet";
import Tiptap from "../Notes/Tiptap";
import CalenderPopOver from "../Calendar/CalenderPopOver";
import { useSheetStore } from "@/lib/utils/SheetContext";
import ChangeUserDetails from "../Settings/ChangeForm";

const SheetContainer = () => {
  const {isOpen, closeSheet, type, data} = useSheetStore()

  const getContent = (data : any) => {
    switch (type) {
      case "task":
        return <AddTaskPopOver task={data} />
      case "meeting":
        return <PopOverMeet Meet={data} />
      case "note":
        return <Tiptap data={data}/>
      case "calendar":
        return <CalenderPopOver date={data}/>
      case "user":
        return <ChangeUserDetails data={data} />
      default:
        return null
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={closeSheet}>
      <SheetContent>
          <SheetTitle></SheetTitle>
        {getContent(data)}
      </SheetContent>
    </Sheet>
  )
};

export default SheetContainer;
