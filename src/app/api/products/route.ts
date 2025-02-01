import { NextRequest, NextResponse } from "next/server";
import { createClient } from "src/app/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const start = request.headers.get("start");
  const end = request.headers.get("end");

  try {
    const { data } = await supabase
      .from("products")
      .select()
      .range(Number(start), Number(end))
      .order("created_at", { ascending: false });

    console.log(data?.length);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
