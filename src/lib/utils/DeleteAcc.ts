// import { createClient } from "../supabase/client";
import { createClient } from '@supabase/supabase-js'

export const deleteAcc = async ({data} : {data: {id: string}}) => {

  const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  // const supabase = createClient();

  // Call the delete_user edge function with the real user ID
const { data : invokeData, error } = await supabaseClient.functions.invoke("delete_user", {
  body: { user_id: data.id }
});

  if (error) {
    console.error("Error deleting user:", error);
  } else {
    console.log("User deleted:", invokeData);
  }
};
