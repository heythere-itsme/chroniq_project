import {
  ArrowRightIcon,
  Ellipsis,
  SquareArrowOutUpRight,
  SquarePen,
  Trash,
} from "lucide-react";
import React from "react";
import Tags from "./tags";
import { useSSubTasks } from "@/lib/(fetchings)/fetchClient";
import { Checkbox } from "../ui/checkbox";
import { handleCheck, handleDelete } from "@/lib/utils/TasknMeet";
import { taskType } from "@/index";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";
import { useSheetStore } from "@/lib/utils/SheetContext";

const getStatusTag = (task : taskType) => {
  switch (task.activity_status) {
    case "Not Started":
      return (
        <Tags
          name="Not Started"
          color="rgba(238, 99, 82, .3)"
          dotcolor="hsl(0, 60%, 50%)"
        />
      );
    case "In Progress":
      return (
        <Tags
          name="In Progress"
          color="rgba(254, 231, 92, .3)"
          dotcolor="hsl(60, 60%, 50%)"
        />
      );
    case "Completed":
      return (
        <Tags
          name="Completed"
          color="rgba(123, 239, 178, .3)"
          dotcolor="hsl(120, 60%, 50%)"
        />
      );
    default:
      return null;
  }
};
const dateFxn = (task : taskType) => {
  const date_end = new Date(task.end_date).toLocaleString("en-GB", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  const date_start = new Date(task.start_date).toLocaleString("en-GB", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return { date_end, date_start };
};

export const TaskRowOverview = ({ data }: { data: taskType }) => {
  const { data: fetchedSubTask } = useSSubTasks({ Tid: data?.id });
  const { date_end, date_start } = dateFxn(data);
  const {openSheet} = useSheetStore()
  const query = useQueryClient()

  return (
    <div className="rounded-[8px] px-4 w-[1000px] bg-Secondary cursor-context-menu pt-2 pb-3">
      {/* Upper */}
      <div className="flex gap-1 items-center justify-between pr-10">
        <div className="flex gap-2">
          <Checkbox
            className=" hover:bg-Selected hover:opacity-70 bg-white h-5 w-5 !rounded-[4px]"
            checked={data.is_completed}
            onClick={() => handleCheck({ task: data, table: "tasks", query })}
          />
          <h4 className="w-[300px] overflow-ellipsis hover:overflow-auto px-2">
            {data.task_title}
          </h4>
        </div>

        <div className="flex gap-1 w-60">
          <div>{getStatusTag(data)}</div>
          <div>
            {data.task_priority == "High" ? (
              <Tags
                name="High"
                color="rgba(42,172,82,.3)"
                dotcolor="hsl(120, 60%, 50%)"
              />
            ) : (
              <Tags
                name="Low"
                color="rgba(254,231,92,.3)"
                dotcolor="hsl(60, 60%, 50%)"
              />
            )}
          </div>
          
        </div>

        <div className="flex gap-2 items-center w-50">
          <h4>{date_start}</h4>
          <ArrowRightIcon size={15} />
          <h4>{date_end}</h4>
        </div>
      </div>
      {/* Lower */}
      <div className="flex items-center justify-between">
        <h4 className="w-[330px] overflow-ellipsis hover:overflow-auto !text-text-secondary mr-4">
          {data.task_description}
        </h4>
        {Array.isArray(fetchedSubTask) && fetchedSubTask.length > 0 && (
            <Tags name="SubTasks" color="hsl(0,0%,15%)" />
          )}
          <h4 className="w-90">{data.completion_per}% Completed</h4>
          <SquareArrowOutUpRight onClick={() => openSheet('task', data)} className="cursor-pointer"/>
      </div>
    </div>
  );
};

export const TaskRowList = ({ data }: { data: taskType }) => {
  const { date_start, date_end } = dateFxn(data);
  const { openSheet } = useSheetStore();
  const query = useQueryClient();

  return (
    <div className="flex items-center justify-between w-full gap-2">
      <div className="flex items-center justify-between w-full bg-Secondary px-3 rounded-[4px] py-1">
        <Checkbox
          className="bg-white border-black !rounded-[4px] hover:!bg-Selected border"
          checked={data.is_completed}
          onClick={() => handleCheck({ task: data, table: "tasks", query })}
        />
        <h4 className="w-50 overflow-ellipsis">{data.task_title}</h4>
        <div className="flex gap-1 items-center w-50">
          {data.task_priority == "High" ? (
            <Tags
              name="High"
              color="rgba(42,172,82,.3)"
              dotcolor="hsl(120, 60%, 50%)"
            />
          ) : (
            <Tags
              name="Low"
              color="rgba(254,231,92,.3)"
              dotcolor="hsl(60, 60%, 50%)"
            />
          )}
          {getStatusTag(data)}
        </div>
        <div className="flex gap-1 items-center w-50">
          <h4>{date_start}</h4>
          <ArrowRightIcon size={15} />
          <h4>{date_end}</h4>
        </div>

        <h4 className="w-20">{data.completion_per}%</h4>
        <div className="w-24">
          {Array.isArray(data.assign_to) && data.assign_to.length > 0 && (
            <div className="flex gap-1">
              {data.assign_to.map((user) => (
                <Image
                  key={user.id}
                  src={user.avatar_url}
                  alt={user.user_name}
                  className="w-8 h-8 rounded-full border object-cover"
                />
              ))}
            </div>
          )}
        </div>
      </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-Secondary rounded-[4px] w-8 cursor-pointer hover:bg-primary-light items-center">
            <Ellipsis className="cursor-pointer " />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-Secondary space-y-2">
            <DropdownMenuItem onClick={() => openSheet("task", data)}>
              <SquarePen size={20} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                handleDelete({ data: data, table: "tasks", query })
              }
            >
              <Trash size={20} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
};

export const TaskRowComp = ({ data }: { data: taskType }) => {
  const { date_start, date_end } = dateFxn(data);
  const { openSheet } = useSheetStore();
  const query = useQueryClient();
  const completion = new Date(data.completed_at).toLocaleString('en-GB', {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })

  return (
    <div className="flex items-center justify-between w-full gap-2">
      <div className="flex items-center justify-between w-full bg-Secondary px-3 rounded-[4px] py-1">
        <Checkbox
          className="border-black"
          checked={data.is_completed}
          onClick={() => handleCheck({ task: data, table: "tasks", query })}
        />
        <h4 className="w-50 overflow-ellipsis">{data.task_title}</h4>
        <div className="flex gap-1 items-center w-20">
          {data.task_priority == "High" ? (
            <Tags
              name="High"
              color="rgba(42,172,82,.3)"
              dotcolor="hsl(120, 60%, 50%)"
            />
          ) : (
            <Tags
              name="Low"
              color="rgba(254,231,92,.3)"
              dotcolor="hsl(60, 60%, 50%)"
            />
          )}
        </div>
        <div className="flex gap-1 items-center w-50">
          <h4>{date_start}</h4>
          <ArrowRightIcon size={15} />
          <h4>{date_end}</h4>
        </div>
        <h4 className="w-30">{completion}</h4>
        <div className="w-24">
          {Array.isArray(data.assign_to) && data.assign_to.length > 0 && (
            <div className="flex gap-1">
              {data.assign_to.map((user) => (
                <Image
                  key={user.id}
                  src={user.avatar_url}
                  alt={user.user_name}
                  className="w-8 h-8 rounded-full border object-cover"
                />
              ))}
            </div>
          )}
        </div>
      </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-Secondary rounded-[4px] w-8 cursor-pointer hover:bg-primary-light items-center">
            <Ellipsis className="cursor-pointer " />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-Secondary space-y-2">
            <DropdownMenuItem onClick={() => openSheet("task", data)}>
              <SquarePen size={20} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                handleDelete({ data: data, table: "tasks", query })
              }
            >
              <Trash size={20} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
};