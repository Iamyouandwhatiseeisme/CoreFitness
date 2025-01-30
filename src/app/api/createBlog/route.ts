import { NextRequest, NextResponse } from "next/server";
import { createClient } from "src/app/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("title") as string;
    const nameGeorgian = formData.get("title_ka") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const descriptionGeorgian = formData.get("description_ka") as string;
    console.log(name, nameGeorgian);

    const supabase = await createClient();

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { error } = await supabase.from("blogs").insert({
        title: name,
        title_ka: nameGeorgian,
        description: description,
        category: category,
        description_ka: descriptionGeorgian,
        user_id: user?.id,
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error("Error parsing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
