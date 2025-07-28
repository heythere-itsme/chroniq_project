"use client";

import { ArrowRight, SquareArrowOutUpRight } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { meetingType, taskType } from "@/index";
import { useSheetStore } from "@/lib/utils/SheetContext";

const formatDate = (date, opts) =>
  new Date(date).toLocaleString("en-GB", opts);

const CalRow = ({ task } : {task : taskType | meetingType}) => {
  const isTask = "task_title" in task;
  const isMeeting = "title" in task;
  const {openSheet} = useSheetStore()

  if (isTask) {
    
  }

  const formattedStart = isTask
  ? formatDate(task.start_date, { month: "short", day: "2-digit" })
  : null;

const formattedEnd = isTask
  ? formatDate(task.end_date, { month: "short", day: "2-digit" })
  : null;

const formattedMeetDate = isMeeting
  ? formatDate(task.date_time, { month: "short", day: "2-digit" })
  : null;

const formattedMeetTime = isMeeting
  ? new Date(task.date_time).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  : null;

  return (
    <div className="mr-5 px-3 flex gap-3 bg-primary-light rounded-[8px] w-auto items-center justify-between py-2">
      <div className={cn("w-50")}>
        <h4 className="truncate font-bold">
          {task.task_title || task.title}
        </h4>
      </div>

      {isTask && (
        <h4 className="flex items-center gap-2 w-40">
          {formattedStart} <ArrowRight size={15} /> {formattedEnd}
        </h4>
      )}

      {isMeeting && (
        <h4 className="flex items-center gap-2 w-40">
          {formattedMeetDate} @ {formattedMeetTime}
        </h4>
      )}

      <h4>{task.venue || task.task_description}</h4>

      <div>
        <SquareArrowOutUpRight size={20} onClick={() => openSheet(`${isTask ? "task" : "meeting"}`, task)} className="cursor-pointer"/>
      </div>
    </div>
  );
};

export default CalRow;
