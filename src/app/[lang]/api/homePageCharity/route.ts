import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";
import { HomePageCharityImageScreen } from "../../page";

export async function GET() {
  const supabase = await createClient();

  console.log("fetching");

  try {
    const { data, error } = await supabase.from("homePage").select();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
