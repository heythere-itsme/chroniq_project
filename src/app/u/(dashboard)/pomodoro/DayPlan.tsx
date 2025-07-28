"use client";
import Segment, { timeToSeconds } from "@/components/Timer/Segment";
import TimerPopOver from "@/components/Timer/TimerPopOver";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useData } from "@/lib/(fetchings)/fetchClient";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";


const DayPlan = () => {

  const [totalHours, setTotalHours] = useState("0");
  const { data: timerData = [] } = useData({ table: "timer", date: "total" });

  useEffect(() => {
    const fetchData = async () => {
      const data = timerData

      const totalSeconds = data.reduce(
        (acc, timer) => acc + timeToSeconds(timer.total),
        0
      );
      setTotalHours((totalSeconds / 3600).toFixed(1));
    };

    fetchData();
  }, [timerData]);

  return (
    <div className="ml-3">
      {/* Header */}
      <div className="flex items-center gap-5 pb-4 pt-2 justify-between mr-80">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">Time Blocking</h3>
          <h4>{`${totalHours}`}Hrs</h4>
        </div>

        <Popover>
          <PopoverTrigger>
            <div className="bg-[hsl(120,40%,50%)] hover:bg-[hsl(120,30%,40%)] w-fit rounded-[4px] px-1 cursor-pointer">
              <Plus />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <TimerPopOver />
          </PopoverContent>
        </Popover>
      </div>

      {/* Content */}
      <div>
        <Segment TimerData={timerData} />
      </div>
    </div>
  );
};

export default DayPlan;