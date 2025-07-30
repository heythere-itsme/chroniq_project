"use client";

import { createClient } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery.trim() === "") return;

      const { data, error } = await supabase
        .from("user_info")
        .select("id, user_name, avatar_url")
        .ilike("user_name", `%${searchQuery}%`)
        .limit(5);

      if (!error) setResults(data);
    };

    fetchData();
  }, [searchQuery]);

  return (
    <div className="w-full flex flex-col gap-2">
      <input
        className="bg-primary-dark py-2 w-58 flex justify-between rounded-2xl cursor-pointer px-3 mx-auto"
        placeholder="Type Username"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <ul className="text-white text-sm px-3">
        {results.map((user) => (
          <li key={user.id} className="py-1 border-b border-white/10">
            {user.user_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
