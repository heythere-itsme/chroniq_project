"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlarmClockCheck,
  CalendarIcon,
  ChevronDown,
} from "lucide-react";
import { z } from "zod";
import { addMeetings } from "@/lib/utils/FormSchemas";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { handleDelete, HandleMeetSubmit } from "@/lib/utils/TasknMeet";
import { useQueryClient } from "@tanstack/react-query";
import { meetingType } from "@/index";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import Tags from "../task/tags";

const PopOverMeet = ({ Meet }: { Meet?: meetingType }) => {
  const query = useQueryClient();

  // Form setup

  const form = useForm<z.infer<typeof addMeetings>>({
    resolver: zodResolver(addMeetings),
    defaultValues: {
      title: "",
      description: "",
      venue: "",
      date_time: undefined,
      is_completed: false,
      priority: "High",
    },
  });

  useEffect(() => {
    if (Meet) {
      form.reset({
        title: Meet.title ?? "",
        description: Meet.description ?? "",
        venue: Meet.venue ?? "",
        date_time: Meet.date_time ? new Date(Meet.date_time) : undefined,
        is_completed: Meet.is_completed !== undefined ? Meet.is_completed : false,
        priority: Meet.priority ?? "High",
      });
    }
  }, [Meet, form]);

  // Temporary state for date and time
  // This is to handle the date and time separately before combining them

  const [tempDate, setTempDate] = React.useState<Date | undefined>(
    Meet?.date_time ? new Date(Meet.date_time) : undefined
  );
  const [tempTime, setTempTime] = React.useState(
    Meet?.date_time
      ? new Date(Meet.date_time).toTimeString().slice(0, 8)
      : "00:00:00"
  );

  const dateFxn = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const timeFxn = (date: Date) => {
    return date.toTimeString().slice(0, 5);
  };

  const combineDateTime = (date?: Date, timeString?: string) => {
    if (!date || !timeString) return;

    const [h, m, s] = timeString.split(":").map(Number);
    const final = new Date(date);
    final.setHours(h || 0);
    final.setMinutes(m || 0);
    final.setSeconds(s || 0);

    form.setValue("date_time", final);
  };

  // Handle form submission

  const OnSubmit = async (data: z.infer<typeof addMeetings>) => {
    await HandleMeetSubmit({ data, Meet });
    toast.success("Meeting created successfully!");
    query.invalidateQueries({ queryKey: ["meetings"] });
    form.reset();
  };

  return (
    <div className="popOverStyle relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(OnSubmit)}>
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="is_completed"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
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
                name="title"
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
              <h5 className="font-semibold">Hi</h5>
            </div>
          </div>
          <div className="w-fill h-[1px] bg-text-secondary my-4 mr-5" />{" "}
          {/* Separator */}

          {/* Middle */}
          <div className="space-y-2">
            {/* Priority */}
            <div className="flex items-start gap-20">
              <div className="w-20">
                <h4>Priority</h4>
                <h4 className="font-semibold">
                  {form.watch("priority") || "Select"}
                </h4>
              </div>
              <FormField
                control={form.control}
                name="priority"
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
                            <SelectItem value="Medium">
                              <Tags
                                name="Medium"
                                color="rgba(100,149,237,.3)" // You can change this if you want a different visual
                                dotcolor="hsl(220, 60%, 60%)"
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
            {/* date and time */}
            <div className="flex items-center">
              <div className="flex gap-4">
                <div className="w-20">
                  <h4>Date</h4>
                  <h4 className="font-semibold">
                    {form.watch("date_time")
                      ? dateFxn(form.watch("date_time"))
                      : "Select"}
                  </h4>
                </div>
                <div className="w-20">
                  <h4>Time</h4>
                  <h4 className="font-semibold">
                    {form.watch("date_time")
                      ? timeFxn(form.watch("date_time"))
                      : "Select"}
                  </h4>
                </div>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="bg-[hsl(0,0%,20%)] cursor-pointer px-2 py-2 h-8 w-8 rounded-[4px] flex items-center justify-center">
                    <CalendarIcon size={15} />
                  </button>
                </PopoverTrigger>

                <PopoverContent
                  className="w-auto overflow-hidden p-4 space-y-2"
                  align="start"
                >
                  {/* Calendar Selector */}
                  <Calendar
                    mode="single"
                    selected={tempDate}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setTempDate(date);
                      combineDateTime(date, tempTime);
                    }}
                  />

                  {/* Time Selector */}
                  <Input
                    type="time"
                    step="1"
                    value={tempTime}
                    onChange={(e) => {
                      setTempTime(e.target.value);
                      combineDateTime(tempDate, e.target.value);
                    }}
                    className="w-[130px] bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* Invite */}
            <div className="w-20">
              <h4>Invite</h4>
              <h4 className="font-semibold">{"No One"}</h4>
              </div>
            {/* Venue */}
            <div>
              <h4>Venue</h4>
              <FormField
              control={form.control}
              name="venue"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Add Venue" type="text" {...field} className="!w-fill overflow-y-auto font-semibold"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            {/* Description */}
            <div>
              <h4>Description</h4>
              <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Add Description" {...field} className="!w-fill overflow-y-auto font-semibold"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
          </div>

          <Button
            type="submit"
        className="cursor-pointer bg-[hsl(120,20%,25%)] hover:!bg-[hsl(120,50%,25%)] absolute top-10 right-5 !h-5"
          >
            <h4>Save</h4>
          </Button>
        </form>
      </Form>
      <Button
        onClick={() => {
          if (Meet) {
            handleDelete({ data: Meet, table: "meetings", query });
          }
        }}
        className="cursor-pointer bg-[hsl(0,20%,25%)] hover:!bg-[hsl(0,50%,25%)] absolute top-10 right-25 !h-5"
        disabled={!Meet}
      >
        {Meet ? (Meet.is_deleted ? "Restore" : "Delete") : "Delete"}
      </Button>
    </div>
  );
};

export default PopOverMeet;
