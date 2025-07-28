"use client";

import React from "react";
import { ButtonComponent } from "../DashboardPage/dashHandle-button";
import SheetContainer from "../task/SheetContainer";
import { Plus } from "lucide-react";
import { useSheetStore } from "@/lib/utils/SheetContext";

const ButtonNSheet = () => {
  const { openSheet } = useSheetStore();

  return (
    <div>
      <ButtonComponent
        type="add"
        name="Create"
        compo={<Plus strokeWidth={4} size={15} />}
        onClick={() => openSheet("task")}
      />
      <SheetContainer />
    </div>
  );
};

export default ButtonNSheet;
