import React, { useState, useEffect } from 'react';
import { ArrowRight, Target, Zap, ChevronDown, ThumbsUp, Sparkles, TrendingUp, BarChart3, Calendar, MessageSquare, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTheme } from '@/contexts/ThemeContext';
import InterestForm from '@/components/InterestForm';
import { HeroCarousel } from '@/components/HeroCarousel';
import { PersonaCard } from '@/components/PersonaCard';
import { TimelineItem } from '@/components/TimelineItem';
import { BackgroundBlobs } from '@/components/BackgroundBlobs';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDemo = () => {
    document.getElementById('hero-video')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-neutral-50'}`} style={{ backgroundColor: isDark ? undefined : '#F8F8F8' }}>
      {/* Sticky Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? `${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm shadow-sm ${isDark ? 'border-gray-800' : 'border-gray-100'} border-b` 
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-110 group relative"
              title={isDark ? "Click me for light mode" : "Click me for dark mode"}
            >
              <Zap className="w-5 h-5 text-white" />
              <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-800 text-white'} opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none`}>
                {isDark ? "Click me for light mode" : "Click me for dark mode"}
              </div>
            </button>
            <div className="flex flex-col md:flex-row md:items-end md:space-x-2">
              <span className={`text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent`} style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                ZipReach
              </span>
              <a 
                href="https://indrasol.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:bg-clip-text hover:text-transparent transition-all duration-300 leading-tight group relative md:mb-0.5`}
                style={{ 
                  fontFamily: 'Inter', 
                  fontWeight: 500,
                  textShadow: 'none'
                }}
                title="Click me"
              >
                by Indrasol
                <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-800 text-white'} opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none`}>
                  Click me
                </div>
              </a>
            </div>
          </div>
          <Button 
            onClick={scrollToForm}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-gentle-bounce"
            style={{ 
              background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)'
            }}
          >
            Join Early Access
          </Button>
        </div>
      </nav>

      {/* Hero Section with Hero Carousel */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className={`text-5xl md:text-6xl font-semibold leading-tight ${
                isDark 
                  ? 'text-white' 
                  : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'
              }`} style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                Campaigns on Command
              </h1>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`} style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                One platform to create, manage, and optimize your multi-channel marketing campaigns with AI-powered insights
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={scrollToForm}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-gentle-bounce"
                  style={{ 
                    background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)'
                  }}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            {/* Hero Carousel - Desktop */}
            <div className="relative flex justify-center" id="hero-video">
              <HeroCarousel />
            </div>
          </div>

          {/* Mobile & Tablet Layout */}
          <div className="lg:hidden space-y-8">
            <div className="space-y-6 text-center">
              <h1 className={`text-4xl md:text-5xl font-semibold leading-tight ${
                isDark 
                  ? 'text-white' 
                  : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'
              }`} style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                Campaigns on Command
              </h1>
              <p className={`text-lg md:text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`} style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                One platform to create, manage, and optimize your multi-channel marketing campaigns with AI-powered insights
              </p>
              <div className="flex justify-center">
                <Button 
                  onClick={scrollToForm}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-gentle-bounce"
                  style={{ 
                    background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)'
                  }}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            {/* Hero Carousel - Mobile & Tablet */}
            <div className="relative flex justify-center" id="hero-video">
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Why ZipReach Section */}
      <section id="why-zipreach" className="relative overflow-hidden py-24 lg:py-32">
        <BackgroundBlobs />
        {/* Decorative gradient rings */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-3xl" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-2xl rotate-45" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/10 to-blue-500/10 blur-3xl" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/10 to-blue-500/10 blur-2xl -rotate-45" />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center relative"
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 pb-2 relative">
              Sneak-Peek the Wins a Single ZipReach Chat Can Unlock
              {/* Animated underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-600/0 via-purple-600 to-emerald-500/0"
              />
            </h2>
            <p className="mt-4 text-center max-w-2xl mx-auto text-gray-600 dark:text-gray-300 relative z-10 whitespace-nowrap">Tell ZipReach your goal—AI builds the ads, launches everywhere, and shows performance in real time.</p>
          </motion.div>

          {/* Persona Cards with enhanced container */}
          <div className="mt-12 relative">
            {/* Decorative grid background */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}
            />
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 relative">
              {[
                {
                  emoji: '🎨',
                  role: 'Side-Hustle Designer',
                  title: 'Side-Hustle Designer',
                  pain: 'I sell prints on IG but ads feel scary.',
                  win: 'ZipReach turns one chat into IG + TikTok ads and lands 10X fresh eyeballs before lunch.'
                },
                {
                  emoji: '🛍️',
                  role: 'Small-Shop Owner',
                  title: 'Small-Shop Owner',
                  pain: 'My budget leaks into slow channels.',
                  win: 'Nightly, ZipReach pulls budget from slow channels to the channels on fire—doubling daily orders by morning.'
                },
                {
                  emoji: '👩‍💻',
                  role: 'Freelance Marketer',
                  title: 'Freelance Marketer',
                                      pain: 'Spends every Sunday buried in spreadsheets, building client reports.',
                    win: 'ZipReach drops a slick GIF recap —clients see results instantly and she wins back half a day every week.'
                },
                {
                  emoji: '🏋️‍♂️',
                  role: 'Gym Owner',
                  title: 'Gym Owner',
                                      pain: "If the gym's feed goes silent, new sign-ups stop showing up.",
                    win: "ZipReach auto-loads a month of high-energy reels and ads, packing the trial roster while you're spotting clients."
                },
                {
                  emoji: '🎥',
                  role: 'Solo Creator',
                  title: 'Solo Creator',
                                      pain: 'Shoots, edits, and captions nonstop—no hours left to hype her work.',
                    win: 'One ZipReach prompt super-charges her top reel, explodes her follower count, and sells out merch within 48 hours.'
                }
              ].map((card, index) => (
                <motion.div
                  key={card.role}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.21, 1.11, 0.81, 0.99] // spring-like easing
                  }}
                >
                  <div className="relative">
                    {/* Card component */}
                    <PersonaCard {...card} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline section with enhanced styling */}
          <motion.div 
            className="mt-20 relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Enhanced decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/20 to-transparent dark:via-indigo-900/10" />
            
            {/* Animated grid background */}
            <motion.div 
              className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]"
              style={{
                backgroundImage: `radial-gradient(circle at center, #6366f1 1px, transparent 1px)`,
                backgroundSize: '24px 24px'
              }}
              animate={{
                backgroundPosition: ['0px 0px', '24px 24px'],
                opacity: [0.15, 0.1, 0.15]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <h3 className="text-center text-2xl font-semibold mb-8 text-gray-900 dark:text-gray-100 relative">
              Watch the Magic Unfold ✨
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-purple-600/0 via-purple-600 to-purple-600/0"
              />
            </h3>

            <div className="max-w-3xl mx-auto space-y-4 relative">
              {/* Animated vertical timeline line with gradient and glow */}
              <div className="absolute left-8 top-8 bottom-8 w-0.5">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/0 via-indigo-500/50 to-indigo-500/0" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-indigo-500/0 via-indigo-500/50 to-indigo-500/0"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    boxShadow: [
                      '0 0 10px rgba(99, 102, 241, 0.2)',
                      '0 0 20px rgba(99, 102, 241, 0.4)',
                      '0 0 10px rgba(99, 102, 241, 0.2)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              
              {/* Enhanced conversation messages */}
              <motion.div 
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100/50 dark:border-indigo-500/10"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02, x: 5 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-lg shadow-lg">💭</div>
                  <div className="flex-1">
                    <div className="text-xs text-indigo-500 dark:text-indigo-400 font-medium mb-1">User Message</div>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      "Hey ZipReach, help me sell 50 eco bottles with $100 budget"
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100/50 dark:border-emerald-500/10 ml-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02, x: -5 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-lg shadow-lg">✨</div>
                  <div className="flex-1">
                    <div className="text-xs text-emerald-500 dark:text-emerald-400 font-medium mb-1">ZipReach AI</div>
                    <p className="text-gray-800 dark:text-gray-200">
                      Turns a single idea into scroll-stopping ad sets across every channel—automatically tuned to the audience you want.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100/50 dark:border-blue-500/10"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02, x: 5 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-lg shadow-lg">📅</div>
                  <div className="flex-1">
                    <div className="text-xs text-blue-500 dark:text-blue-400 font-medium mb-1">Content Planning</div>
                    <p className="text-gray-800 dark:text-gray-200">
                      Your content calendar fills up with scheduled posts across all channels
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100/50 dark:border-orange-500/10 ml-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02, x: -5 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-lg shadow-lg">📈</div>
                  <div className="flex-1">
                    <div className="text-xs text-orange-500 dark:text-orange-400 font-medium mb-1">Smart Optimization</div>
                    <p className="text-gray-800 dark:text-gray-200">
                      ZipReach sees the winning channel and glides your budget toward it—boosting returns without breaking your flow.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100/50 dark:border-pink-500/10"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02, x: 5 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.4 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-lg shadow-lg">🎉</div>
                  <div className="flex-1">
                    <div className="text-xs text-pink-500 dark:text-pink-400 font-medium mb-1">Results</div>
                    <p className="text-gray-800 dark:text-gray-200">
                      Wake up to a share-worthy performance GIF—your overnight wins served in one glance.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced What-If Headlines */}
          <motion.div 
            className="mt-16 text-center space-y-3 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/20 to-transparent dark:via-purple-900/10 blur-xl" />
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">What if running ads felt as easy as posting a selfie?</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">What if your spend auto-moved to the winner before breakfast?</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">What if clients asked 'How did you do that?' instead of 'Where's my report?'</p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Outcome Cards */}
      <section className={`py-16 px-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { emoji: '🎯', title: 'One-Chat Creation', desc: 'Type one goal—get ready-made ads & posts.' },
              { emoji: '⚡', title: 'Predict → Create → Publish', desc: 'AI predicts what works, creates content, and publishes automatically.' },
                              { emoji: '🤖', title: 'Auto-Optimised Budget', desc: 'Your spend can have auto nightly shifts to what works best.' },
              { emoji: '🎬', title: 'Share Ready Gif Recap', desc: 'Wake up to a GIF summary—not a report doc.' }
            ].map((card, index) => (
              <Card key={index} className={`text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group relative overflow-hidden ${isDark ? 'bg-gray-900' : ''}`} 
                    style={{ 
                      borderRadius: '16px', 
                      boxShadow: isDark ? '0 10px 25px rgba(0,0,0,0.3)' : '0 10px 25px rgba(0,0,0,0.1)',
                      background: isDark ? 'linear-gradient(145deg, #1f2937 0%, #111827 100%)' : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)'
                    }}>
                <CardContent className="p-8 relative z-10">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{card.emoji}</div>
                  <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                    {card.title}
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                    {card.desc}
                  </p>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="absolute inset-0 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: '0 0 60px rgba(147, 51, 234, 0.3)' }}></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Product Highlight Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`${isDark ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800' : 'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50'} rounded-3xl p-12 relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500 rounded-full blur-xl"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500 rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-500 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10 text-center mb-12">
              <div className={`inline-flex items-center px-4 py-2 ${isDark ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'} rounded-full text-sm font-medium mb-6`}>
                <Sparkles className="w-4 h-4 mr-2" />
                The Future of Marketing is Here
              </div>
              <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`} style={{ fontFamily: 'Inter', fontWeight: 700 }}>
                Stop Guessing. Start Winning.
              </h2>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`} style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                ZipReach lets your business wake up richer than it went to bed—without you opening another tab or hiring another person.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {[
                { icon: TrendingUp, title: '3x Higher ROI', desc: 'Our AI learns what converts and doubles down on winners automatically.' },
                { icon: Zap, title: '90% Time Saved', desc: 'From hours of setup to minutes of conversation. Marketing simplified.' },
                { icon: Target, title: 'Zero Expertise Needed', desc: 'Speak naturally. Our AI handles the marketing complexity.' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`} style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                    {item.title}
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 relative z-10">
              <div className="flex justify-center px-4">
                <Button 
                  onClick={scrollToForm}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-6 sm:px-8 py-4 rounded-xl text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-gentle-bounce w-full sm:w-auto max-w-sm sm:max-w-none flex items-center justify-center gap-2"
                  style={{ 
                    background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
                    boxShadow: '0 20px 40px rgba(124, 58, 237, 0.3)'
                  }}
                >
                  <span className="whitespace-nowrap px-1">Experience the Revolution</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-16 px-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-semibold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Inter', fontWeight: 600 }}>
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: 'What does it cost?', a: 'Early access users can launch up to 2 full campaigns - for free.' },
              { q: 'Do I need marketing skills?', a: 'Plain-language prompts do the trick.' },
              { q: 'Which platforms are supported?', a: 'Facebook, Instagram, Google, TikTok at launch—more soon.' },
              { q: 'How does ZipReach know where to move my budget?', a: 'Our AI watches real-time performance across channels and automatically shifts spend to the ads delivering the lowest cost-per-result—no spreadsheets required.' }
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`} className={`${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200'} border rounded-lg px-6`} style={{ borderRadius: '16px' }}>
                <AccordionTrigger className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className={`${isDark ? 'text-gray-300' : 'text-gray-600'} pt-2`} style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Early Access Form */}
      <section id="form" className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Inter', fontWeight: 600 }}>
              Join Early Access
            </h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ fontFamily: 'Inter', fontWeight: 400 }}>
              Be among the first to experience effortless multi-channel marketing.
            </p>
          </div>
          <InterestForm />
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} py-8 px-6 border-t`}>
        <div className="max-w-6xl mx-auto flex items-center justify-start">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
              ZipReach
            </span>
            <a 
              href="https://indrasol.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'} hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:bg-clip-text hover:text-transparent transition-all duration-300 self-end mb-0.5 ml-1`}
              style={{ 
                fontFamily: 'Inter', 
                fontWeight: 500,
              }}
            >
              by Indrasol
            </a>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} ml-2`} style={{ fontFamily: 'Inter', fontWeight: 400 }}>
              © 2025
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
