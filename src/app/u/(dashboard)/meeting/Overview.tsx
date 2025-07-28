import { MeetingRowOver } from "@/components/Meeting/MeetingRow";
import { meetingType } from "@/index";
import React from "react";

const Overview = ({ meet } : {meet : meetingType[]}) => {
      const today = new Date().toISOString()
      const filteredData = meet.filter((meet : meetingType) =>
                  !meet.is_completed &&
                  meet.date_time <= today &&
                  !meet.is_deleted)
  return (
    <div className="pt-3">
          <h3>To catch up</h3>
          <div
            className="space-y-2 overflow-y-auto h-[700px] pt-5 relative">
            {filteredData.length > 0 ? (
  filteredData.map((task: meetingType) => (
    <div
      key={task.id}
      className="flex justify-between gap-x-3 items-center mx-5"
    >
      <MeetingRowOver data={task} />
    </div>
  ))
) : (
      <h4 className="!text-text-secondary text-center mt-10 border-text-secondary border px-2 py-1 rounded-[6px] bg-Secondary cursor-default w-fit mx-auto">No data to display</h4>
)}
          </div>
        </div>
  );
};

export default Overview;
