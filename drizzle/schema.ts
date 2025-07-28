import { pgTable, foreignKey, uuid, text, timestamp, pgPolicy, date, boolean, numeric, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const meetings = pgTable("meetings", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	title: text().notNull(),
	description: text(),
	dateTime: timestamp("date_time", { withTimezone: true, mode: 'string' }).notNull(),
	venue: text(),
	otherDetails: text("other_details"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [userInfo.id],
			name: "meetings_user_id_user_info_id_fk"
		}).onDelete("cascade"),
]);

export const tasksLike = pgTable("tasks_like", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	taskId: uuid("task_id").notNull(),
	likes: text().array().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.taskId],
			foreignColumns: [tasks.id],
			name: "tasks_like_task_id_tasks_id_fk"
		}).onDelete("cascade"),
]);

export const tasks = pgTable("tasks", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	taskTitle: text("task_title").notNull(),
	taskDescription: text("task_description"),
	taskPriority: text("task_priority").notNull(),
	endDate: date("end_date"),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow(),
	isPublic: boolean("is_public").default(false),
	isCompleted: boolean("is_completed").default(false),
	assignTo: text("assign_to").array(),
	startDate: date("start_date"),
	isDeleted: boolean("is_deleted").default(false),
	taskStatus: text("task_status"),
	completionPer: numeric("completion_per").default('0'),
	activityStatus: text("activity_status").default('Not Started'),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [userInfo.id],
			name: "tasks_user_id_user_info_id_fk"
		}).onDelete("cascade"),
	pgPolicy("Enable users to view their own data only", { as: "permissive", for: "select", to: ["authenticated"], using: sql`(( SELECT auth.uid() AS uid) = user_id)` }),
	pgPolicy("Enable delete for users based on user_id", { as: "permissive", for: "delete", to: ["public"] }),
	pgPolicy("Enable insert for authenticated users only", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Enable update for users based on email", { as: "permissive", for: "update", to: ["public"] }),
]);

export const subTasks = pgTable("sub_tasks", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	taskId: uuid("task_id").notNull(),
	subTaskTitle: text("sub_task_title").notNull(),
	isCompleted: boolean("is_completed").default(false).notNull(),
	endDate: date("end_date"),
	taskDescription: text("task_description"),
}, (table) => [
	foreignKey({
			columns: [table.taskId],
			foreignColumns: [tasks.id],
			name: "sub_tasks_task_id_tasks_id_fk"
		}).onDelete("cascade"),
	pgPolicy("Enable insert for authenticated users only", { as: "permissive", for: "insert", to: ["authenticated"], withCheck: sql`true`  }),
	pgPolicy("Only subtasks of the tasks can see the,", { as: "permissive", for: "select", to: ["public"] }),
	pgPolicy("Enable delete for users based on user_id", { as: "permissive", for: "delete", to: ["public"] }),
	pgPolicy("Policy with table joins", { as: "permissive", for: "update", to: ["public"] }),
]);

export const userInfo = pgTable("user_info", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userName: text("user_name").notNull(),
	userEmail: text("user_email").notNull(),
	userDob: text("user_DOB"),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow(),
	avatarUrl: text("avatar_url").notNull(),
	name: text().notNull(),
}, (table) => [
	unique("user_info_user_name_unique").on(table.userName),
	unique("user_info_user_email_unique").on(table.userEmail),
]);
