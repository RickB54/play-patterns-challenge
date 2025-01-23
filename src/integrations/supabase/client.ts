import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://asqfgywwxezazuazmtla.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzcWZneXd3eGV6YXp1YXptdGxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NzI2NjAsImV4cCI6MjAyNTI0ODY2MH0.7QN-NgqepxN1p0BuJRYQ8PKjGtqDEE8_yLkrHDlghQo";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);