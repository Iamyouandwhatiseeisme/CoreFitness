import { NextResponse } from "next/server";
import { createAdminClient, createClient } from "src/app/utils/supabase/server";

export async function GET() {
  const supabase = await createAdminClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    if (user) {
      console.log(user.id);

      const { data, error } = await supabase.auth.admin.deleteUser(user.id);
      console.log(data, error);
      if (data) {
        return NextResponse.json(data, { status: 200 });
      }
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
