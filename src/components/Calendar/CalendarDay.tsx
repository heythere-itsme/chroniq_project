"use client";
import { cn } from "@/lib/utils";
import { isSameDay, isToday } from "date-fns";
import React, { useMemo } from "react";

export default function CalendarDay({
  date,
  isCurrentMonth,
  tasks = [],
  onClick,
}: {
  date: Date;
  isCurrentMonth: boolean;
  tasks: any[];
  onClick?: () => void;
}) {
  const isTodayDate = isToday(date);

  const dayTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        isSameDay(new Date(task.end_date || task.date_time), date) &&
        !task.is_completed &&
        !task.is_deleted
    );
  }, [tasks, date]);

  const visibleTasks = dayTasks.slice(0, 4);
  const extraCount = dayTasks.length - visibleTasks.length;

  const renderTaskIndicator = (task: any) => (
    <div key={task.id} className="flex items-center gap-2 truncate">
      <div
        className={`w-2 h-2 rounded-full ${
          task.task_title ? "bg-green-500" : "bg-red-500"
        }`}
      />
      <h5 className="truncate">{task.task_title || task.title}</h5>
    </div>
  );

  return (
    <div
      onClick={onClick}
      className={cn(
        `p-4 rounded min-h-[110px] mx-1 my-1 flex justify-between hover:bg-primary-dark cursor-pointer`,
        isCurrentMonth ? "bg-Secondary" : "bg-primary-light"
      )}
    >
      <h4 className={cn("", isTodayDate && "!text-Selected font-bold")}>
        {date.getDate()}
      </h4>

      <div className="space-y-[1px] w-[100px]">
        {visibleTasks.map(renderTaskIndicator)}
        {extraCount > 0 && (
          <h5 className="!text-text-secondary">+{extraCount} more</h5>
        )}
      </div>
    </div>
  );
}
