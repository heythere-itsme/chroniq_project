"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { useState } from "react";
import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { AtSign } from "lucide-react";
import { Input } from "../ui/input";
import { noteType } from "@/index";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import Document from "@tiptap/extension-document";
import { useQueryClient } from "@tanstack/react-query";

const supabase = createClient();

const Tiptap = ({ data }: { data?: noteType }) => {
  const [notesData, setNotesData] = useState<string | object>(
    data ? data.text_data : ""
  );
  const [title, setTitle] = useState(data?.title || "");
  const query = useQueryClient()

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image,
      TaskList,
      TaskItem.extend({
        nested: true,
      }),
      Document,
      Highlight,
    ],
    content: data ? data.text_data : notesData,
    onUpdate: ({ editor }) => {
      setNotesData(editor.getJSON());
    },
  });

  const handleNotes = async () => {
    if (!data) {
      // Create new note
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        toast.error("User not authenticated");
        return;
      }

      const { error } = await supabase.from("notes").insert({
        user_id: user.id,
        text_data: notesData,
        title: title,
        updated_at: new Date().toISOString(),
      });

      if (error) console.log(error);
    } else {
      // Update existing note
      const { error } = await supabase
        .from("notes")
        .update({
          title: title,
          text_data: notesData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", data.id);

      if (error) console.log(error);
    }
    toast.success("Note Saved");
    query.invalidateQueries({ queryKey: ["notes"] })
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      console.log("No note found");
      return;
    }

    const { error } = await supabase
      .from("notes")
      .update({ is_deleted: !data?.is_deleted,
        deleted_at: new Date().toISOString(),
       })
      .eq("id", id);

    if (error) console.log(error);
    else toast.success(data?.is_deleted ? "Note Restored" : "Note Deleted");
    query.invalidateQueries({ queryKey: ["notes"] })
  };

  const date = new Date(data?.updated_at || new Date().toISOString());
  const date_updated = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="pl-5 relative">
      <div>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add Title"
          className="font-bold !text-1 border-none shadow-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
        />
        <h4 className="flex items-center gap-1">
          Updated <AtSign size={10} />
          {date_updated}
        </h4>
      </div>

      <div className="w-fill h-[1px] bg-text-secondary my-4 mr-5" />

      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="mr-5 h-[650px] overflow-y-auto rounded-[10px] px-3 bg-primary-light mt-5"
      />
      <div className="mx-10 space-x-5 mb-5">
        <Button
          onClick={handleNotes}
          className="cursor-pointer bg-[hsl(120,20%,25%)] hover:!bg-[hsl(120,50%,25%)] absolute top-10 right-5 !h-5"
        >
          Save
        </Button>

        {data?.id && (
          <Button
            onClick={() => handleDelete(data.id)}
            className="cursor-pointer bg-[hsl(0,20%,25%)] hover:!bg-[hsl(0,50%,25%)] absolute top-10 right-30 !h-5"
          >
            {data?.is_deleted ? "Restore" : "Delete"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Tiptap;
