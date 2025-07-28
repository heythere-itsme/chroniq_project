"use client";
import Board from "@/app/u/(dashboard)/task/Board";
import Completed from "@/app/u/(dashboard)/task/Completed";
import Overview from "@/app/u/(dashboard)/task/Overview";
import Timeline from "@/app/u/(dashboard)/task/Timeline";
import React, { useState } from "react";
import { TabDash } from "./dash-tabs";
import List from "@/app/u/(dashboard)/task/List";
import { useData } from "@/lib/(fetchings)/fetchClient";
import {
  ChartNoAxesGantt,
  CheckCheck,
  Kanban,
  LayoutDashboard,
  ListChecks,
  PlusSquare,
} from "lucide-react";
import { ButtonComponent } from "./dashHandle-button";
import { useSheetStore } from "@/lib/utils/SheetContext";
const TabSection = () => {
  const TabData = [
    { name: "Overview", icon: <LayoutDashboard size={20} /> },
    { name: "List", icon: <ListChecks size={20} /> },
    { name: "Board", icon: <Kanban size={20} /> },
    { name: "Timeline", icon: <ChartNoAxesGantt size={20} /> },
    { name: "Completed", icon: <CheckCheck size={20} /> },
  ];

  const { data: tasks = [] } = useData({ table: "tasks", date: "end_date" });

  const { openSheet } = useSheetStore();
  const [currentTab, setCurrentTab] = useState<
    "Overview" | "List" | "Board" | "Timeline" | "Completed"
  >("Overview");

  const renderTab = () => {
    switch (currentTab) {
      case "Overview":
        return <Overview tasks={tasks} />;
      case "List":
        return <List tasks={tasks} />;
      case "Board":
        return <Board tasks={tasks} />;
      case "Timeline":
        return <Timeline tasks={tasks} />;
      case "Completed":
        return <Completed tasks={tasks} />;
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
              Click={() => setCurrentTab(name as any)}
              compo={icon}
            />
          ))}
        </div>
        <div className="flex">
          <ButtonComponent
            name="New"
            type="add"
            compo={<PlusSquare strokeWidth={2} size={20} enableBackground={'#FFFFFF'} />}
            onClick={() => {
              openSheet("task");
            }}
          />
        </div>
      </div>
      <div className="px-5">{renderTab()}</div>
    </div>
  );
};

export default TabSection;
