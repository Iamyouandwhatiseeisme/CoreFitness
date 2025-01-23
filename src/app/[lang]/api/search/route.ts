import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const searchValue = request.headers.get("searchValue");
  const searchTable = request.headers.get("searchTable");

  try {
    if (searchTable && searchValue) {
      const { data } = await supabase
        .from(searchTable)
        .select("*")
        .ilike("title", `%${searchValue}%`);
      return NextResponse.json(data, { status: 200 });
    }
    return NextResponse.json([], { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
