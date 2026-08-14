import { createClient } from '@supabase/supabase-js';
import { validateEnv } from './env';

const env = validateEnv();

export const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
