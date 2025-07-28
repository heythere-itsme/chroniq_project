import { MeetingRowList } from "@/components/Meeting/MeetingRow";
import { meetingType } from "@/index";
import React from "react";

const Upcoming = ({ meet : dataset } : {meet: meetingType[]}) => {
  const filteredData = dataset.filter(
  (data) => !data.is_completed && !data.is_deleted
);

  return (
    <div className="pt-3">
      <h3>Next up</h3>
      <div
        className="space-y-2 overflow-y-auto h-[700px] pt-5 relative">
        {filteredData.length > 0 ? (
      filteredData.map((data) => (
        <div
          key={data.id}
          className="flex justify-between gap-x-3 items-center mx-5"
        >
          <MeetingRowList data={data} />
        </div>
      ))
    ) : (
      <h4 className="!text-text-secondary text-center mt-10 border-text-secondary border px-2 py-1 rounded-[6px] bg-Secondary cursor-default w-fit mx-auto">No data to display</h4>
    )}
      </div>
    </div>
  );
};

export default Upcoming;
