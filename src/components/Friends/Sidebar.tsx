"use client";
import { getFriends, getRequest } from "@/lib/friends/function";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { Inbox, UserPlus } from "lucide-react";
import Request from "./Request";
import InboxPage from "./Inbox";
import { TabDash } from "../DashboardPage/dash-tabs";

export type FriendInfo = {
  id: string;
  name: string;
  avatar_url: string;
};

const Sidebar = () => {
  const [Friends, setFriends] = useState<FriendInfo[]>([]);
  const [currentTab, setCurrentTab] = useState<"Inbox" | "Request">("Inbox");
  const [RequestA, setRequests] = useState<FriendInfo[]>([])
  const TabData = [
    { name: "Inbox", icon: <Inbox size={20} /> },
    { name: "Request", icon: <UserPlus size={20} /> },
  ];

  const renderTab = () => {
    switch (currentTab) {
      case "Inbox":
        return <InboxPage data={Friends} />;
      case "Request":
        return <Request data={RequestA} />;
    }
  };

  useEffect(() => {
    const fetchFriends = async () => {
      const friends = await getFriends();
      const requests = await getRequest();
      setFriends(friends);
      setRequests(requests);
    };

    fetchFriends();
  }, []);

  return (
    <div className="bg-Secondary h-[880px] w-70 rounded-l-[16px] rounded-r-[8px] py-3 space-y-5">
      <h3 className="font-semibold ml-5">Friends</h3>

      <SearchBar />
      <div className="px-2">
        <div className="flex space-x-3 pl-4 pb-2">
          {TabData.map(({ name, icon }) => (
            <TabDash
              key={name}
              name={name}
              isActive={currentTab === name}
              Click={() => setCurrentTab(name as "Inbox" | "Request")}
              compo={icon}
            />
          ))}
        </div>
        <div>{renderTab()}</div>
      </div>
    </div>
  );
};

export default Sidebar;
