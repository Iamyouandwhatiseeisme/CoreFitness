import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../utils/supabase/server";

export async function GET(request: NextRequest) {
  const currentPassword = request.headers.get("currentPassword");

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      if (user?.email !== undefined) {
        if (currentPassword && currentPassword.length > 5) {
          const { data: signInData, error: signInError } =
            await supabase.auth.signInWithPassword({
              email: user?.email,
              password: currentPassword,
            });

          if (signInError) {
            return NextResponse.json({
              code: signInError.code,
              status: signInError.status,
            });
          }
          if (!signInError) {
            return NextResponse.json({ code: signInData, status: 200 });
          }
        }
        return NextResponse.json({
          code: "Your password must be at least 6 characters long",
          status: 400,
        });
      }
    }

    return NextResponse.json({
      code: "Please provide a correct password password",
      status: 400,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
