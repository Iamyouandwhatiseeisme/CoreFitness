import NotFound from "../[lang]/notfound/NotFound";
import { Post, Product } from "../components/types";
import { createClient } from "../utils/supabase/client";

export default async function fetchProducts() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("products").select();

    return data;
  } catch (error) {
    return <NotFound page={"products"}></NotFound>;
  }
}
