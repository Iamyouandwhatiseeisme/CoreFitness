import { NextRequest, NextResponse } from "next/server";
import { createClient } from "src/app/utils/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const newValue = request.headers.get("newValue");

  if (newValue) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        email: newValue,
      });
      if (data) {
        return NextResponse.json(
          { data: data, updateType: "email" },
          { status: 200 }
        );
      }
      if (error) {
        return NextResponse.json({ error: error }, { status: 500 });
      }
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}
