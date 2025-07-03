import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

// Client-side Supabase client (uses anon key)
export const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Server-side Supabase admin client (uses service role key)
// This should only be used in API routes and server-side code
export const supabaseAdmin = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);