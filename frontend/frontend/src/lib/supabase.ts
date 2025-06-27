
import { createClient } from '@supabase/supabase-js';

// These would be set when Supabase integration is activated
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type for early access form submission
export interface EarlyAccessSubmission {
  id?: string;
  email: string;
  rating: number;
  notes?: string;
  created_at?: string;
}

// Function to submit early access form (for when Supabase is connected)
export const submitEarlyAccess = async (data: EarlyAccessSubmission) => {
  const { data: result, error } = await supabase
    .from('early_access')
    .insert([{
      email: data.email,
      rating: data.rating,
      notes: data.notes || null
    }]);

  if (error) {
    throw error;
  }

  return result;
};
