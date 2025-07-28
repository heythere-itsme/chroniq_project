import { create } from "zustand";

type SubTask = {
  id: string;
  sub_task_title: string;
  task_description: string;
  end_date: Date;
  is_completed: boolean;
  priority: string;
};

type SubTaskState = {
  subTasks: SubTask[];
  setSubTasks: (tasks: SubTask[]) => void;
  addSubTask: (task: SubTask) => void;
};

export const useSubTaskStore = create<SubTaskState>((set) => ({
  subTasks: [],
  setSubTasks: (tasks) => set({ subTasks: tasks }),
  addSubTask: (task) =>
    set((state) => ({ subTasks: [...state.subTasks, task] })),
}));
