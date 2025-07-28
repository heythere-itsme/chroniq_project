import { relations } from "drizzle-orm/relations";
import { userInfo, meetings, tasks, tasksLike, subTasks } from "./schema";

export const meetingsRelations = relations(meetings, ({one}) => ({
	userInfo: one(userInfo, {
		fields: [meetings.userId],
		references: [userInfo.id]
	}),
}));

export const userInfoRelations = relations(userInfo, ({many}) => ({
	meetings: many(meetings),
	tasks: many(tasks),
}));

export const tasksLikeRelations = relations(tasksLike, ({one}) => ({
	task: one(tasks, {
		fields: [tasksLike.taskId],
		references: [tasks.id]
	}),
}));

export const tasksRelations = relations(tasks, ({one, many}) => ({
	tasksLikes: many(tasksLike),
	userInfo: one(userInfo, {
		fields: [tasks.userId],
		references: [userInfo.id]
	}),
	subTasks: many(subTasks),
}));

export const subTasksRelations = relations(subTasks, ({one}) => ({
	task: one(tasks, {
		fields: [subTasks.taskId],
		references: [tasks.id]
	}),
}));