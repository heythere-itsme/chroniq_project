import { createServer } from "@/lib/supabase/server";


export const getUserDetails = async () => {
  const supabase = await createServer();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("No logged-in user", userError);
    return null;
  }

  const { data: userData, error } = await supabase
    .from("user_info")
    .select("*") // 👈 Use "*" or specific column names, not '1'
    .eq("id", user.id) // 👈 Match against 'id' in user_info (if 'id' = auth UID)
    .single(); // 👈 Optional: use this if you expect exactly one row

  if (error) {
    console.error("Failed to fetch user data", error.message);
    return null;
  }

  return userData;
};
