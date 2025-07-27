-- Wine Collection Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Create the wines table
CREATE TABLE IF NOT EXISTS wines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  winery TEXT NOT NULL,
  vintage INTEGER,
  varietal TEXT,
  location TEXT,
  bottles_in_stock INTEGER DEFAULT 0,
  rating INTEGER DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for better performance
CREATE INDEX IF NOT EXISTS wines_created_at_idx ON wines(created_at DESC);
CREATE INDEX IF NOT EXISTS wines_name_idx ON wines(name);
CREATE INDEX IF NOT EXISTS wines_winery_idx ON wines(winery);

-- Enable Row Level Security (RLS)
ALTER TABLE wines ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now (since we're not using auth)
-- In production, you might want to restrict this
CREATE POLICY "Allow all operations on wines" ON wines
  FOR ALL 
  TO anon 
  USING (true)
  WITH CHECK (true);

-- Enable real-time subscriptions for the wines table
ALTER publication supabase_realtime ADD TABLE wines;

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_wines_updated_at 
    BEFORE UPDATE ON wines 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
