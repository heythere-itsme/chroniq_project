import { toast } from "sonner";
import { createClient } from "../supabase/client"

const supabase = createClient()

export const userdata = async () => {
    const {data, error} = await supabase.auth.getUser();
    if(error) console.error("No user data", error.message)
    return data.user
}

export const handleRequest = async ({frndid} : {frndid: string;}) => {
    const user = await userdata();

    const {data, error: checkError} = await supabase.from("chat").select("id, status").eq("created_by", user?.id).eq("reciever", frndid).single()
    if (data?.id) {
        return toast.warning("Multiple request denied")
    }
    if (data?.status == "blocked") toast.error("Can't send request")

    const {error: insertError} = await supabase.from("chat").insert({
        created_at: new Date(),
        created_by: user?.id,
        reciever: frndid,
        status: "pending"
    })

    if(insertError) console.error("Error sending request")
    return toast.success("Request send")
}

export const getFriends = async () => {
  const user = await userdata();
  if (!user) return [];

  const { data: FrndRow, error: FetchError } = await supabase
    .from("chat")
    .select("*")
    .or(
      `and(created_by.eq.${user.id},status.neq.blocked),and(reciever.eq.${user.id},status.eq.friends)`
    );

  if (FetchError) {
    console.error("Fetch Error", FetchError.message);
    return [];
  }
  
  const friendInfoPromises = FrndRow.map(async (f) => {
    const otherUserId = f.created_by === user.id ? f.reciever : f.created_by;
    const { data, error } = await supabase
      .from("user_info")
      .select("id, name, avatar_url")
      .eq("id", otherUserId)
      .single();

    if (error) {
      console.error("Error fetching user_info for", f.friend_id);
      return null;
    }

    return { ...data, status: f.status };
  });

  const resolvedFriends = await Promise.all(friendInfoPromises);
  return resolvedFriends.filter(Boolean); // remove any `null`s
};
export const getRequest = async () => {
  const user = await userdata();
  if (!user) return [];

  const { data: FrndRow, error: FetchError } = await supabase
    .from("chat")
    .select("*")
    .eq("reciever", user.id)
    .eq("status", "pending");

  if (FetchError) {
    console.error("Fetch Error", FetchError.message);
    return [];
  }

  const friendInfoPromises = FrndRow.map(async (f) => {
    const { data, error } = await supabase
      .from("user_info")
      .select("id, name, avatar_url")
      .eq("id", f.created_by)
      .single();

    if (error) {
      console.error("Error fetching user_info for", f.created_by);
      return null;
    }

    return { ...data, status: f.status }; // optionally add metadata
  });

  const resolvedFriends = await Promise.all(friendInfoPromises);
  return resolvedFriends.filter(Boolean);

}

export const getMsg = async () => {

}