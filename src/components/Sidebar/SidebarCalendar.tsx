'use client'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isSameDay } from "date-fns";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import React, { useState } from "react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SidebarCalendar = () => {
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
      const cloneDay = day;

      days.push(
        <div
          key={day.toString()}
          className={`text-center rounded-md bg-Secondary py-1 my-1 h-10 ${
            isSameMonth(day, monthStart) ? "" : "text-gray-400"
          } ${isSameDay(day, new Date()) ? "bg-hold-accent !text-black hover:bg-hold-accent/90" : "hover:bg-primary-dark"}`}
        >
          {format(day, "d")}
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
    <div className="w-80 mx-auto space-y-2 my-8">
      <div className="flex justify-between items-center mb-3 mx-4">
        <h4 className="font-semibold">{format(currentDate, "MMMM yyyy")}</h4>
        <div className="flex gap-2">
        <button onClick={() => setCurrentDate(addDays(currentDate, -30))}><CircleArrowLeft /></button>
        <h4>Today</h4>
        <button onClick={() => setCurrentDate(addDays(currentDate, 30))}><CircleArrowRight /></button>
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
}

export default SidebarCalendar