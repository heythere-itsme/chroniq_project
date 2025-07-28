"use client";
import React, { useEffect } from "react";
import SubTaskRow from "./SubTaskRow";
import { useSSubTasks } from "@/lib/(fetchings)/fetchClient";
import { useSubTaskStore } from "@/lib/utils/Context";
import { subTaskSchema } from "@/lib/utils/FormSchemas";
import { z } from "zod";
import { nanoid } from "nanoid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { PlusIcon } from "lucide-react";
import { AddSubTask } from "../DashboardPage/dashHandle-button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Tags from "./tags";

type SubTaskSchema = z.infer<typeof subTaskSchema>;

export const AddSubTaskForm = () => {

  const addSubTask = useSubTaskStore((state) => state.addSubTask);

  const form = useForm<SubTaskSchema>({
    resolver: zodResolver(subTaskSchema),
    defaultValues: {
      sub_task_title: "",
      task_description: "",
      end_date: undefined,
      is_completed: false,
      priority: "High",
    },
  });

  const onSubmit = (values: SubTaskSchema) => {
    const newSubTask = {
      id: nanoid(),
      ...values,
      end_date: new Date(values.end_date),
    };
    addSubTask(newSubTask)
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation()
          form.handleSubmit(onSubmit)(e);
        }}
        className="relative pb-10"
      >
        <h4 className="mb-4">Sub Task Form</h4>

        <div className="space-y-5">
          <FormField
            control={form.control}
            name="sub_task_title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Title"
                    {...field}
                    className="w-60 !text-3 font-semibold"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2 items-center">
            <h4 className="w-25">Priority</h4>
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center">
            <h4 className="w-30">Due By</h4>
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button className="bg-primary-light cursor-pointer h-5 hover:bg-[hsl(0,0%,20%)]">
                          {field.value ? format(field.value, "PPP") : "Select"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="task_description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <textarea
                    placeholder="Description"
                    {...field}
                    className="w-60 font-semibold !text-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="button"
          className="h-5 !bg-[hsl(120,30%,30%)] hover:!bg-[hsl(120,61%,30%)] cursor-pointer mt-5 absolute right-3 !rounded-[4px]"
          onClick={form.handleSubmit(onSubmit)}
        >
          <PlusIcon size={10} strokeWidth={3} />
          Add
        </Button>
      </form>
    </Form>
  );
};

export const SubTaskForm = ({ id }: { id: string }) => {
  const { data: tasks = [], error } = useSSubTasks({ Tid: id });
  const subTasks = useSubTaskStore((state) => state.subTasks);

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <AddSubTask />
        </PopoverTrigger>
        <PopoverContent>
          <AddSubTaskForm />
        </PopoverContent>
      </Popover>

      <div className="overflow-auto h-[400px] w-fit">
        {error && <h4>Error: Try Later</h4>}
        {tasks.map((task) => (
          <SubTaskRow task={task} key={task.id} />
        ))}
        {(Array.isArray(subTasks) ? subTasks : []).map((task, key) => (
          <SubTaskRow task={task} key={key} />
        ))}
      </div>
    </div>
  );
};
