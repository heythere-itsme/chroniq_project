import React from 'react'
import { AtSign, Ellipsis, SquareArrowOutUpRight, SquarePen, Trash } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { handleCheck, handleDelete } from '@/lib/utils/TasknMeet';
import { useQueryClient } from '@tanstack/react-query';
import { useSheetStore } from '@/lib/utils/SheetContext';
import Tags from '../task/tags';
import Image from 'next/image';
import { meetingType } from '@/index';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

export const MeetingRowOver = ({ data } : {data: meetingType}) => {
  const { openSheet } = useSheetStore();
  const query = useQueryClient();

  const meetingDate = new Date(data.date_time).toLocaleDateString("en-GB", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const meetingTime = new Date(data.date_time).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="rounded-[8px] px-4 w-[1000px] bg-Secondary cursor-context-menu pt-2 pb-3">
      {/* Upper Section */}
      <div className="flex gap-1 items-center justify-between pr-10">

        <div className="flex gap-2">
          <Checkbox
            className="hover:bg-Selected hover:opacity-70 bg-white h-5 w-5 !rounded-[4px]"
            checked={data.is_completed}
            onClick={() => handleCheck({ task: data, table: "meetings", query })}
          />
          <h4 className="w-[300px] overflow-ellipsis hover:overflow-auto px-2">
            {data.title}
          </h4>
        </div>

        <div className="flex gap-1 items-center w-50">
          <h4>{meetingDate}</h4>
          <AtSign size={15} />
          <h4>{meetingTime}</h4>
        </div>

        <h4 className='w-50 overflow-ellipsis'>{data.venue}</h4>

      </div>

      {/* Lower Section */}
      <div className="flex items-center justify-between">
        <h4 className="w-[330px] overflow-ellipsis hover:overflow-auto !text-text-secondary mr-4">
          {data.description}
        </h4>
        <div className="flex gap-1 w-60">
          {data.priority == "High" && (
            <Tags
              name="High"
              color="rgba(42,172,82,.3)"
              dotcolor="hsl(120, 60%, 50%)"
            />
          )}
          {data.priority == "Medium" && (
            <Tags
              name="Medium"
              color="rgba(254, 200, 92, .3)"
              dotcolor="hsl(39, 60%, 50%)"
            />
          )}
          {data.priority == "Low" && (
            <Tags
              name="Low"
              color="rgba(254,231,92,.3)"
              dotcolor="hsl(60, 60%, 50%)"
            />
          )}
        </div>

        <div className="w-24">
          {Array.isArray(data.invite) && data.invite.length > 0 && (
            <div className="flex gap-1">
              {data.invite.map((user) => (
                <Image
                  key={user.id}
                  src={user.avatar_url}
                  alt={user.user_name}
                  className="w-8 h-8 rounded-full border object-cover"
                />
              ))}
            </div>
          )}
        </div>

        <SquareArrowOutUpRight
          onClick={() => openSheet("meeting", data)}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export const MeetingRowList = ({ data }: { data: meetingType }) => {
  const query = useQueryClient();
  const { openSheet } = useSheetStore();
  
  const date = new Date(data.date_time).toLocaleDateString("en-GB", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const time = new Date(data.date_time).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-center justify-between w-full gap-2">
      <div className="flex items-center justify-between w-full bg-Secondary px-3 rounded-[4px] py-1">
        <Checkbox
          className="bg-white border-black !rounded-[4px] hover:!bg-Selected border"
          checked={data.is_completed}
          onClick={() => handleCheck({ task: data, table: "meetings", query })}
        />
        <h4 className="w-50 overflow-ellipsis">{data.title}</h4>

         <div className="flex gap-1 w-20">
          {data.priority == "High" && (
            <Tags
              name="High"
              color="rgba(42,172,82,.3)"
              dotcolor="hsl(120, 60%, 50%)"
            />
          )}
          {data.priority == "Medium" && (
            <Tags
              name="Medium"
              color="rgba(254, 200, 92, .3)"
              dotcolor="hsl(39, 60%, 50%)"
            />
          )}
          {data.priority == "Low" && (
            <Tags
              name="Low"
              color="rgba(254,231,92,.3)"
              dotcolor="hsl(60, 60%, 50%)"
            />
          )}
        </div>

        <div className="flex gap-1 items-center w-40">
          <h4>{date}</h4>
          <AtSign size={15} />
          <h4>{time}</h4>
        </div>

        <h4 className='w-30'>{data.venue}</h4>

        <div className="w-30 h-fit">
          {Array.isArray(data.invite) && data.invite.length > 0 && (
            <div className="flex gap-1">
              {data.invite.map((user) => (
                <Image
                  key={user.id}
                  src={user.avatar_url}
                  alt={user.user_name}
                  className="w-8 h-8 rounded-full border object-cover"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="bg-Secondary rounded-[4px] w-8 cursor-pointer hover:bg-primary-light items-center">
          <Ellipsis className="cursor-pointer" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-Secondary space-y-2">
          <DropdownMenuItem onClick={() => openSheet("meeting", data)}>
            <SquarePen size={20} />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDelete({ data: data, table: "meetings", query })}
          >
            <Trash size={20} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const MeetingRowComp = ({ data }: { data: meetingType }) => {
  const query = useQueryClient();
  const { openSheet } = useSheetStore();
  
  const date = new Date(data.date_time).toLocaleDateString("en-GB", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const time = new Date(data.date_time).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-center justify-between w-full gap-2">
      <div className="flex items-center justify-between w-full bg-Secondary px-3 rounded-[4px] py-1">
        <Checkbox
          className="bg-white border-black !rounded-[4px] hover:!bg-Selected border"
          checked={data.is_completed}
          onClick={() => handleCheck({ task: data, table: "meetings", query })}
        />
        <h4 className="w-50 overflow-ellipsis">{data.title}</h4>

        <div className="flex gap-1 items-center w-40">
          <h4>{date}</h4>
          <AtSign size={15} />
          <h4>{time}</h4>
        </div>

        <h4 className='w-30'>{data.venue}</h4>

        <div className="w-30 h-fit">
          {Array.isArray(data.invite) && data.invite.length > 0 && (
            <div className="flex gap-1">
              {data.invite.map((user) => (
                <Image
                  key={user.id}
                  src={user.avatar_url}
                  alt={user.user_name}
                  className="w-8 h-8 rounded-full border object-cover"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="bg-Secondary rounded-[4px] w-8 cursor-pointer hover:bg-primary-light items-center">
          <Ellipsis className="cursor-pointer" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-Secondary space-y-2">
          <DropdownMenuItem onClick={() => openSheet("meeting", data)}>
            <SquarePen size={20} />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDelete({ data: data, table: "meetings", query })}
          >
            <Trash size={20} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

