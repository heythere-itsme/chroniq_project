"use client";
import TabSection from "@/components/DashboardPage/TabSection";
import SheetContainer from "@/components/task/SheetContainer";

const DashboardLayout = () => {
  return (
    <div className="mx-5 px-4 rounded-[10px] w-[1150px]">
      <div className="flex items-center justify-between pb-4 pt-2">
        <h2 className="font-semibold">Task</h2>
      </div>
      <TabSection />
      <SheetContainer />
    </div>
  );
};

export default DashboardLayout;
