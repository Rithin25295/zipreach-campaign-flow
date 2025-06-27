
-- Enable RLS on early_access table (if not already enabled)
ALTER TABLE public.early_access ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert into early_access table
CREATE POLICY "Allow public insert on early_access" 
ON public.early_access 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Create policy to allow anyone to view early_access records (optional, for admin purposes)
CREATE POLICY "Allow public select on early_access" 
ON public.early_access 
FOR SELECT 
TO public 
USING (true);
