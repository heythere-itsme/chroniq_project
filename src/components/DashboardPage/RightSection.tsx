import React from "react";
import SidebarCalendar from "../Sidebar/SidebarCalendar";
import TimerRow from "../Sidebar/TimerRow";

const RightSection = () => {
  return (
    <div className="w-100 flex flex-col justify-between">
      <h2 className="font-medium pt-2 px-2">
        {new Date().toLocaleString("en-GB", { month: "short", day: "2-digit" })}
        , {new Date().getFullYear()}
      </h2>
      <SidebarCalendar />
      <TimerRow />
    </div>
  );
};

export default RightSection;
