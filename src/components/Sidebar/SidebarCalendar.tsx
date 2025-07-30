"use client";
import { useData } from "@/lib/(fetchings)/fetchClient";
import { cn } from "@/lib/utils";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SidebarCalendar = () => {
  const { data: meetings = [] } = useData({
    table: "meetings",
    date: "date_time",
  });
  const { data: tasks = [] } = useData({ table: "tasks", date: "end_date" });
  const meetingDates = new Set(
    meetings
      .filter((t) => !t.is_completed && !t.is_deleted)
      .map((m) => format(new Date(m.date_time), "yyyy-MM-dd"))
  );
  const task = new Set(
    tasks
      .filter((t) => !t.is_completed && !t.is_deleted)
      .map((t) => format(new Date(t.end_date), "yyyy-MM-dd"))
  );

  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // 👈 Start on Monday
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const rows = [];
  let day = startDate;

  while (day <= endDate) {
    const days = [];

    for (let i = 0; i < 7; i++) {
      const dateKey = format(day, "yyyy-MM-dd"); // ✅ Format for matching
      const hasMeeting = meetingDates.has(dateKey); // ✅ Check if meeting exists
      const hasTask = task.has(dateKey); // ✅ Check if task ends that day

      days.push(
        <div
          key={day.toString()}
          className={`text-center rounded-md bg-Secondary py-1 my-1 h-11 ${
            isSameMonth(day, monthStart) ? "" : "text-white"
          } ${
            isSameDay(day, new Date())
              ? "bg-hold-accent hover:bg-hold-accent/90"
              : "hover:bg-primary-dark"
          }`}
        >
          <div className={cn("", isSameDay(day, new Date()) && "!text-black")}>
            {format(day, "d")}
          </div>
          {/* ✅ Conditionally render dots */}
          <div className="flex gap-1 justify-center mt-1">
            {hasTask && (
              <div className="w-1.5 h-1.5 bg-Selected rounded-full" />
            )}
            {hasMeeting && (
              <div className="w-1.5 h-1.5 bg-alert-accent rounded-full" />
            )}
          </div>
        </div>
      );

      day = addDays(day, 1);
    }

    rows.push(
      <div key={day.toString()} className="grid grid-cols-7 gap-1">
        {days}
      </div>
    );
  }

  return (
    <div className="w-80 mx-auto space-y-2 my-5">
      <div className="flex justify-between items-center mb-3 mx-4">
        <h4 className="font-semibold">{format(currentDate, "MMMM yyyy")}</h4>
        <div className="flex gap-2 items-center">
          <button onClick={() => setCurrentDate(addDays(currentDate, -30))}>
            <ChevronLeft className="cursor-pointer" />
          </button>
          <h5
            onClick={() => setCurrentDate(new Date())}
            className="bg-primary-light cursor-pointer px-1 h-5 rounded-[4px] hover:bg-Secondary"
          >
            Today
          </h5>
          <button onClick={() => setCurrentDate(addDays(currentDate, 30))}>
            <ChevronRight className="cursor-pointer" />
          </button>
        </div>
      </div>
      <div className="bg-primary-light py-2 rounded-[10px] px-3 pb-8">
        <div className="grid grid-cols-7 gap-1 mb-1 text-center">
          {weekDays.map((day) => (
            <h5 key={day}>{day}</h5>
          ))}
        </div>
        <div>{rows}</div>
      </div>
    </div>
  );
};

export default SidebarCalendar;
