import { MeetingRowComp } from "@/components/Meeting/MeetingRow";
import { meetingType } from "@/index";
import React from "react";

const Attended = ({ meet } : {meet: meetingType[]}) => {
  return (
    <div className="pt-3">
      <h3>Already Attended</h3>
      <div
        className="space-y-2 overflow-y-auto h-[700px] pt-5 relative">
        {meet.filter(meet => meet.is_completed && !meet.is_deleted).length > 0 ? (
      meet
        .filter(meet => meet.is_completed && !meet.is_deleted)
        .map((meet) => (
          <MeetingRowComp data={meet} key={meet.id} />
        ))
    ) : (
      <h4 className="!text-text-secondary text-center mt-10 border-text-secondary border px-2 py-1 rounded-[6px] bg-Secondary cursor-default w-fit mx-auto">No data to display</h4>
    )}
      </div>
    </div>
  );
};

export default Attended;
