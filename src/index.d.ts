export type taskType = {
  id: string;
  task_title: string;
  task_description: string;
  start_date: string | Date;
  end_date: string | Date;
  is_completed: boolean;
  task_priority: "High" | "Low";
  activity_status: "Not Started" | "In Progress" | "Completed";
  is_public: boolean;
  completion_per: number;
  is_deleted: boolean;
  completed_at: Date;
  assign_to: Array<{id: string; avatar_url: string; user_name: string}>;
};

export type meetingType = {
  id: string;
  title: string;
  description: string;
  date_time: string;
  venue: string;
  is_deleted: boolean;
  is_completed: boolean;
  priority: string;
  invite: Array<{id: string; avatar_url: string; user_name: string}>;
};

export type noteType = {
  id: string;
  title: string;
  text_data: string;
  updated_at: Date;
  is_deleted: boolean;
};

export type chatType = {
  id: string;
  created_by: string;
  created_at: Date;
  reciever: string;
  status: "pending" | "friends" | "blocked"
}

export type messgType = {
  id: string;
  chat_id: string;
  created_at: Date;
  edited_at: Date;
  sender_id: string;
  content: JSON;
  type: "text" | "image" | "task" | "meeting";
}