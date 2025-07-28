import { createClient } from "../supabase/client";


export async function isUsernameTaken(username: string, currentUserId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("user_info")
    .select("id")
    .eq("user_name", username)
    .single(); 

  if (data && data.id !== currentUserId) {
    return true; // username taken by someone else
  }

  return false; // username is either yours or unused
}
