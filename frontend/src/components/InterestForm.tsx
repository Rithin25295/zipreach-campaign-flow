import React, { useState } from 'react';
import { ThumbsUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
import { useConfetti } from '@/hooks/useConfetti';
import EmojiSlider from '@/components/EmojiSlider';
import { supabase } from '@/integrations/supabase/client';
import styles from './InterestForm.module.css';
import { motion } from "framer-motion";

// Add styles for option tool-tips
const optionToolTips = {
  chat_creatives: "AI turns your goal into ready-to-launch ads for every platform",
  auto_budget_optimization: "Spend shifts nightly to the best-performing channel",
  gif_reports: "Beautiful animated performance recaps replace boring spreadsheets",
  cross_channel_publish: "One click publishes your campaign everywhere that matters",
  predict_first: "AI scores your ideas before you spend a cent",
  sales_sync: "See exactly which ads drive real store revenue"
} as const;

const InterestForm = () => {
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(3);
  const [notes, setNotes] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [interestError, setInterestError] = useState('');
  const { triggerConfetti } = useConfetti();

  const ratingLabels = ['Not really', 'Somewhat', 'Interested', 'Very excited'];

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
    setInterestError('');
    
    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Validate at least one interest
    if (interests.length === 0) {
      setInterestError('Please select at least one super-power.');
      return;
    } else {
      setInterestError('');
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
          rating: ratingLabels[rating - 1],
          notes: notes.trim() || null,
          feature_interest: interests.length ? interests : null // Save selected interests as text[]
        }]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Form submitted successfully:', { email, rating, notes, interests });
      
      // Success - reset form and show success message
      setEmail('');
      setRating(3);
      setNotes('');
      setInterests([]);
      setInterestError('');
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 dark:bg-gray-800 dark:text-gray-100"
              style={{ borderRadius: '12px', fontFamily: 'Inter', fontWeight: 400 }}
              placeholder="your@email.com"
              aria-label="Email address"
              disabled={isSubmitting}
              required
            />
            {emailError && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-2" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                {emailError}
              </p>
            )}
          </div>

          {/* Emoji Rating Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
              How excited are you about effortless marketing?
            </label>
            <EmojiSlider value={rating} onChange={setRating} disabled={isSubmitting} />
          </div>

          {/* Feature Interest Checkboxes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
              Which ZipReach super-powers interest you?
            </label>
            <div className="space-y-3">
              {[
                { value: 'chat_creatives', title: 'Instant Chat-Made Creatives', desc: optionToolTips.chat_creatives },
                { value: 'auto_budget_optimization', title: 'Auto-Moving Budget', desc: optionToolTips.auto_budget_optimization },
                { value: 'gif_reports', title: 'Wake-Up GIF Reports', desc: optionToolTips.gif_reports },
                { value: 'cross_channel_publish', title: 'Every Channel, One Click', desc: optionToolTips.cross_channel_publish },
                { value: 'predict_first', title: 'Predict-Before-Create', desc: optionToolTips.predict_first },
                { value: 'sales_sync', title: 'Sales + Ad Stats Together', desc: optionToolTips.sales_sync },
              ].map((opt) => {
                const isChecked = interests.includes(opt.value);
                return (
                  <motion.label
                    key={opt.value}
                    whileHover={{ scale: 1.02, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm cursor-pointer transition-shadow duration-200 shadow-sm hover:shadow-lg group"
                  >
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setInterests((prev) => [...prev, opt.value]);
                        } else {
                          setInterests((prev) => prev.filter((v) => v !== opt.value));
                        }
                      }}
                      disabled={isSubmitting}
                      className="mt-1 shrink-0 border-2 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                    <span className="flex flex-col">
                      <span className="font-semibold text-sm text-gray-800 dark:text-gray-100 group-hover:text-primary" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                        {opt.title}
                      </span>
                      <span className="text-[12px] text-gray-500 dark:text-gray-400 leading-tight group-hover:text-primary/80" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                        {opt.desc}
                      </span>
                    </span>
                  </motion.label>
                );
              })}
            </div>
            {interestError && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-2" style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                {interestError}
              </p>
            )}
          </div>

          {/* Optional Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
              Anything else? (Optional)
            </label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us one thing you'd love ZipReach to do."
              className="w-full min-h-[100px] resize-none dark:bg-gray-800 dark:text-gray-100"
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
