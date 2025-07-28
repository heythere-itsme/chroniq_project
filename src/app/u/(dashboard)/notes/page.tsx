"use client";
import React from "react";
import SheetContainer from "@/components/task/SheetContainer";
import { useData } from "@/lib/(fetchings)/fetchClient";
import DisplayNote from "@/components/Notes/DisplayNote";
import { ButtonComponent } from "@/components/DashboardPage/dashHandle-button";
import { useSheetStore } from "@/lib/utils/SheetContext";
import { PlusSquare } from "lucide-react";

const NotesPage = () => {
  const {openSheet} = useSheetStore();
  const { data: notes = [] } = useData({ table: "notes", date: "updated_at" });
  console.log(notes);
  return (
    <div className="mx-5 px-4 rounded-[10px] w-[1300px]">
      <div className="flex items-center justify-between pb-4 pt-2">
        <h2 className="font-semibold">Notes</h2>
        <div className="flex space-x-10 items-center">
          <ButtonComponent
            name="New"
            type="add"
            compo={<PlusSquare strokeWidth={2} size={20} enableBackground={'#FFFFFF'} />}
            onClick={() => {
              openSheet("note");
            }}
          />
        </div>
      </div>
      <div className="ml-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto h-[800px] py-2 px-2">
        {notes
          .filter((note) => !note.is_deleted)
          .map((note) => (
            <DisplayNote note={note} key={note.id} />
          ))}
      </div>
      <SheetContainer />
    </div>
  );
};

export default NotesPage;
