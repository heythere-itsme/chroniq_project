import { format } from "date-fns";
import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import { useSubTaskStore } from "@/lib/utils/Context";
import { Input } from "../ui/input";
import { useQueryClient } from "@tanstack/react-query";
import Tags from "./tags";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarIcon, Ellipsis } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

const supabase = createClient();

const SubTaskRow = ({ task }: { task: any }) => {
  const queryClient = useQueryClient();

  const subTasks = useSubTaskStore((s) => s.subTasks);
  const setSubTasks = useSubTaskStore((s) => s.setSubTasks);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    sub_task_title: task.sub_task_title,
    task_description: task.task_description,
    end_date: task.end_date,
    priority: task.priority,
  });

  const handleCheck = async (id: string) => {
    if (task.task_id) {
      const { error } = await supabase
        .from("sub_tasks")
        .update({ is_completed: !task.is_completed })
        .eq("id", id);
      if (error) console.log(error);
    } else {
      task.is_completed = !task.is_completed;
      console.log(task.is_completed);
    }
    queryClient.invalidateQueries({ queryKey: ["sub_tasks"] });
    queryClient.invalidateQueries({ queryKey: ["tasks"] }); // i added this line
  };

  const handleDelete = async () => {
    if (task.task_id) {
      const { error } = await supabase
        .from("sub_tasks")
        .delete()
        .eq("id", task.id);
      if (error) console.log(error, "delete");
    } else {
      setSubTasks(subTasks.filter((t: typeof task) => t.id !== task.id));
    }
    queryClient.invalidateQueries({ queryKey: ["sub_tasks"] });
  };

  const handleEditSubmit = async () => {
    if (task.task_id) {
      const { error } = await supabase
        .from("sub_tasks")
        .update({
          sub_task_title: editData.sub_task_title,
          task_description: editData.task_description,
          end_date: editData.end_date,
          priority: editData.priority,
        })
        .eq("id", task.id);
      if (error) {
        console.log(error);
      }
    } else {
      setSubTasks(
        subTasks.map((t: typeof task) => (t.id === task.id ? { ...t, ...editData } : t))
      );
    }
    setIsEditing(false);
    queryClient.invalidateQueries({ queryKey: ["sub_tasks"] });
  };

  return (
    <div className="p-2">
      <div className="SubTask-Row">
        {!isEditing ? (
          <div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  onClick={() => handleCheck(task.id)}
                  checked={task.is_completed}
                  className="h-5 w-5"
                />
                <h4 className="w-60">{task.sub_task_title}</h4>
              </div>
              <div className="flex items-center">
                <h4 className="w-20">Due Date:</h4>
                <h4 className="w-25">
                  {format(new Date(task.end_date), "PP")}
                </h4>
              </div>
            </div>
            <div className="flex justify-between pr-10">
              <h5 className="ml-5 !text-text-secondary">{task.task_description}</h5>
              <h4 className="flex items-center gap-2">
                Priority:
                {
                  <Tags
                    name={task.priority}
                    color={
                      task.priority === "High"
                        ? "rgba(42,172,82,.3)"
                        : task.priority === "Medium"
                        ? "rgba(153,102,255,.3)"
                        : "rgba(254,231,92,.3)"
                    }
                    dotcolor={
                      task.priority === "High"
                        ? "hsl(120, 60%, 50%)"
                        : task.priority === "Medium"
                        ? "hsl(260, 60%, 50%)"
                        : "hsl(60, 60%, 50%)"
                    }
                  />
                }
              </h4>
            </div>
          </div>
        ) : (
          <div className="w-[490px]">
            <div className="flex justify-between pr-10">
              <Input
                value={editData.sub_task_title || ""}
                onChange={(e) =>
                  setEditData({ ...editData, sub_task_title: e.target.value })
                }
                placeholder="Title"
                className="!w-60"
              />

              {/* Calendar */}
              <div className="flex gap-2 items-center">
                <h4>
                  {editData.end_date
                    ? format(new Date(editData.end_date), "PPP")
                    : "No date"}
                </h4>
                <Popover>
                  <PopoverTrigger asChild>
                    <CalendarIcon className="h-5 w-5 cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        editData.end_date
                          ? new Date(editData.end_date)
                          : undefined
                      }
                      onSelect={(date) => {
                        if (date) {
                          setEditData({ ...editData, end_date: date });
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex justify-between pr-10 mt-3">
              <Input
                value={editData.task_description || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    task_description: e.target.value,
                  })
                }
                placeholder="Description"
                className="!w-60"
              />
              {/* priority */}
              <div className="flex gap-1 items-center">
                <h4>Priority :</h4>
                <Select
                  value={editData.priority}
                  onValueChange={(value) =>
                    setEditData({ ...editData, priority: value })
                  }
                >
                  <SelectTrigger className="w-fit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-Secondary z-50">
                    <SelectGroup>
                      <SelectItem value="High">
                        <Tags
                          name="High"
                          color="rgba(42,172,82,.3)"
                          dotcolor="hsl(120, 60%, 50%)"
                        />
                      </SelectItem>
                      <SelectItem value="Medium">
                        <Tags
                          name="Medium"
                          color="rgba(153,102,255,.3)"
                          dotcolor="hsl(260, 60%, 50%)"
                        />
                      </SelectItem>
                      <SelectItem value="Low">
                        <Tags
                          name="Low"
                          color="rgba(254,231,92,.3)"
                          dotcolor="hsl(60, 60%, 50%)"
                        />
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Button */}
            <div className="flex flex-col mt-4 gap-2">
              <Button
                onClick={handleEditSubmit}
                className="bg-[hsl(120,30%,30%)] hover:bg-[hsl(120,61%,30%)] cursor-pointer h-5"
              >
                Save
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                className="bg-[hsl(0,0%,15%)] hover:bg-[hsl(0,0%,20%)] cursor-pointer h-5"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
        {!isEditing && (
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="bg-Secondary rounded-[4px] w-8 cursor-pointer hover:bg-primary-light items-center"
            >
              <Ellipsis className="cursor-pointer rotate-90" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-Secondary space-y-2">
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default SubTaskRow;
