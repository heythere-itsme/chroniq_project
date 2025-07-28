"use client";
import { cn } from "@/lib/utils";
import { ElasticAnimation } from "@/lib/utils/gsapAnimation";
import React, { cloneElement, useRef } from "react";

export const TabDash = ({
  name,
  isActive,
  Click,
  compo,
}: {
  name: string;
  isActive: boolean;
  Click: () => void;
  compo: JSX.Element;
}) => {
  const Textref = useRef(null);

  const coloredIcon = cloneElement(compo, {
    stroke: isActive ? "#000000" : "#FFFFFF",
    strokeWidth: isActive ? 2 : 1.5,
  });

  return (
    <div
      className={cn(
        "w-fit px-2 py-1 cursor-pointer flex gap-2 rounded-[8px] items-center",
        isActive ? "bg-Selected" : "hover:bg-Secondary"
      )}
      onClick={Click}
      onMouseEnter={() => ElasticAnimation(Textref)}
    >
      {coloredIcon}
      <h5 className={cn(isActive && "!text-black font-bold")} 
      ref={Textref}
      >
        {name}
      </h5>
    </div>
  );
};
