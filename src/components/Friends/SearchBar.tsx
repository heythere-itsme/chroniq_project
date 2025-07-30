"use client";

import { handleRequest } from "@/lib/friends/function";
import { createClient } from "@/lib/supabase/client";
import { UserPlus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type userType = {
    id: string,
    name: string,
    user_name: string,
    avatar_url: string
}

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<userType[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery.trim() === "") {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_info")
        .select("id, user_name, avatar_url, name")
        .ilike("user_name", `%${searchQuery}%`)
        .limit(5);

      if (!error) {
        setResults(data);
        setShowDropdown(true);
      }
    };

    fetchData();
  }, [searchQuery, supabase]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full flex flex-col gap-2 relative" ref={dropdownRef}>
      <input
        className="bg-primary-dark py-2 w-58 flex justify-between rounded-2xl cursor-pointer px-3 mx-auto"
        placeholder="Type Username"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {showDropdown && results.length > 0 && (
        <div className="text-white space-y-2 py-2 text-sm px-3 absolute bg-primary-light w-50 rounded-[4px] top-12 left-5 shadow-2xl z-50">
          {results.map((user : userType) => (
            <div
              key={user.id}
              className="py-1 rounded-[4px] px-3 items-center hover:bg-Secondary cursor-pointer flex justify-between"
            >
              <Image
                src={user.avatar_url}
                width={30}
                height={30}
                alt="avatar"
                className="rounded-full"
              />
              <div>
                <h4>{user.user_name}</h4>
                <h5>{user.name}</h5>
              </div>
              <UserPlus onClick={() => handleRequest({ frndid: user.id })} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
