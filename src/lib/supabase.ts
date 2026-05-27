import { createClient } from "@supabase/supabase-js";
// Cambiamos 'static' por 'dynamic'
import { env } from "$env/dynamic/public";

// Ahora las llamamos desde el objeto env
export const supabase = createClient(
  env.PUBLIC_SUPABASE_URL,
  env.PUBLIC_SUPABASE_ANON_KEY
);