import { NextRequest, NextResponse } from "next/server";
import { createClient } from "src/app/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const start = request.headers.get("start");
  const end = request.headers.get("end");
  const columnName = request.headers.get("columnName");
  const orderBy = request.headers.get("orderBy");

  try {
    const isAscending = orderBy === "true" ? true : false;

    const { data } = await supabase
      .from("products")
      .select()
      .range(Number(start), Number(end))
      .order(columnName!, { ascending: isAscending });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
