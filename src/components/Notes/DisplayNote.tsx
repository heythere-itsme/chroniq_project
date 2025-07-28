'use client';
import { noteType } from '@/index';
import { useSheetStore } from '@/lib/utils/SheetContext';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Pen } from 'lucide-react';
import React, { useEffect } from 'react';

const DisplayNote = ({ note } : {note: noteType}) => {

  const {openSheet} = useSheetStore()

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight,
    ],
    content: note.text_data,
    editable: false,
  });

  useEffect(() => {
    if (editor && note.text_data) {
      editor.commands.setContent(note.text_data);
    }
  }, [editor, note.text_data]);

  if (!editor) return null;

  return (
    <div className="bg-Secondary hover:bg-primary-light w-[300px] h-[350px] overflow-hidden space-y-2 relative rounded-[10px] shadow">
      <div className="mx-4 mt-2 flex items-center justify-between">
        {note.title && (
          <h4>{note.title}</h4>
        )}
      </div>

      {editor && (
        <EditorContent
          editor={editor}
          className="prose dark:prose-invert max-w-none px-4 h-[280px] overflow-hidden"
        />
      )}

      <div className="absolute right-2 bottom-3 cursor-pointer">
        <Pen className='bg-primary-dark px-2 !w-10 !h-10 rounded-full hover:bg-[hsl(120,20%,20%)]' onClick={() => openSheet('note', note)}/>
      </div>
    </div>
  );
};

export default DisplayNote;
