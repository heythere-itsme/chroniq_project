'use client'
import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  format,
  subMonths,
  addMonths,
} from "date-fns";
import CalendarDay from "./CalendarDay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useData } from "@/lib/(fetchings)/fetchClient";
import SheetContainer from "../task/SheetContainer";
import { useSheetStore } from "@/lib/utils/SheetContext";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const { data: tasks = [] } = useData({table: 'tasks', date: 'end_date'})
  const { data: meets = [] } = useData({table: 'meetings', date: 'date_time'})
  const combined = [...tasks, ...meets]
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());

  const {openSheet} = useSheetStore();

  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const current = day
      days.push(
        <CalendarDay
          key={day.toISOString()}
          date={day}
          isCurrentMonth={isSameMonth(day, monthStart)}
          tasks={combined}
          onClick={() => {
            const date = current
             openSheet("calendar", date);
          }}
        />
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div key={day.toISOString()} className="grid grid-cols-7 overflow-x-hidden">
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="space-y-2">

      <div className="flex items-center justify-between">
        <div></div>
        <div className="flex gap-1 items-center mr-10">
        <div className="text-center text-3">
        <button
          onClick={handleToday}
          className="px-2 bg-primary-light hover:bg-Secondary cursor-pointer rounded-[4px]">
          Today
        </button>
      </div>
        <button onClick={handlePrevMonth}>
          <ChevronLeft />
        </button>

        <h4 className="w-20 text-center"> {format(currentDate, "MMM, yy")}</h4>

        <button onClick={handleNextMonth}>
          <ChevronRight />
        </button>
      </div>
      </div>

      {/* Weekday Names */}
        <div>
      <div className="grid grid-cols-7 font-semibold text-center">
        {WEEK_DAYS.map((day) => (
          <div key={day} className="p-2">
            {day}
          </div>
        ))}
      </div>

      {/* Date Blocks */}
      <div>{rows}</div>
      </div>
        <SheetContainer />
    </div>
  );
}
