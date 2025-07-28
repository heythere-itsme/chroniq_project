"use client";
import { createClient } from "@/lib/supabase/client";
import React, { useState } from "react";

const TimerPopOver = () => {
  const supabase = createClient();
  const [name, setName] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [error, setError] = useState("");

  const isValidNumber = (val: string, max: number) => {
    const num = Number(val);
    return !isNaN(num) && num >= 0 && num <= max && val.length <= 2;
  };

const handleDayPlan = async ({ name, totalTime } : {name: string; totalTimer: string}) => {

  const {data: {user}, error} = await supabase.auth.getUser()

  const {error : insertError} = await supabase.from("timer").insert({
    user_id: user?.id,
    name: name,
    total: totalTime,
    used: "00:00:00"
  })

  if (insertError) console.error(insertError?.message)
  
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    if (
      !isValidNumber(hours, 24) ||
      !isValidNumber(minutes, 59) ||
      !isValidNumber(seconds, 59)
    ) {
      setError("Invalid time format.");
      return;
    }

    const h = Number(hours);
    const m = Number(minutes);
    const s = Number(seconds);

    if (h === 24 && (m > 0 || s > 0)) {
      setError("Maximum allowed time is 24:00:00");
      return;
    }

    const time = `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;

    // ✅ Store in DB or Zustand
    console.log("Saving:", { name, total: time });
    handleDayPlan({name: name, totalTime: time})

    // Clear
    setName("");
    setHours("");
    setMinutes("");
    setSeconds("");
    setError("");
  };

  return (
    <div>
      <h4 className="font-medium">Add New</h4>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md p-2 bg-primary-light"
        />

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="HH"
            value={hours}
            onChange={(e) => setHours(e.target.value.replace(/\D/g, ""))}
            maxLength={2}
            className="w-14 p-2 text-center rounded-md bg-primary-light"
          />
          <span>:</span>
          <input
            type="text"
            placeholder="MM"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value.replace(/\D/g, ""))}
            maxLength={2}
            className="w-14 p-2 text-center rounded-md bg-primary-light"
          />
          <span>:</span>
          <input
            type="text"
            placeholder="SS"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value.replace(/\D/g, ""))}
            maxLength={2}
            className="w-14 p-2 text-center rounded-md bg-primary-light"
          />
        </div>

        {error && <p className="!text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-[hsl(120,30%,50%)] text-white rounded-[4px] p-2 hover:bg-[hsl(120,40%,40%)] transition-colors cursor-pointer"
        >
          Add Timer
        </button>
      </form>
    </div>
  );
};

export default TimerPopOver;
