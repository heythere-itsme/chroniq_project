"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { useTimerStore } from "@/lib/utils/timerStore";
import { formatSeconds } from "./Segment";
import { handleUsedSeconds } from "@/lib/utils/TasknMeet";

const Clock = () => {
  const stroke = 10;
  const radius = 90;
  const circumference = 2 * Math.PI * (radius - stroke / 2);

  const { timers, currentTimer, setTimer, incrementTimer } = useTimerStore();
  const timer = timers[currentTimer || "default"] || {};
  const { name: timerName, isRunning = false, used = 0, total = 0, startTime = 0 } = timer;

  const [tick, setTick] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const elapsed = isRunning && startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
  const totalUsed = Math.min(used + elapsed, total);
  const offset = circumference - ((totalUsed / total) * circumference || 0);

  // Setup interval for re-rendering
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTick((t) => t + 1);
        incrementTimer();
      }, 1000);
    }
    return () => clearInterval(intervalRef.current!);
  }, [isRunning, incrementTimer]);

  const handleStart = async () => {
    if (!timerName) return;
    if (isRunning) await handleUsedSeconds({timerName: timerName, totalUsed: totalUsed, id: timer.id});
    
    setTimer();
  };

  return (
     <div className="bg-Secondary w-60 rounded-[10px] px-3 py-3 flex flex-col gap-5 relative">
      <h4 className="font-semibold mx-auto">{timerName}</h4>

      <div className="w-fit mx-auto">
        <svg width="200" height="200">
          <circle
            cx="100" cy="100" r={radius - stroke / 2}
            stroke="hsl(0, 0%, 20%)" strokeWidth={stroke} fill="none"
          />
          <circle
            cx="100" cy="100" r={radius - stroke / 2}
            stroke="hsl(138, 61%, 42%)" strokeWidth={stroke} fill="none"
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round" transform="rotate(-90 100 100)"
            style={{ transition: "stroke-dashoffset 0.5s linear" }}
          />
        </svg>
      </div>

      <div className="text-center text-muted-foreground font-mono absolute top-2/5 left-23">
        <h4>{formatSeconds(totalUsed)}</h4>
        <div className="h-0.5 w-full bg-white" />
        <h4>{formatSeconds(total)}</h4>
      </div>

      <div className="flex items-center gap-5 mt-3 mx-auto">
        <button onClick={handleStart} className="cursor-pointer">
          {isRunning ? <Pause /> : <Play />}
        </button>
      </div>
    </div>
  );
};

export default Clock;
