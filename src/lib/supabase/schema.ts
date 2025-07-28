import {
  pgTable,
  uuid as pgUuid,
  text,
  timestamp,
  boolean,
//   uuidArray,
  date,
//   PgArray,
//   dateRange,
} from "drizzle-orm/pg-core";

// ---------------------- USER ----------------------

export const user_info = pgTable("user_info", {
  id: pgUuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").notNull(),
  user_name: text("user_name").notNull().unique(),
  user_email: text("user_email").notNull().unique(),
  user_DOB: text("user_DOB"),
  createdAt: timestamp("createdAt", { withTimezone: true, mode: "string" }).defaultNow(),
  avatar_url: text("avatar_url").notNull(),
});

// ---------------------- TASKS ----------------------

export const tasks = pgTable("tasks", {
  id: pgUuid("id").primaryKey().defaultRandom().notNull(),
  user_id: pgUuid("user_id").references(() => user_info.id, { onDelete: "cascade" }).notNull(),
  task_title: text("task_title").notNull(),
  task_description: text("task_description"),
  task_priority: text("task_priority").notNull(),
  start_date: date("start_date"),
  end_date: date("end_date"),
  createdAt: timestamp("createdAt", { withTimezone: true, mode: "string" }).defaultNow(),
  is_public: boolean("is_public").default(false),
  is_completed: boolean("is_completed").default(false),
  is_deleted: boolean("is_deleted").default(false),
  assign_to: text("assign_to").array(),
});

// ---------------------- SUB TASKS ----------------------

export const sub_tasks = pgTable("sub_tasks", {
  id: pgUuid("id").primaryKey().defaultRandom().notNull(),
  task_id: pgUuid("task_id").references(() => tasks.id, { onDelete: "cascade" }).notNull(),
  sub_task_title: text("sub_task_title").notNull(),
  is_completed: boolean("is_completed").default(false).notNull(),
});

// ---------------------- TASK LIKES ----------------------

export const tasks_like = pgTable("tasks_like", {
  id: pgUuid("id").primaryKey().defaultRandom().notNull(),
  task_id: pgUuid("task_id").references(() => tasks.id, { onDelete: "cascade" }).notNull(),
  likes: text("likes").array().notNull(),
});

// ---------------------- MEETINGS ----------------------

export const meetings = pgTable("meetings", {
  id: pgUuid("id").primaryKey().defaultRandom().notNull(),
  user_id: pgUuid("user_id").references(() => user_info.id, { onDelete: "cascade" }).notNull(),
  meeting_title: text("meeting_title").notNull(),
  meeting_description: text("meeting_description").notNull(),
  meeting_date: date("meeting_date").notNull(),
});
