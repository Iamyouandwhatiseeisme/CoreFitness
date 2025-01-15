import { NextResponse } from "next/server";
import { createAdminClient } from "src/app/utils/supabase/server";

export async function GET() {
  const supabase = await createAdminClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    if (user) {
      const { data } = await supabase.auth.admin.deleteUser(user.id);
      if (data) {
        return NextResponse.json(data, { status: 200 });
      }
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
