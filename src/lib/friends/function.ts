import { toast } from "sonner";
import { createClient } from "../supabase/client"
const supabase = createClient()

const userdata = async () => {
    const {data, error} = await supabase.auth.getUser()
    if(error) console.error("No user data")
    return data.user
}

export const handleRequest = async ({frndid} : {frndid: string;}) => {
    const user = await userdata();

    const {data, error: checkError} = await supabase.from("friends").select("id").eq("user_id", user?.id).eq("friend_id", frndid)
    if (data && data.length > 0) {
        return toast.warning("Multiple request denied")
    }

    const {error: insertError} = await supabase.from("friends").insert({
        created_at: new Date(),
        user_id: user?.id,
        friend_id: frndid,
        type: "pending"
    })

    if(insertError) console.error("Error sending request")
    return toast.success("Request send")
}