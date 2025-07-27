import { createClient } from "@supabase/supabase-js"

// Supabase configuration using your actual credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_URL || "https://ckhpnuhvpxtcujkbwxti.supabase.co"
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNraHBudWh2cHh0Y3Vqa2J3eHRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NTM2MzEsImV4cCI6MjA2OTEyOTYzMX0.NViSHCSZgJsisvlpjvsvU-rYB5jRQTQtsG_dpsLsiy8"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
