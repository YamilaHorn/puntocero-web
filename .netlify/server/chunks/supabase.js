import { createClient } from "@supabase/supabase-js";
import { p as public_env } from "./shared-server.js";
const supabase = createClient(
  public_env.PUBLIC_SUPABASE_URL,
  public_env.PUBLIC_SUPABASE_ANON_KEY
);
export {
  supabase as s
};
