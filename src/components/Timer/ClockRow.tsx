"use client";
import { rotationAnimation } from "@/lib/utils/gsapAnimation";
import { useTimerStore } from "@/lib/utils/timerStore";
import { CircleX, RefreshCcwDot, Shuffle } from "lucide-react";
import React, { useRef } from "react";
import { timeToSeconds } from "./Segment";
import { handleTimerDelete, handleUsedSeconds } from "@/lib/utils/TasknMeet";
import { LiveElapsed } from "@/lib/utils/LiveTimer";
import { useQueryClient } from "@tanstack/react-query";

export const ClockDayRow = ({
  name,
  total,
  used,
  id
}: {
  name: string;
  total: string;
  used: string;
  id: string;
}) => {
  const query = useQueryClient()
  const { setCurrentTimer, timers, currentTimer, setTimer } = useTimerStore();
  const roundRef = useRef(null);

  const isActive = currentTimer === name;
  const usedSeconds = LiveElapsed({ timers, currentTimer, name });

  const formatSeconds = (seconds: number) =>
    new Date(seconds * 1000).toISOString().substr(11, 8);

  const handleClick = () => {
    const currentData = timers[currentTimer];

    if (currentTimer && currentData && currentTimer !== "default") {
      const totalUsed = LiveElapsed({
        timers,
        currentTimer,
        name: currentTimer,
      });

      handleUsedSeconds({ timerName: currentTimer, totalUsed, id });
    }

    if (timers[currentTimer]?.isRunning) setTimer();

    setCurrentTimer(name, timeToSeconds(total), timeToSeconds(used), id);
  };

    rotationAnimation(roundRef, isActive && timers[name]?.isRunning);

  return (
    <div className="flex items-center gap-5">
      {isActive ? (
        <RefreshCcwDot className="h-7 w-7" ref={roundRef} />
      ) : (
        <Shuffle className="h-7 w-7" onClick={handleClick} />
      )}

      <div className="flex items-center bg-Secondary w-100 py-2 px-3 rounded-[10px] mb-2 gap-5">
        <h4 className="font-semibold">{name}</h4>
        <div className="flex items-center gap-2 ml-auto text-[hsl(0,0%,50%)]">
          <span>{formatSeconds(usedSeconds) }</span>
          <span>/</span>
          <span>{total}</span>
        </div>
        <CircleX className="rotate-90 cursor-pointer" onClick={() => handleTimerDelete({id, query})} />
      </div>
    </div>
  );
};
