
import FriendRow from "./FriendRow";
import SearchBar from "./SearchBar";

const Sidebar = () => {

  return (
    <div className="bg-Secondary h-[880px] w-65 rounded-l-[16px] rounded-r-[8px] py-3 space-y-5">
      <h3 className="font-semibold ml-5">Friends</h3>
      
    <SearchBar />
      <div className="px-2">
        <FriendRow
          name="User Name"
          lastMsg="This is supposed to be the last msg here"
          time="16:30"
        />
      </div>
    </div>
  );
};

export default Sidebar;
