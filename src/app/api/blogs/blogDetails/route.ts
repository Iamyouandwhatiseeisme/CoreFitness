import { NextRequest, NextResponse } from "next/server";
import { createClient } from "src/app/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const blogId = request.headers.get("id");
  console.log("fetched", blogId);

  try {
    const { data, error } = await supabase.from("blogs").select().eq("id", 2);
    console.log(data, error, "blogDetails");
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
