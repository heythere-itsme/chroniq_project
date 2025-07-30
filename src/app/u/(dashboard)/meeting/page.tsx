import MeetingTab from "./MeetingTab";

const MeetingPage = () => {

  return (
    <div className="mx-5 px-4 rounded-[10px] w-[1300px]">
      <div className="flex items-center justify-between pb-4 pt-2">
        <h2 className="font-semibold">Meeting</h2>
    </div>
    <MeetingTab />
    </div>
  );
};

export default MeetingPage;
