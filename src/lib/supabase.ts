import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rlqxhxpxfbfkbgktzjnk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJscXhoeHB4ZmJma2Jna3R6am5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NzI2NjAsImV4cCI6MjAyNTI0ODY2MH0.7QN-NgqepxN1p0BuJRYQ8PKjGtqDEE8_yLkrHDlghQo';

export const supabase = createClient(supabaseUrl, supabaseKey);