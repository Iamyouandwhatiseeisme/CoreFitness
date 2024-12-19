"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { createClient } from "../../utils/supabase/server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function login(formData: FormData, locale: string) {
  const supabase = await createClient();

  const form = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data, error } = await supabase.auth.signInWithPassword(form);

  if (error) {
    return { error: error.code };
  }
  revalidatePath(`/${locale}`, "layout");
  redirect(`/${locale}`);

  return { success: true };
}

export async function signup(formData: FormData, locale: string) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = createServerActionClient({
    cookies,
  });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `http://localhost:3000/auth/callback` },
  });
  if (error) {
    return { error: error.code };
  }
  revalidatePath(`/${locale}/login`, "layout");
  return { success: true };
}
export async function signInWithGithub(locale: string) {
  const supabase = await createClient();
  console.log("2");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });
  console.log(data.url);
  if (error) {
    return { error: error.code };
  }
  if (data.url) {
    console.log(data.url);
    redirect(data.url);
  }
}
export async function signOut(locale: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  redirect(`/${locale}/login`);
  return error;
}
