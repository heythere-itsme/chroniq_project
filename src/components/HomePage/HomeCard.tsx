"use client";
import { Progress } from "../ui/progress";
import { useData } from "@/lib/(fetchings)/fetchClient";
import { TaskRowOverview } from "../task/taskrowOver";
import { MeetingRowOver } from "../Meeting/MeetingRow";
import { isToday, parseISO } from "date-fns";
import { meetingType, taskType } from "@/index";

const config = {
  task: {
    table: "tasks",
    dateColumn: "end_date",
    Component: TaskRowOverview,
    propName: "task",
    filterFn: (item: taskType) => !item.is_deleted && item.activity_status == "In Progress",
    progressFn: (items: taskType[]) => {
      const filtered = items.filter((t) => !t.is_deleted);
      const isCompleted = filtered.filter((t) => t.is_completed)
      const InProgress = filtered.filter((t) => t.activity_status == "In Progress");
      const progress =
        filtered.length === 0
          ? 0
          : (isCompleted.length / filtered.length) * 100;
      return {
        count: InProgress.length,
        progress: Math.round(progress),
      };
    },
  },
  meeting: {
    table: "meetings",
    dateColumn: "date_time",
    Component: MeetingRowOver,
    propName: "data",
    filterFn: (item: meetingType) => 
      !item.is_deleted && isToday(parseISO(item.date_time)),
    progressFn: (items: meetingType[]) => {
      const filtered = items.filter((m) => !m.is_deleted)
      const todayMeetings = items.filter(
        (m) => !m.is_deleted && isToday(parseISO(m.date_time))
      );
      const completed = filtered.filter((m) => m.is_completed);
      const progress =
          (completed.length / filtered.length) * 100;
      return {
        count: todayMeetings.length,
        progress: Math.round(progress),
      };
    },
  },
} as const;

export const CardHeader = ({
  data,
  type,
}: {
  data: taskType[] | meetingType[];
  type: "task" | "meeting";
}) => {
  
  const {count, progress} = type === "task"
    ? config.task.progressFn(data as taskType[])
    : config.meeting.progressFn(data as meetingType[]);

  return (
    <div className="flex items-center justify-between w-full border-[1.5px] border-[hsl(120,15%,20%)] px-10 py-3 rounded-t-[10px]">
      <div>
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">{type == "task" ? "Tasks" : "Meetings"}</h3>
        </div>
        <h5>{type == "task" ? "In Progress" : "Today Appointment"} : {count}</h5>
      </div>
      <div className="w-30 space-y-1">
        <div className="flex gap-3 items-center">
          <h4>{type == "task" ? "Completed" : "Attended"}</h4>
          <h5>{progress}%</h5>
        </div>
        <Progress value={progress} />
      </div>
    </div>
  );
};

export const CardContent = ({
  data,
  type,
}: {
  data: taskType[] | meetingType[];
  type: "task" | "meeting";
}) => {
  const { Component, filterFn } = config[type];

  return (
    <div className="max-h-84 bg-[hsl(120,2%,15%)] rounded-b-[10px] border-[1.5px] border-[hsl(0,0%,20%)]">
      <div className="mx-5 mt-3 space-y-2 overflow-y-auto max-h-76 min-h-10 mb-3">
        {data
          .filter(filterFn as (item: taskType | meetingType) => boolean)
          .map((item, key) => {
            return <Component data={item} key={key} />;
          })}
        {data.length == 0 && (
          <h4 className="mx-auto w-fit font-semibold">
            ! Feel Free to create new
          </h4>
        )}
      </div>
    </div>
  );
};

const HomeCard = ({ type }: { type: "task" | "meeting" }) => {
  const { table, dateColumn } = config[type];
  const { data: data = [] } = useData({ table: table, date: dateColumn });

  return (
    <div className="ml-10 mr-5">
      <CardHeader data={data} type={type} />
      <CardContent data={data} type={type} />
    </div>
  );
};

export default HomeCard;
