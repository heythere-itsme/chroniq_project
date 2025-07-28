"use client";
import { cn } from "@/lib/utils";
import { ElasticAnimation } from "@/lib/utils/gsapAnimation";
import { Loader } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { cloneElement, JSX, useEffect, useRef, useState } from "react";

type SidebarItemProps = {
  name: string;
  path: string;
  icon: JSX.Element;
  className?: string;
};

const DashButton = ({ path, name, icon, className }: SidebarItemProps) => {
  const Textref = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const pathName = usePathname();
  const isActive = pathName === path;

    useEffect(() => {
    if (isLoading && pathName === path) {
      setIsLoading(false);
    }
  }, [pathName, path, isLoading]);

  const handleRedirect = () => {
    if (!isActive) {
      setIsLoading(true);
      router.push(path);
    }
  };
  
  const coloredIcon = cloneElement(icon, {
    stroke: isActive ? "#000000" : "#FFFFFF",
    strokeWidth: isActive ? 2 : 1.5,
  });

  return (
    <div
      className={cn(
        "flex w-[200px] rounded-[8px] py-2 cursor-pointer transition-colors duration-200 items-center justify-between pr-10",
        isActive ? "bg-[#7DDE92]" : "hover:bg-primary-light",
        className
      )}
      onClick={handleRedirect}
      onMouseEnter={() => ElasticAnimation(Textref)}
    >
      <div className="h-fit flex items-center pl-2 gap-2" >
        { coloredIcon }
        <h4
          className={cn(
            "pl-1",
            isActive && "!text-primary-dark font-semibold"
          )}
          ref={Textref}
        >
          {name}
        </h4>
      </div>
        {isLoading && <Loader className="animate-spin h-5 w-5 text-white" />}
    </div>
  );
};

export default DashButton;
