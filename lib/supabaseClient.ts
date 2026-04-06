import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL!,
  process.env.PUBLIC_SUPABASE_KEY!
);

export async function getToken() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;

  return data.session?.access_token;
}