import { NextRequest, NextResponse } from "next/server";
import { createServer } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createServer();
  const { user } = await req.json();

  if (!user?.id || !user?.email) {
    return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
  }

  // ✅ Check if user already exists by ID or email
  const { data: existingUser, error: fetchError } = await supabase
    .from("user_info")
    .select("id")
    .eq("id", user.id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    return NextResponse.json({ error: "DB lookup failed" }, { status: 500 });
  }

  // ✅ If user doesn't exist, insert new
  if (!existingUser) {
    const metadata = user.user_metadata || {};
    const user_name = `u_${user.id.slice(0, 6)}`;

    const { error: insertError } = await supabase.from("user_info").insert({
      id: user.id,
      name: metadata.full_name || metadata.name || "No Name",
      user_email: user.email,
      user_name,
      avatar_url:
        metadata.avatar_url ||
        "https://nuqtcmecgufdbfzwtjwd.supabase.co/storage/v1/object/public/avatar/avatar-default.svg",
      user_DOB: "",
      createdAt: new Date().toISOString(),
    });

    if (insertError) {
      return NextResponse.json({ error: "Insert failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}