import { meetingType, noteType, taskType } from "@/index";
import { SquareArrowOutUpRight } from "lucide-react";
import { format } from "date-fns";
import React from "react";
import { useSheetStore } from "@/lib/utils/SheetContext";
import { cn } from "@/lib/utils";

type TypeKey = "task" | "meeting" | "note";

const typeTagConfig: Record<TypeKey, { label: string; border: string }> = {
  task: {
    label: "Task",
    border: "border-Selected",
  },
  meeting: {
    label: "Meeting",
    border: "border-alert-accent",
  },
  note: {
    label: "Note",
    border: "border-orange-500",
  },
};

const getDataConfig = (data: taskType | meetingType | noteType) => ({
  task: {
    Title: "task_title" in data ? data.task_title : "",
    Description: "task_description" in data ? data.task_description : "",
    deleted_at: "deleted_at" in data ? data.deleted_at : null,
  },
  meeting: {
    Title: "title" in data ? data.title : "",
    Description: "description" in data ? data.description : "",
    deleted_at: "deleted_at" in data ? data.deleted_at : null,
  },
  note: {
    Title: "title" in data ? data.title : "",
    Description:
      "text_data" in data && typeof data.text_data === "string"
        ? data.text_data.slice(0, 20) + "..."
        : "",
    deleted_at: "deleted_at" in data ? data.deleted_at : null,
  },
});

interface ItemRowsProps {
  type: TypeKey;
  data: taskType | meetingType | noteType;
}

const Tag = ({ name }: { name: string; }) => (
  <h5
    className={cn(
      "w-fit h-[14px] px-1 text-xs rounded-[2px] justify-center flex items-center font-medium bg-Secondary",
    )}
  >
    {name}
  </h5>
);

const ItemRows = ({ type, data }: ItemRowsProps) => {
  const { Title, Description, deleted_at } = getDataConfig(data)[type];
  const { label, border } = typeTagConfig[type];
  const { openSheet } = useSheetStore();

  const formattedDate = deleted_at
    ? format(new Date(deleted_at), "dd MMM, yy HH:mm")
    : "—";

  return (
    <div
      className={cn(
        "flex items-center justify-between border-l-4 rounded-[8px] py-1 px-3 w-2/3 bg-primary-light",
        border
      )}
    >
      <div className="w-12">
        <Tag name={label} />
      </div>
      <h4 className="font-medium w-50 truncate">{Title}</h4>
      <h5 className="!text-text-secondary w-80 truncate">{Description}</h5>
      <h5 className="whitespace-nowrap text-sm">{formattedDate}</h5>
      <SquareArrowOutUpRight
        onClick={() => openSheet(type, data)}
        className="cursor-pointer"
      />
    </div>
  );
};

export default ItemRows;
