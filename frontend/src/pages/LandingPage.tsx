
import React, { useState, useEffect } from 'react';
import { ArrowRight, Target, Zap, ChevronDown, ThumbsUp, Sparkles, TrendingUp, BarChart3, Calendar, MessageSquare, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTheme } from '@/contexts/ThemeContext';
import InterestForm from '@/components/InterestForm';
import { HeroCarousel } from '@/components/HeroCarousel';

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
                Goal to Multi-Channel Campaign in Minutes.
              </h1>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`} style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                Describe what you want to campaign for and goal —ZipReach makes the ads, runs them everywhere, and shows you the performance.
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
                Goal to Multi-Channel Campaign in Minutes.
              </h1>
              <p className={`text-lg md:text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`} style={{ fontFamily: 'Inter', fontWeight: 400 }}>
                Describe what you want to campaign for and goal —ZipReach makes the ads, runs them everywhere, and shows you the performance.
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

      {/* Enhanced Outcome Cards */}
      <section className={`py-16 px-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { emoji: '🎯', title: 'One-Chat Creation', desc: 'Type one goal—get ready-made ads & posts.' },
              { emoji: '⚡', title: 'Predict → Create → Publish', desc: 'AI predicts what works, creates content, and publishes automatically.' },
              { emoji: '🤖', title: 'Auto-Optimised Budget', desc: 'Your spend shifts nightly to what works best.' },
              { emoji: '🎬', title: 'Share Ready Gif Recap', desc: 'Wake up to a GIF summary—not a spreadsheet.' }
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
              { q: 'Which platforms are supported?', a: 'Facebook, Instagram, Google, TikTok at launch—more soon.' }
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
