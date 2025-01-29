import { NextRequest, NextResponse } from "next/server";
import { createClient } from "src/app/utils/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const name = request.headers.get("newValue");

  if (name) {
    try {
      const { data, error: metadataError } = await supabase.auth.updateUser({
        data: { name: name },
      });
      if (data) {
        return NextResponse.json(
          { data: data, updateType: "name" },
          { status: 200 }
        );
      }
      if (metadataError) {
        return NextResponse.json({ error: metadataError }, { status: 500 });
      }
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}
