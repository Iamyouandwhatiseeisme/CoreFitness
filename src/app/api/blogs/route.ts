import { NextResponse } from "next/server";
import { createClient } from "src/app/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  try {
    const { data } = await supabase
      .from("blogs")
      .select()
      .order("created_at", { ascending: false });
    console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
