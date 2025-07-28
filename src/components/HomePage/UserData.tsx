import { getUserDetails } from "@/lib/(fetchings)/fetch";
import { UserCircle } from "lucide-react";
import Image from "next/image";

const UserData = async () => {
  
const user_data = await getUserDetails()

  return (
    <div className="flex items-center gap-3">
      {user_data.avatar_url ? (
        <Image
          src={user_data.avatar_url}
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <UserCircle size={40} />
      )}
      <h3 className="font-semibold">Hey, {user_data.name}</h3>
    </div>
  );
};

export default UserData;
