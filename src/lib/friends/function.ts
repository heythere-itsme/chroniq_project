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
    

    const {error} = await supabase.from("friends").insert({
        created_at: new Date(),
        user_id: user?.id,
        friend_id: frndid,
        type: "pending"
    })
    if(error) console.error("Error sending request")
    
    toast.success("Request send")
}