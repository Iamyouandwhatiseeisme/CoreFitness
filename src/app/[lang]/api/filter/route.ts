import { NextRequest, NextResponse } from "next/server";
import { createClient } from "src/app/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const tableName = request.headers.get("tableName");
  const columnName = request.headers.get("columnName");
  const orderBy = request.headers.get("orderBy");

  try {
    if (tableName && columnName && orderBy) {
      const isAscending = orderBy === "true" ? true : false;
      console.log(isAscending, orderBy);
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .order(columnName, { ascending: isAscending });
      if (data) {
        return NextResponse.json({ data: data, status: 200 });
      }
      if (error) {
        throw error;
      }
    }
    return NextResponse.json({
      code: "Please specify your sort order",
      status: 400,
    });
  } catch (error) {
    return NextResponse.json({ error: error, status: 400 });
  }
}
