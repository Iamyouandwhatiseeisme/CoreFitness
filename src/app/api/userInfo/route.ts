import { NextResponse } from "next/server";
import { createClient } from "src/app/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    try {
      const name = user.user_metadata.name;
      if (name) {
        return NextResponse.json({ displayName: name }, { status: 200 });
      }

      return NextResponse.json({ displayName: null }, { status: 400 });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}
