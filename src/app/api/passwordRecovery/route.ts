import { NextRequest, NextResponse } from "next/server";
import { getBaseUrl } from "src/app/actions/getBaseUrl";
import { createClient } from "src/app/utils/supabase/server";

export async function GET(request: NextRequest) {
  const email = request.headers.get("email");
  const locale = request.headers.get("locale");
  const supabase = await createClient();
  const baseUrl = getBaseUrl();
  try {
    if (email) {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${baseUrl}/${locale}`,
      });
      if (!error) {
        return NextResponse.json({ data: data, status: 200 });
      }
      if (error) {
        return NextResponse.json({ error: error, status: 404 });
      }
    }

    return NextResponse.json({ status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
