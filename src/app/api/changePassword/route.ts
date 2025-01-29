import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../utils/supabase/server";

export async function GET(request: NextRequest) {
  const newPassword = request.headers.get("newPassword");

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      if (user.email) {
        if (newPassword) {
          const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
          });
          if (data) {
            return NextResponse.json({ code: "Password Updated", status: 200 });
          }
          if (error) {
            return NextResponse.json({ code: error.code, status: 400 });
          }
        }
      }
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
