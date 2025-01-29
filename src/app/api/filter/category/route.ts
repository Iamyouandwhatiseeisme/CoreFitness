import { NextRequest, NextResponse } from "next/server";
import { createClient } from "src/app/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const categoriesHeader = request.headers.get("categories");
  const tableName = request.headers.get("tableName");
  let selectedCategories = [];

  if (categoriesHeader) {
    selectedCategories = JSON.parse(categoriesHeader);
  }

  try {
    if (tableName && categoriesHeader) {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .in("category", selectedCategories);
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
