import { TaskRowOverview } from "@/components/task/taskrowOver";

const Overview = ({ tasks }) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="pt-3">
      <h3>All you got today</h3>
      <div
        className="space-y-2 overflow-y-auto h-[700px] pt-5 relative">
        {tasks
          .filter(
            (task) =>
              !task.is_completed &&
              tasks[0].start_date <= today &&
              !task.is_deleted
          )
          .map((task) => (
            <div
              key={task.id}
              className="flex justify-between gap-x-3 items-center mx-5"
            >
              <TaskRowOverview data={task} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Overview;
