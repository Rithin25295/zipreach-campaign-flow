import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export const BackgroundBlobs = () => {
  // Detect current theme to switch gradients accordingly
  const { isDark } = useTheme();

  const gradient = isDark
    ? 'radial-gradient(circle at center, #111827 0%, #0f172a 100%)' // darker gradient for dark mode
    : 'radial-gradient(circle at center, #FFFFFF 0%, #F8F8F8 100%)';

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Top-left blob */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-400/10 blur-[120px] dark:bg-indigo-500/10"
      />
      
      {/* Bottom-right blob */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-emerald-400/10 blur-[120px] dark:bg-emerald-500/10"
      />
      
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: gradient,
          opacity: isDark ? 0.8 : 0.9,
        }}
      />
    </div>
  );
}; 