import React from "react";
import ItemRows from "./ItemRows";
import { taskType, meetingType, noteType } from "@/index";

type AnyItem = taskType | meetingType | noteType;

const getType = (d: AnyItem): "task" | "meeting" | "note" => {
  if ("task_title" in d) return "task";
  if ("text_data" in d) return "note";
  return "meeting";
};

const ItemStack = ({ data }: { data: AnyItem[] }) => {
  return (
    <div className="ml-3 space-y-2">
      {data.map((d, key) => (
        <ItemRows key={key} data={d} type={getType(d)} />
      ))}
    </div>
  );
};

export default ItemStack;
