
import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useConfetti } from '@/hooks/useConfetti';
import EmojiSlider from '@/components/EmojiSlider';
import { supabase } from '@/integrations/supabase/client';

const InterestForm = () => {
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(3);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const { triggerConfetti } = useConfetti();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkEmailExists = async (email: string) => {
    const { data, error } = await supabase
      .from('early_access')
      .select('email')
      .eq('email', email.trim())
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which means email doesn't exist (good)
      throw error;
    }

    return data !== null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setEmailError('');
    
    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if email already exists
      const emailExists = await checkEmailExists(email);
      
      if (emailExists) {
        setEmailError('This email is already registered for early access');
        setIsSubmitting(false);
        return;
      }

      // Insert data into Supabase early_access table
      const { error } = await supabase
        .from('early_access')
        .insert([{
          email: email.trim(),
          rating: rating.toString(),
          notes: notes.trim() || null
        }]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Form submitted successfully:', { email, rating, notes });
      
      // Success - reset form and show success message
      setEmail('');
      setRating(3);
      setNotes('');
      triggerConfetti();
      toast.success("Thanks! We'll be in touch 🚀");
      
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-0 shadow-lg" style={{ borderRadius: '16px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              style={{ borderRadius: '12px', fontFamily: 'Inter', fontWeight: 400 }}
              placeholder="your@email.com"
              aria-label="Email address"
              disabled={isSubmitting}
              required
            />
            {emailError && (
              <p className="text-red-600 text-sm mt-2" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                {emailError}
              </p>
            )}
          </div>

          {/* Emoji Rating Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
              How excited are you about effortless marketing?
            </label>
            <EmojiSlider value={rating} onChange={setRating} disabled={isSubmitting} />
          </div>

          {/* Optional Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
              Anything else? (Optional)
            </label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us one thing you'd love ZipReach to do."
              className="w-full min-h-[100px] resize-none"
              style={{ borderRadius: '12px', fontFamily: 'Inter', fontWeight: 400 }}
              aria-label="Additional notes"
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 rounded-lg text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
            style={{ 
              background: isSubmitting ? '#9CA3AF' : 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
              borderRadius: '12px',
              fontFamily: 'Inter',
              fontWeight: 600
            }}
            aria-label="Submit early access form"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Joining...
              </div>
            ) : (
              <>
                <ThumbsUp className="mr-2 w-5 h-5" />
                Join Early Access
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InterestForm;
