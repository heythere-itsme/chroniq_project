import { useData } from "@/lib/(fetchings)/fetchClient";
import { format, isSameDay } from "date-fns";
import React from "react";
import CalRow from "./CalRow";
import { Circle } from "lucide-react";

const CalenderPopOver = ({ date }: { date: Date }) => {
  const { data: tasks = [] } = useData({ table: "tasks", date: "end_date" });
  const { data: meets = [] } = useData({
    table: "meetings",
    date: "date_time",
  });

  const filteredTasks = tasks.filter(
    (task) =>
      isSameDay(new Date(task.end_date), date) &&
      !task.is_completed &&
      !task.is_deleted
  );

  const filteredMeetings = meets.filter(
    (meet) =>
      isSameDay(new Date(meet.date_time), date) &&
      !meet.is_completed &&
      !meet.is_deleted
  );

  const formattedDate = format(date, "PP");
  const showTasks = filteredTasks.length > 0;
  const showMeetings = filteredMeetings.length > 0;

  return (
    <div className="ml-5">
      <h2 className="font-bold">{formattedDate}</h2>
      <div className="w-fill h-[1px] bg-text-secondary my-4 mr-5" />

      <div className="ml-5 space-y-5 h-fit">
        {showTasks && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Circle size={16} fill="#008000" strokeOpacity={0} />
              <h3>Tasks</h3>
            </div>
            {filteredTasks.map((task) => (
              <CalRow task={task} key={task.id} />
            ))}
          </div>
        )}

        {showMeetings && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Circle size={16} fill="#FF0000" strokeOpacity={0} />
              <h3>Meetings</h3>
            </div>
            {filteredMeetings.map((meet) => (
              <CalRow task={meet} key={meet.id} />
            ))}
          </div>
        )}

        {!showTasks && !showMeetings && (
          <div className="text-text-secondary font-semibold bg-primary-light mx-auto w-fit px-2 py-1 rounded-[4px] border mt-8">
            No data to display
          </div>
        )}
      </div>
    </div>
  );
};

export default CalenderPopOver;
