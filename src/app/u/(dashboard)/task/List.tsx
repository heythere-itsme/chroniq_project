"use client"
import { TaskRowList } from "@/components/task/taskrowOver"

const List = ({tasks}) => {

  return (
    <div className="pt-3">
      <h3>List View</h3>
      <div className="space-y-3 overflow-auto min-h-[700px] pt-4">
        {tasks
          .filter(task => !task.is_completed && !task.is_deleted)
          .map(task => (
            <div key={task.id} className="mx-5">
              <TaskRowList data={task} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default List
