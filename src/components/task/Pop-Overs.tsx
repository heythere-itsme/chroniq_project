"use client";
import { addTaskSchema } from "@/lib/utils/FormSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { AlarmClockCheck, CalendarIcon, ChevronDown } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { toast } from "sonner";
import Tags from "./tags";
import { useQueryClient } from "@tanstack/react-query";
import { useSubTaskStore } from "@/lib/utils/Context";
import { Checkbox } from "../ui/checkbox";
import { handleDelete, HandleTasksSubmit } from "@/lib/utils/TasknMeet";
import { differenceInCalendarDays, isAfter } from "date-fns";
import { SubTaskForm } from "./SubTaskForm";

export const AddTaskPopOver = ({ task }: { task?: any }) => {

  const subTasks = useSubTaskStore((state) => state.subTasks);
  const setSubTasks = useSubTaskStore((state) => state.setSubTasks);

  const query = useQueryClient();

  function getTaskStatus({
    end_date,
    is_completed,
    completed_at,
  }: {
    end_date: string;
    is_completed: boolean;
    completed_at: Date | null;
  }) {
    const end = new Date(end_date);

    if (!is_completed) {
      const diff = differenceInCalendarDays(end, new Date());
      return diff >= 0
        ? `${diff} day${diff !== 1 ? "s" : ""} left`
        : `Overdue by ${Math.abs(diff)} day${Math.abs(diff) !== 1 ? "s" : ""}`;
    }

    if (completed_at) {
      const completed = dateFxn(completed_at);

      if (isAfter(completed, end)) {
        const lateDays = differenceInCalendarDays(completed, end);
        return `Late submission by ${lateDays} day${lateDays !== 1 ? "s" : ""}`;
      } else {
        return `Early completion @ ${completed}`;
      }
    }

    return "Completed";
  }

  const form = useForm<z.infer<typeof addTaskSchema>>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      task_title: "",
      task_description: "",
      task_priority: "High",
      is_public: false,
      start_date: undefined,
      end_date: undefined,
      is_completed: undefined,
      activity_status: "Not Started",
    },
  });

  useEffect(() => {
    if (task) {
      form.reset({
        task_title: task.task_title ?? "",
        task_description: task.task_description ?? "",
        task_priority: task.task_priority ?? "",
        is_public: task.is_public ?? false,
        start_date: task.start_date ? new Date(task.start_date) : undefined,
        end_date: task.end_date ? new Date(task.end_date) : undefined,
        activity_status: task.activity_status ?? "",
      });
    }
  }, [task, form]);

  const onSubmit = async (data: z.infer<typeof addTaskSchema>) => {
    const result = await HandleTasksSubmit({ data, subTasks, task });
    if (result) {
    setSubTasks([]); // clear local state
    toast.success("Task created successfully!");
    await query.invalidateQueries({ queryKey: ["tasks"] });
    await query.invalidateQueries({ queryKey: ["sub_tasks"] });
    form.reset();
  }
  };

  const dateFxn = (date: Date) => {
    const dateform = new Date(date).toLocaleString("en-GB", {
      month: "short",
      day: "2-digit",
      year: "2-digit",
    });
    return dateform;
  };

  return (
    <div className="popOverStyle relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="is_completed"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        className="border rounded-[4px] h-5 w-5"
                        checked={field.value ?? false}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="task_title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Add Title"
                        type="text"
                        {...field}
                        value={field.value ?? ""}
                        className="!text-1 font-semibold !h-8"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-2">
              <AlarmClockCheck size={15} />
              <h5 className="font-semibold">
                {task ? getTaskStatus(task) : "Hi"}
              </h5>
            </div>
          </div>
          <div className="w-fill h-[1px] bg-text-secondary my-4 mr-5" />{" "}
          {/* Separator */}
          {/* Middle */}
          <div className="space-y-2">
            {/* Status */}
            <div className="flex items-start gap-20">
              <div className="w-20">
                <h4>Status</h4>
                <h4 className="font-semibold">
                  {form.watch("activity_status") || "Select"}
                </h4>
              </div>
              <FormField
                control={form.control}
                name="activity_status"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-[hsl(0,0%,20%)] cursor-pointer !h-5 mt-1">
                          <ChevronDown strokeWidth={3} />
                        </SelectTrigger>
                        <SelectContent className="bg-primary-dark border-primary-light">
                          <SelectGroup>
                            <SelectItem value="Not Started">
                              <Tags
                                name="Not Started"
                                color="rgba(238, 99, 82, .3)"
                                dotcolor="hsl(0, 60%, 50%)"
                              />
                            </SelectItem>
                            <SelectItem value="In Progress">
                              <Tags
                                name="In Progress"
                                color="rgba(254, 231, 92, .3)"
                                dotcolor="hsl(60, 60%, 50%)"
                              />
                            </SelectItem>
                            <SelectItem value="Completed">
                              <Tags
                                name="Completed"
                                color="rgba(123, 239, 178, .3)"
                                dotcolor="hsl(120, 60%, 50%)"
                              />
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Priority */}
            <div className="flex items-start gap-20">
              <div className="w-20">
                <h4>Priority</h4>
                <h4 className="font-semibold">
                  {form.watch("task_priority") || "Select"}
                </h4>
              </div>
              <FormField
                control={form.control}
                name="task_priority"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-[hsl(0,0%,20%)] cursor-pointer !h-5 mt-1">
                          <ChevronDown strokeWidth={3} />
                        </SelectTrigger>
                        <SelectContent className="bg-primary-dark w-fit">
                          <SelectGroup>
                            <SelectItem value="High">
                              <Tags
                                name="High"
                                color="rgba(42,172,82,.3)"
                                dotcolor="hsl(120, 60%, 50%)"
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Dates */}
            <div className="flex items-center">
              <div className="flex gap-4">
                <div className="w-20">
                  <h4>Start Date</h4>
                  <h4 className="font-semibold">
                    {form.watch("start_date")
                      ? dateFxn(form.watch("start_date"))
                      : "Select"}
                  </h4>
                </div>
                <div className="w-20">
                  <h4>End Date</h4>
                  <h4 className="font-semibold">
                    {form.watch("end_date")
                      ? dateFxn(form.watch("end_date"))
                      : "Select"}
                  </h4>
                </div>
              </div>
              <FormField
                control={form.control}
                name="start_date" // bind just one field for integration, set both manually
                render={() => (
                  <FormItem className="flex">
                    <Popover>
                      <PopoverTrigger
                        asChild
                        className="bg-[hsl(0,0%,20%)] cursor-pointer px-1 py-1 h-8 w-8 rounded-[4px]"
                      >
                        <CalendarIcon size={15} />
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="range"
                          selected={{
                            from: form.watch("start_date"),
                            to: form.watch("end_date"),
                          }}
                          onSelect={(range) => {
                            form.setValue("start_date", range?.from);
                            form.setValue("end_date", range?.to);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Assign To *feature not avaliable */}
            <div className="w-20">
              <h4>Assigned To</h4>
              <h4 className="font-semibold">{"No One"}</h4>
            </div>
            {/* Description */}
            <div>
              <h4>Description</h4>
              <FormField
                control={form.control}
                name="task_description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="!w-fill overflow-y-auto font-semibold"
                        placeholder="Add Description"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-fill h-[1px] bg-text-secondary my-4 mr-5" />{" "}
          {/* Separator */}
          {/* Subtask Section */}
          <div className="mt-3">
            <SubTaskForm id={task?.id} />
          </div>
          {/* Save Button */}
          <Button
            type="submit"
            className="cursor-pointer bg-[hsl(120,20%,25%)] hover:!bg-[hsl(120,50%,25%)] absolute top-10 right-5 !h-5"
          >
            <h4>Save</h4>
          </Button>
        </form>
      </Form>

      {/* Delete Buttons */}
      <Button
        onClick={() => {
          if (task) {
            handleDelete({ data: task, table: "tasks", query });
          }
        }}
        className="cursor-pointer bg-[hsl(0,20%,25%)] hover:!bg-[hsl(0,50%,25%)] absolute top-10 right-25 !h-5"
        disabled={!task}
      >
        {task ? (task.is_deleted ? "Restore" : "Delete") : "Delete"}
      </Button>
    </div>
  );
};
