import React from "react";
import TiptapButton from "./TiptapButton";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  ListTodo,
  Strikethrough,
} from "lucide-react";

import { Editor } from "@tiptap/react";
import ImagePopoverButton from "./AddImage";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const headings = [
    { level: 1, icon: <Heading1 /> },
    { level: 2, icon: <Heading2 /> },
    { level: 3, icon: <Heading3 /> },
  ];

  const formats = [
    {
      name: "bold",
      icon: <Bold />,
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      name: "italic",
      icon: <Italic />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      name: "strike",
      icon: <Strikethrough />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      name: "highlight",
      icon: <Highlighter />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
    },
  ];

  const alignments = [
    { align: "left", icon: <AlignLeft /> },
    { align: "center", icon: <AlignCenter /> },
    { align: "right", icon: <AlignRight /> },
    { align: "justify", icon: <AlignJustify /> },
  ];

  return (
    <div className="control-group">
      <div className="flex gap-5 pl-5">
        <div className="flex gap-2 items-center">
          {headings.map(({ level, icon }) => (
            <TiptapButton
              key={`heading-${level}`}
              component={icon}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level }).run()
              }
              className={
                editor.isActive("heading", { level }) ? "!bg-Selected" : ""
              }
            />
          ))}
        </div>

        <div className="flex gap-2 items-center">
          {formats.map(({ name, icon, onClick }) => (
            <TiptapButton
              key={name}
              component={icon}
              onClick={onClick}
              className={editor.isActive(name) ? "bg-Selected" : ""}
            />
          ))}
        </div>

        <div className="flex gap-2 items-center">
          {alignments.map(({ align, icon }) => (
            <TiptapButton
              key={align}
              component={icon}
              onClick={() => editor.chain().focus().setTextAlign(align).run()}
              className={
                editor.isActive({ textAlign: align }) ? "bg-Selected" : ""
              }
            />
          ))}
        </div>

        <div className="flex gap-2 items-center">
          <ImagePopoverButton editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
