-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "meetings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"meeting_title" text NOT NULL,
	"meeting_description" text NOT NULL,
	"meeting_date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks_like" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"task_id" uuid NOT NULL,
	"likes" text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_info" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_name" text NOT NULL,
	"user_email" text NOT NULL,
	"user_password" text NOT NULL,
	"user_DOB" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"avatar_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"task_title" text NOT NULL,
	"task_description" text NOT NULL,
	"task_status" text NOT NULL,
	"task_priority" text NOT NULL,
	"task_due_range" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"is_public" boolean DEFAULT false NOT NULL,
	"is_completed" boolean DEFAULT false NOT NULL,
	"assign_to" text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sub_tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"task_id" uuid NOT NULL,
	"sub_task_title" text NOT NULL,
	"is_completed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_user_id_user_info_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_info"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks_like" ADD CONSTRAINT "tasks_like_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_user_id_user_info_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_info"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sub_tasks" ADD CONSTRAINT "sub_tasks_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;
*/