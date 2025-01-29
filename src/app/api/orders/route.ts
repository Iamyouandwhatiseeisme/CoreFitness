import { NextResponse } from "next/server";
import { createClient } from "../../utils/supabase/server";
import { Order } from "src/app/components/types";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data } = await supabase
      .from("orders")
      .select()
      .eq("user_id", user?.id);
    const orders: Order[] = data as Order[];

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
