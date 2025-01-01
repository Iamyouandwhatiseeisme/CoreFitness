import { createClient } from "../utils/supabase/client";

export default async function fetchSingleProduct(id: string) {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("products").select().eq("id", id);
    if (data) {
      return data[0];
    }
    return null;
  } catch (error) {
    return null;
  }
}
