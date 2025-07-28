"use client";
import { ChevronDown, Handshake, PlusCircle, SquareCheck, StickyNote } from "lucide-react";
import React, { JSX, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useSheetStore } from "@/lib/utils/SheetContext";

export const ButtonComponent = ({
  name,
  type,
  compo,
  onClick,
  className,
}: {
  name: string;
  type: string;
  compo: JSX.Element;
  onClick?: () => void;
  className?: string;
}) => {
  const [bgColor, setBgcolor] = useState({ prim: "", hover: "" });
  const {openSheet} = useSheetStore()

  useEffect(() => {
    if (type == "add") {
      setBgcolor({
        prim: "rgba(42,172,82,60)",
        hover: "rgba(37,109,59,1)",
      });
    } else if (type == "delete") {
      setBgcolor({
        prim: "rgba(237,66,69,0.6)",
        hover: "rgba(154,52,53,1)",
      });
    }
  }, [type]);

  const iconRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(textRef.current, {
      opacity: 0,
      x: 10,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(iconRef.current, {
      translateX: 15,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.to(containerRef.current, {
      background: bgColor.hover,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(textRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(iconRef.current, {
      x: 0,
      rotation: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.to(containerRef.current, {
      background: bgColor.prim,
      duration: 0.4,
      ease: "power2.out",
    });
  };


  return (
    <div className="flex items-center gap-2">
    <div
      className={cn(
        `flex items-center rounded-[4px] h-fit py-1 w-fit px-2 gap-2 cursor-pointer`,
        className
      )}
      style={{ backgroundColor: bgColor.prim }}
      onClick={onClick}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={iconRef}>{compo}</div>
      <h5 ref={textRef}>{name}</h5>
    </div>
      <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer bg-Secondary rounded-[4px] !border-none">
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-Secondary border-none">
              <DropdownMenuItem onClick={() => openSheet("task")}>
                <SquareCheck />
                Task
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openSheet("meeting")}>
                <Handshake />
                Meeting
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openSheet("note")}>
                <StickyNote />
                Note
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
    </div>
  );
};

export const AddSubTask = () => {
  return (
    <div className="flex gap-5 px-10 py-1 bg-[hsl(0,0%,20%)] hover:bg-[hsl(0,0%,30%)] rounded-[4px] cursor-pointer items-center">
      <PlusCircle />
      <h4>Sub Task</h4>
    </div>
  );
};
