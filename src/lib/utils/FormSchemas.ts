import { z } from "zod";

const subTaskSchema = z.object({
  sub_task_title: z.string(),
  task_description: z.string(),
  end_date: z.date(),
  is_completed: z.boolean().optional(),
  priority: z.string(),
});

const addTaskSchema = z.object({
    task_title: z.string().min(1, 'Title is required'),
    task_description: z.string(),
    task_priority: z.string(),
    is_public: z.boolean().default(false),
    start_date: z.date(),
    end_date: z.date(),
    is_completed: z.boolean().default(false),
    activity_status: z.string(),
})

const SignUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  user_email: z.string().email(),
  user_password: z.string().min(6),
});

const LogInSchema = z.object({
  user_email: z.string().email(),
  user_password: z.string().min(6, "Password must be at least 6 characters"),
});

const emailSchema = z.object({
  user_email: z.string().email()
})

const addMeetings = z.object({
  title: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  venue: z.string().optional(),
  date_time: z.coerce.date(),
  is_completed: z.boolean(),
  priority: z.string(),
})

export {addTaskSchema, SignUpSchema, LogInSchema, emailSchema, subTaskSchema, addMeetings}