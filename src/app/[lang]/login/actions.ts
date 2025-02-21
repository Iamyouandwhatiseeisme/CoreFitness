"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { createClient } from "../../utils/supabase/server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { getBaseUrl } from "src/app/actions/getBaseUrl";

export async function login(formData: FormData, locale: string) {
  const supabase = await createClient();

  const form = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(form);

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
  const baseUrl = getBaseUrl();

  const supabase = createServerActionClient({
    cookies,
  });

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${baseUrl}/auth/callback` },
  });
  if (error) {
    return { error: error.code };
  }
  revalidatePath(`/${locale}/login`, "layout");
  return { success: true };
}
export async function signInWithGithub() {
  const supabase = await createClient();
  const baseUrl = getBaseUrl();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${baseUrl}/auth/callback`,
    },
  });
  if (error) {
    return { error: error.code };
  }
  if (data.url) {
    redirect(data.url);
  }
}
export async function signInWithGoogle() {
  const supabase = await createClient();
  const baseUrl = getBaseUrl();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${baseUrl}/auth/callback`,
    },
  });
  if (error) {
    return { error: error.code };
  }
  if (data.url) {
    redirect(data.url);
  }
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  return error;
}
