"use client";
import { toast } from "sonner";
import { addMeetings, addTaskSchema } from "./FormSchemas";
import { z } from "zod";
import { createClient } from "../supabase/client";
import { meetingType, taskType } from "@/index";
import { formatSeconds } from "@/components/Timer/Segment";
import { useQueryClient } from "@tanstack/react-query";

const supabase = createClient();

const HandleTasksSubmit = async ({
  data,
  subTasks,
  task,
}: {
  data: z.infer<typeof addTaskSchema>;
  subTasks?: any;
  task: any;
}) => {
  const {
    task_description,
    task_priority,
    task_title,
    is_public,
    start_date,
    end_date,
    is_completed,
    activity_status,
  } = data;

  if (task?.id) {
    const { error: updateError } = await supabase
      .from("tasks")
      .update({
        task_description,
        task_title,
        task_priority,
        start_date,
        end_date,
        is_public,
        is_completed,
        activity_status,
      })
      .eq("id", task.id);

    if (updateError) {
      toast.error(`Error updating task: ${updateError.message}`);
      return;
    }

    if (subTasks.length > 0) {
      const sanitizedSubTasks = subTasks.map(({ id, ...rest }) => rest);

      await Promise.all(
        sanitizedSubTasks.map((subTask) =>
          supabase.from("sub_tasks").insert({
            task_id: task?.id,
            ...subTask,
          })
        )
      );
    }

    return true;
  } else {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      toast.error("User not authenticated");
      return;
    }

    const { data: taskid, error: insertError } = await supabase
      .from("tasks")
      .insert({
        user_id: user.id,
        task_description,
        task_title,
        task_priority,
        start_date,
        end_date,
        is_public,
        activity_status,
      })
      .select("id")
      .single();

    if (insertError) {
      toast.error(`Error inserting task: ${insertError.message}`);
      return;
    }

    if (subTasks.length > 0) {
      const sanitizedSubTasks = subTasks.map(({ id, ...rest }) => rest);
      await Promise.all(
        sanitizedSubTasks.map((subTask) =>
          supabase.from("sub_tasks").insert({
            task_id: taskid?.id,
            ...subTask,
          })
        )
      );
    }
    return true;
  }
};

const HandleMeetSubmit = async ({
  data,
  Meet,
}: {
  data: z.infer<typeof addMeetings>;
  Meet: any;
}) => {
  const { date_time, is_completed, title, description, venue } = data;

  if (Meet?.id) {
    const { error } = await supabase
      .from("meetings")
      .update({
        title,
        description,
        date_time,
        venue,
        is_completed,
      })
      .eq("id", Meet.id);

    if (error) toast.error("Error Occured");
  } else {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      toast.error("User not authenticated");
      return;
    }

    const { error: insertError } = await supabase.from("meetings").insert({
      user_id: user.id,
      title,
      description,
      date_time,
      is_completed,
      venue,
    });

    if (insertError) toast.error("Error Occured");
  }
  toast.success("Success");
};

const handleCheck = async ({
  task,
  table,
  query,
}: {
  task: meetingType | taskType;
  table: string;
  query: any;
}) => {
  const { error } = await supabase
    .from(table)
    .update({
      is_completed: !task.is_completed,
      completed_at: new Date().toISOString(),
    })
    .eq("id", task.id);

  if (error) toast.error(error.message);

  query.invalidateQueries({ queryKey: [table] });
};

const handleDelete = async ({
  data,
  table,
  query,
}: {
  data: meetingType | taskType;
  table: string;
  query: any;
}) => {
  if (data) {
    const { error } = await supabase
      .from(table)
      .update({
        is_deleted: !data.is_deleted,
        deleted_at: new Date().toISOString(),
      })
      .eq("id", data.id);
    if (error) console.log(error, "Delete");
    query.invalidateQueries({ queryKey: [table] });
  } else {
    toast.error("No data found");
  }
};

const handleUsedSeconds = async ({
  timerName,
  totalUsed,
  id,
}: {
  timerName: string;
  totalUsed: number;
  id: string;
}) => {
  // Pausing — update Supabase
  const { error } = await supabase
    .from("timer")
    .update({
      used: formatSeconds(totalUsed),
    })
    .eq("id", id);

  if (error) console.error(error?.message);
};

const handleTimerDelete = async ({ id, query }: { id: string; query: any }) => {
  const { error } = await supabase.from("timer").delete().eq("id", id);
  await query.invalidateQueries({ queryKey: ["timer"] })

  if (error) console.error(error.message);
};

export {
  HandleTasksSubmit,
  handleCheck,
  handleDelete,
  HandleMeetSubmit,
  handleUsedSeconds,
  handleTimerDelete,
};
