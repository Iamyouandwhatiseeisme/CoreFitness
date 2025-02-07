import { NextRequest, NextResponse } from "next/server";
import { createClient } from "src/app/utils/supabase/server";

export async function GET(request: NextRequest) {
  const id = request.headers.get("id");
  try {
    const supabase = await createClient();

    const { data } = await supabase
      .from("orders")
      .select()
      .eq("id", id)
      .single();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
