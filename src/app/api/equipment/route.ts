import { NextResponse } from "next/server";
import { createClient } from "../../utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  try {
    const { data } = await supabase.from("equipment").select();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
