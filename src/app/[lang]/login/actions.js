"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { createClient } from "../../utils/supabase/server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function login(formData) {
  const supabase = await createClient();

  const form = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { data, error } = await supabase.auth.signInWithPassword(form);

  if (error) {
    return { error: error.code };
  }
  revalidatePath("/", "layout");
  redirect("/");

  return { success: true };
}

export async function signup(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = createServerActionClient({
    cookies,
  });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {},
    emailRedirectTo: `http://localhost:3000/auth/callback`,
  });
  if (error) {
    return { error: error.code };
  }
  revalidatePath("/login", "layout");
  return { success: true };
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  redirect("/login");
  return error;
}
