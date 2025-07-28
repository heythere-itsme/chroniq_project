"use client";
import { meetingType, noteType, taskType } from "@/index";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { textAnimation } from "@/lib/utils/gsapAnimation";
import { RotateCw, Trash } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

const supabase = createClient();

const Config = {
  Restore: {
    text: "Restore All",
    className: "bg-Selected",
    Icon: Trash,
  },
  Delete: {
    text: "Delete All",
    className: "bg-alert-accent",
    Icon: RotateCw,
  },
};

const TrashButton = ({
  type,
  onClick,
}: {
  type: string;
  onClick: () => void;
}) => {
  const { text, Icon, className } = Config[type];
  const textRef = useRef(null);
  const iconRef = useRef(null);
  const { handleEnter, handleLeave } = textAnimation(textRef, iconRef);

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-2 py-1 rounded-[4px] w-fit cursor-pointer",
        className
      )}
      onClick={onClick}
      onMouseOver={handleEnter}
      onMouseLeave={handleLeave}
    >
      <h5 className="!text-black font-semibold" ref={textRef}>
        {text}
      </h5>
      <Icon ref={iconRef} color="#000000" size={20} />
    </div>
  );
};

const handleRestore = async ({
  filtered,
}: {
  filtered: taskType[] | meetingType[] | noteType[];
}) => {
  if (!filtered?.length) return toast.warning("Nothing to restore.");
  const results = await Promise.allSettled(
    filtered.map(async (res) => {
      let table;
      if ("text_data" in res) {
        table = "notes";
      } else if ("title" in res) {
        table = "meetings";
      } else {
        table = "tasks";
      }

      const { error } = await supabase
        .from(table)
        .update({ is_deleted: false })
        .eq("id", res.id);

      if (error) {
        console.log(`Error restoring ${res.title || res.task_title}`);
      }
    })
  );

  const failed = results.filter((r) => r.status === "rejected");

  if (failed.length > 0) {
    failed.forEach((r) => console.error((r as PromiseRejectedResult).reason));
    toast.error("Some items failed to restore.");
  } else {
    toast.success("All items restored successfully!");
  }
};

const handleAllDel = async ({
  filtered,
}: {
  filtered: taskType[] | meetingType[] | noteType[];
}) => {
  if (!filtered?.length) return toast.warning("Nothing to Delete.");
  const results = await Promise.allSettled(
    filtered.map(async (del) => {
      let table;
      if ("text_data" in del) {
        table = "notes";
      } else if ("title" in del) {
        table = "meetings";
      } else {
        table = "tasks";
      }

      const { error } = await supabase.from(table).delete().eq("id", del.id);

      if (error) {
        throw new Error(`Error deleting ${del.title || del.task_title}`);
      }
    })
  );

  const failed = results.filter((r) => r.status === "rejected");

  if (failed.length > 0) {
    failed.forEach((r) => console.error((r as PromiseRejectedResult).reason));
    toast.error("Some items failed to delete.");
  } else {
    toast.success("All items deleted successfully!");
  }
};

const ButtonSection = ({
  data
}: {
  data: { filtered: taskType[] | meetingType[] | noteType[] };
}) => {
  return (
    <div className="flex items-center gap-5">
      <TrashButton type="Delete" onClick={() => handleAllDel(data)} />
      <TrashButton type="Restore" onClick={() => handleRestore(data)} />
    </div>
  );
};

export default ButtonSection;
