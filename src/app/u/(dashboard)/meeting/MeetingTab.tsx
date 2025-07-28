"use client";
import {
  CalendarCheck,
  CalendarClock,
  ClipboardList,
  PlusSquare,
} from "lucide-react";
import React, { useState } from "react";
import Upcoming from "./Upcoming";
import { useData } from "@/lib/(fetchings)/fetchClient";
import { ButtonComponent } from "@/components/DashboardPage/dashHandle-button";
import { TabDash } from "@/components/DashboardPage/dash-tabs";
import Attended from "./Attended";
import Overview from "./Overview";
import { useSheetStore } from "@/lib/utils/SheetContext";
import SheetContainer from "@/components/task/SheetContainer";

const MeetingTab = () => {
  const { data: meetings = [] } = useData({
    table: "meetings",
    date: "date_time",
  });
  const { openSheet } = useSheetStore();

  const [currentTab, setCurrentTab] = useState<
    "Upcoming" | "Attended" | "Overview"
  >("Overview");

  const TabData = [
    { name: "Overview", icon: <ClipboardList size={20} /> },
    { name: "Upcoming", icon: <CalendarClock size={20} /> },
    { name: "Attended", icon: <CalendarCheck size={20} /> },
  ];

  const renderTab = () => {
    switch (currentTab) {
      case "Upcoming":
        return <Upcoming meet={meetings} />;
      case "Attended":
        return <Attended meet={meetings} />;
      case "Overview":
        return <Overview meet={meetings} />;
    }
  };

  return (
    <div>
      <div className="flex justify-between pr-10">
        <div className="flex space-x-3 pl-4 pb-2">
          {TabData.map(({ name, icon }) => (
            <TabDash
              key={name}
              name={name}
              isActive={currentTab === name}
              Click={() =>
                setCurrentTab(name as "Overview" | "Attended" | "Upcoming")
              }
              compo={icon}
            />
          ))}
        </div>
        <div className="flex">
          <ButtonComponent
            name="New"
            type="add"
            compo={
              <PlusSquare
                strokeWidth={2}
                size={20}
                enableBackground={"#FFFFFF"}
              />
            }
            onClick={() => {
              openSheet("meeting");
            }}
          />
        </div>
      </div>
      <div className="px-5">{renderTab()}</div>
      <SheetContainer />
    </div>
  );
};

export default MeetingTab;
