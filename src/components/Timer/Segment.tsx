import React from "react";
import Clock from "./Clock";
import { ClockDayRow } from "./ClockRow";

export const formatSeconds = (seconds: number = 0) => {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
};

export const timeToSeconds = (t: string) => {
  const [h, m, s] = t.split(":").map(Number);
  return h * 3600 + m * 60 + s;
};

const Segment = ({
  TimerData,
}: {
  TimerData?: { name: string; total: string; used: string; id: string }[];
}) => {

  return (
    <div className="flex gap-20">
      <Clock />
      <div className="mt-5">
        {TimerData?.map(({ name, total, used, id }) => (
          <ClockDayRow key={id} name={name} total={total} used={used} id={id} />
        ))}
      </div>
    </div>
  );
};

export default Segment;
