import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaTiktok, FaGoogle } from 'react-icons/fa';
import { MessageSquare, BarChart3, Target, ArrowRight, Send, Check, X, ArrowUpRight, ArrowDownRight, Play, TrendingUp, Calendar, Zap, Trophy } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { formatMetric } from '@/utils/formatMetric';

// Brand Icons Components
const MetaIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 287.56 191" fill="none">
    <defs>
      <linearGradient id="linear-gradient" x1="62.34" y1="101.45" x2="260.34" y2="91.45" gradientTransform="matrix(1, 0, 0, -1, 0, 192)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#0064e1"/>
        <stop offset="0.4" stopColor="#0064e1"/>
        <stop offset="0.83" stopColor="#0073ee"/>
        <stop offset="1" stopColor="#0082fb"/>
      </linearGradient>
      <linearGradient id="linear-gradient-2" x1="41.42" y1="53" x2="41.42" y2="126" gradientTransform="matrix(1, 0, 0, -1, 0, 192)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#0082fb"/>
        <stop offset="1" stopColor="#0064e0"/>
      </linearGradient>
    </defs>
    <path d="M31.06,126c0,11,2.41,19.41,5.56,24.51A19,19,0,0,0,53.19,160c8.1,0,15.51-2,29.79-21.76,11.44-15.83,24.92-38,34-52l15.36-23.6c10.67-16.39,23-34.61,37.18-47C181.07,5.6,193.54,0,206.09,0c21.07,0,41.14,12.21,56.5,35.11,16.81,25.08,25,56.67,25,89.27,0,19.38-3.82,33.62-10.32,44.87C271,180.13,258.72,191,238.13,191V160c17.63,0,22-16.2,22-34.74,0-26.42-6.16-55.74-19.73-76.69-9.63-14.86-22.11-23.94-35.84-23.94-14.85,0-26.8,11.2-40.23,31.17-7.14,10.61-14.47,23.54-22.7,38.13l-9.06,16c-18.2,32.27-22.81,39.62-31.91,51.75C84.74,183,71.12,191,53.19,191c-21.27,0-34.72-9.21-43-23.09C3.34,156.6,0,141.76,0,124.85Z" fill="#0081fb"/>
    <path d="M24.49,37.3C38.73,15.35,59.28,0,82.85,0c13.65,0,27.22,4,41.39,15.61,15.5,12.65,32,33.48,52.63,67.81l7.39,12.32c17.84,29.72,28,45,33.93,52.22,7.64,9.26,13,12,19.94,12,17.63,0,22-16.2,22-34.74l27.4-.86c0,19.38-3.82,33.62-10.32,44.87C271,180.13,258.72,191,238.13,191c-12.8,0-24.14-2.78-36.68-14.61-9.64-9.08-20.91-25.21-29.58-39.71L146.08,93.6c-12.94-21.62-24.81-37.74-31.68-45C107,40.71,97.51,31.23,82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78Z" fill="url(#linear-gradient)"/>
    <path d="M82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78C38.61,71.62,31.06,99.34,31.06,126c0,11,2.41,19.41,5.56,24.51L10.14,167.91C3.34,156.6,0,141.76,0,124.85,0,94.1,8.44,62.05,24.49,37.3,38.73,15.35,59.28,0,0,82.85,0Z" fill="url(#linear-gradient-2)"/>
  </svg>
);

const GoogleAdsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 248.31 226.88" fill="none">
    <path d="M84.5,28.57c2.4-6.3,5.7-12.1,10.6-16.8c19.6-19.1,52-14.3,65.3,9.7c10,18.2,20.6,36,30.9,54c17.2,29.9,34.6,59.8,51.6,89.8c14.3,25.1-1.2,56.8-29.6,61.1c-17.4,2.6-33.7-5.4-42.7-21c-15.1-26.3-30.3-52.6-45.4-78.8c-0.3-0.6-0.7-1.1-1.1-1.6c-1.6-1.3-2.3-3.2-3.3-4.9c-6.7-11.8-13.6-23.5-20.3-35.2c-4.3-7.6-8.8-15.1-13.1-22.7c-3.9-6.8-5.7-14.2-5.5-22C82.2,36.17,82.7,32.17,84.5,28.57" fill="#3C8BD9"/>
    <path d="M84.5,28.57c-0.9,3.6-1.7,7.2-1.9,11c-0.3,8.4,1.8,16.2,6,23.5c11,18.9,22,37.9,32.9,56.9c1,1.7,1.8,3.4,2.8,5c-6,10.4-12,20.7-18.1,31.1c-8.4,14.5-16.8,29.1-25.3,43.6c-0.4,0-0.5-0.2-0.6-0.5c-0.1-0.8,0.2-1.5,0.4-2.3c4.1-15,0.7-28.3-9.6-39.7c-6.3-6.9-14.3-10.8-23.5-12.1c-12-1.7-22.6,1.4-32.1,8.9c-1.7,1.3-2.8,3.2-4.8,4.2c-0.4,0-0.6-0.2-0.7-0.5c4.8-8.3,9.5-16.6,14.3-24.9c19.8-34.4,39.6-68.8,59.5-103.1C84,29.27,84.3,28.97,84.5,28.57" fill="#FABC04"/>
    <path d="M10.4,157.97c1.9-1.7,3.7-3.5,5.7-5.1c24.3-19.2,60.8-5.3,66.1,25.1c1.3,7.3,0.6,14.3-1.6,21.3c-0.1,0.6-0.2,1.1-0.4,1.7c-0.9,1.6-1.7,3.3-2.7,4.9c-8.9,14.7-22,22-39.2,20.9c-19.7-1.4-35.2-16.2-37.9-35.8c-1.3-9.5,0.6-18.4,5.5-26.6c1-1.8,2.2-3.4,3.3-5.2C9.7,158.77,9.5,157.97,10.4,157.97" fill="#34A852"/>
    <path d="M80.2,200.97c-0.4-0.7,0-1.2,0.4-1.7c0.1,0.1,0.3,0.3,0.4,0.4L80.2,200.97" fill="#E1C025"/>
  </svg>
);

const slides = [
  {
    id: 'chat',
    title: 'AI Chat Lab',
    body: 'Perfect! I\'ve created targeted campaigns for Facebook, Instagram, TikTok, and Google Ads.',
    prompt: 'Sell 100 birthday cupcakes, fun tone, $100 budget',
    assets: [
      { icon: <FaFacebookF />, color: 'from-blue-500 to-blue-400', name: 'Facebook' },
      { icon: <FaInstagram />, color: 'from-pink-500 via-red-500 to-yellow-400', name: 'Instagram' },
      { icon: <FaTiktok />, color: 'from-gray-900 to-gray-800', name: 'TikTok' },
      { icon: <FaGoogle />, color: 'from-green-400 to-blue-500', name: 'Google' },
    ],
  },
  {
    id: 'board',
    title: 'Zippy Board',
    kpis: [
      { logo: <MetaIcon className="w-4 h-4 md:w-5 md:h-5" />, label: 'Meta', roas: 4.2, delta: '+0.3', color: 'text-blue-500', bgColor: 'from-blue-50 to-blue-100', borderColor: 'border-blue-200/60' },
      { logo: <GoogleAdsIcon className="w-4 h-4 md:w-5 md:h-5" />, label: 'Google', roas: 3.8, delta: '-0.2', color: 'text-green-500', bgColor: 'from-green-50 to-emerald-100', borderColor: 'border-green-200/60' },
      { logo: <FaTiktok />, label: 'TikTok', roas: 3.1, delta: '+0.5', color: 'text-gray-700', bgColor: 'from-gray-50 to-slate-100', borderColor: 'border-gray-200/60' },
    ],
    spend: 845,
    roas: 3.8,
    revenue: 3206,
  },
  {
    id: 'asset',
    title: 'Top Performing Asset',
    asset: {
      name: 'Summer Cake Collection Video',
      views: 15420,
      clicks: 892,
      conversions: 54,
      ctr: 5.8,
      conversionRate: 6.1
    }
  },
  {
    id: 'recap',
    title: 'Weekly Recap',
    weeklyData: {
      totalSpend: 2450,
      totalRevenue: 9680,
      roas: 3.95,
      topChannel: 'Instagram',
      impressions: 145000,
      clicks: 8200,
      conversions: 124
    }
  }
];

interface ChatSlideProps {
  title: string;
  body: string;
  prompt: string;
  assets: Array<{
    icon: React.ReactNode;
    color: string;
    name: string;
  }>;
}

interface BoardSlideProps {
  title: string;
  kpis: Array<{
    logo: React.ReactNode;
    label: string;
    roas: number;
    delta: string;
    color: string;
    bgColor: string;
    borderColor: string;
  }>;
  spend: number;
  roas: number;
  revenue: number;
}

interface RecapSlideProps {
  title: string;
  weeklyData: {
    totalSpend: number;
    totalRevenue: number;
    roas: number;
    topChannel: string;
    impressions: number;
    clicks: number;
    conversions: number;
  };
}

interface AssetSlideProps {
  title: string;
  asset: {
    name: string;
    views: number;
    clicks: number;
    conversions: number;
    ctr: number;
    conversionRate: number;
  };
}

const TypeWriter = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 25);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, onComplete]);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
  }, [text]);

  return <span>{displayText}</span>;
};

export const HeroCarousel = () => {
  const [active, setActive] = useState(0);
  const [canTransition, setCanTransition] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isTransitionPrevented, setIsTransitionPrevented] = useState(false);
  const [hasCompletedFirstTransition, setHasCompletedFirstTransition] = useState(false);

  // Initialize after component mounts to prevent immediate transition
  useEffect(() => {
    if (isFirstLoad) {
      // On first load, don't initialize immediately
      // Let the ChatSlide component signal when it's ready
      const initTimer = setTimeout(() => {
        setIsInitialized(true);
      }, 1000);

      return () => clearTimeout(initTimer);
    } else {
      // For subsequent initializations, use original timing
      const initTimer = setTimeout(() => {
        setIsInitialized(true);
        setCanTransition(true);
      }, 3000);

      return () => clearTimeout(initTimer);
    }
  }, [isFirstLoad]);

  useEffect(() => {
    // Listen for animation completion event
    const handleAnimationComplete = () => {
      if (isFirstLoad) {
        // On first load completion from ChatSlide
        if (!hasCompletedFirstTransition) {
          setActive(1); // Move to BoardSlide
          setHasCompletedFirstTransition(true);
        } else {
          // This is the completion from BoardSlide
          setCanTransition(true);
          setIsFirstLoad(false);
        }
      } else {
        setCanTransition(true);
      }
      setIsTransitionPrevented(false);
    };

    // Listen for prevent transition event
    const handlePreventTransition = () => {
      setIsTransitionPrevented(true);
    };

    window.addEventListener('slideAnimationComplete', handleAnimationComplete);
    window.addEventListener('preventTransition', handlePreventTransition);

    return () => {
      window.removeEventListener('slideAnimationComplete', handleAnimationComplete);
      window.removeEventListener('preventTransition', handlePreventTransition);
    };
  }, [isFirstLoad, hasCompletedFirstTransition]);

  useEffect(() => {
    const handleSlideChange = () => {
      if (canTransition && isInitialized && !isFirstLoad && !isTransitionPrevented) {
        setActive((n) => (n + 1) % slides.length);
        setCanTransition(false);
      }
    };

    // Only start the interval if initialized and not in first load
    if (isInitialized && !isFirstLoad) {
      const id = setInterval(handleSlideChange, 1500);
      return () => clearInterval(id);
    }
  }, [canTransition, isInitialized, isFirstLoad, isTransitionPrevented]);

  const handleDotClick = (index: number) => {
    if (!isFirstLoad && !isTransitionPrevented) {
      setActive(index);
      setCanTransition(false);
    }
  };

  // Add new effect to handle immediate transition check
  useEffect(() => {
    const handleTransitionCheck = () => {
      if (canTransition && !isFirstLoad) {
        setActive((n) => (n + 1) % slides.length);
        setCanTransition(false);
      }
    };

    window.addEventListener('checkTransition', handleTransitionCheck);
    return () => {
      window.removeEventListener('checkTransition', handleTransitionCheck);
    };
  }, [canTransition, isFirstLoad]);

  // In parent HeroCarousel component, add handler for force transition
  useEffect(() => {
    const handleForceTransition = () => {
      if (canTransition && !isFirstLoad) {
        setActive((n) => (n + 1) % slides.length);
        setCanTransition(false);
      }
    };

    window.addEventListener('forceTransition', handleForceTransition);
    return () => {
      window.removeEventListener('forceTransition', handleForceTransition);
    };
  }, [canTransition, isFirstLoad]);

  return (
    <div className="relative w-full max-w-[640px] h-[560px] sm:h-[520px] md:h-[540px] lg:h-[560px]">
      <AnimatePresence mode="wait">
        {slides.map(
          (s, idx) =>
            idx === active && (
              <motion.div
                key={s.id}
                className="absolute inset-0 rounded-xl bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-gray-100 dark:ring-gray-700 px-3 sm:px-6 py-3 sm:py-4 overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {s.id === 'chat' ? (
                  <ChatSlide {...(s as ChatSlideProps)} />
                ) : s.id === 'board' ? (
                  <BoardSlide {...(s as BoardSlideProps)} />
                ) : s.id === 'asset' ? (
                  <AssetSlide {...(s as AssetSlideProps)} />
                ) : (
                  <RecapSlide {...(s as RecapSlideProps)} />
                )}
              </motion.div>
            )
        )}
      </AnimatePresence>
      
      {/* Navigation dots - Adjusted for better mobile touch */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            aria-label={`slide ${i + 1}`}
            className={`h-2 w-4 sm:w-6 rounded-full transition-all duration-200 ${
              i === active 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ChatSlide: React.FC<ChatSlideProps> = ({ title, body, prompt, assets }) => {
  const [typingInInput, setTypingInInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [showAITyping, setShowAITyping] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [showAssets, setShowAssets] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [showSendButton, setShowSendButton] = useState(false);
  const [assetsScrollX, setAssetsScrollX] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [scrollComplete, setScrollComplete] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [sequenceComplete, setSequenceComplete] = useState(false);

  // Signal to parent when ALL animations are complete
  useEffect(() => {
    if (sequenceComplete && isInitialLoad) {
      const finalTimer = setTimeout(() => {
        setAnimationComplete(true);
        window.dispatchEvent(new CustomEvent('slideAnimationComplete'));
        setIsInitialLoad(false);
      }, 500); // Reduced from 2000ms to 800ms for quicker transition after sequence completes

      return () => clearTimeout(finalTimer);
    }
  }, [sequenceComplete, isInitialLoad]);

  useEffect(() => {
    // Reset all states when slide becomes active
    setTypingInInput(false);
    setInputValue('');
    setShowUserMessage(false);
    setShowAITyping(false);
    setShowResponse(false);
    setShowAssets(false);
    setShowInput(true);
    setShowSendButton(false);
    setAssetsScrollX(0);
    setTypingComplete(false);
    setAnimationComplete(false);
    setScrollComplete(false);
    setSequenceComplete(false);

    // Start typing sequence
    const timer1 = setTimeout(() => {
      setTypingInInput(true);
      // Start typing the prompt
      let currentText = '';
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex < prompt.length) {
          currentText += prompt[currentIndex];
          setInputValue(currentText);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          // Show send button after typing completes
          setShowSendButton(true);
          // Transition to message area after a brief pause
          setTimeout(() => {
            setTypingInInput(false);
            setShowInput(false);
            setShowUserMessage(true);
            // Start AI typing after message appears
            setTimeout(() => {
              setShowAITyping(true);
            }, 800);
          }, 500);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }, 2000);

    return () => {
      clearTimeout(timer1);
    };
  }, [prompt]);

  // Handle typing completion with increased timing
  const handleTypingComplete = () => {
    setTypingComplete(true);
    setTimeout(() => {
      setShowAITyping(false);
      setShowResponse(true);
      
      setTimeout(() => {
        setShowAssets(true);
        
        setTimeout(() => {
          const isTabletOrLarger = window.innerWidth >= 768;
          const isDesktop = window.innerWidth >= 1024;
          
          if (!isTabletOrLarger) {
            setAssetsScrollX(-45);
            setTimeout(() => {
              setScrollComplete(true);
              setSequenceComplete(true);
            }, 1500);
          } else if (isTabletOrLarger && !isDesktop) {
            setScrollComplete(true);
            setSequenceComplete(true);
          } else {
            setTimeout(() => {
              setAssetsScrollX(-45);
              setTimeout(() => {
                setScrollComplete(true);
                setSequenceComplete(true);
              }, 1500);
            }, 1200);
          }
        }, 800);
      }, 800);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with theme colors - Adjusted padding for mobile */}
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 p-3 sm:p-4 -mx-3 sm:-mx-6 -mt-3 sm:-mt-4 rounded-t-xl bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="bg-white p-1.5 sm:p-2 rounded-lg">
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-base sm:text-lg truncate">{title}</h4>
          <p className="text-xs sm:text-sm text-white/80 truncate">Campaign Assistant</p>
        </div>
        <div className="bg-white/20 text-white p-1.5 sm:p-2 rounded-full">
          <Target className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>
      </div>
      
      {/* Chat Messages - Adjusted spacing and font sizes */}
      <div className="flex-1 space-y-3 sm:space-y-4 mb-3 sm:mb-4 overflow-y-auto">
        {/* User Message */}
        {showUserMessage && (
          <div className="flex justify-end">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs sm:text-sm rounded-2xl px-3 sm:px-4 py-2 sm:py-3 max-w-[85%] sm:max-w-xs shadow-lg break-words"
            >
              {prompt}
            </motion.div>
          </div>
        )}

        {/* AI Response */}
        <div className="flex justify-start">
          {showAITyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-xs sm:text-sm rounded-2xl px-3 sm:px-4 py-2 sm:py-3 max-w-[85%] sm:max-w-md shadow-sm"
            >
              <TypeWriter text={body} onComplete={handleTypingComplete} />
            </motion.div>
          )}
          {showResponse && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-xs sm:text-sm rounded-2xl px-3 sm:px-4 py-2 sm:py-3 max-w-[85%] sm:max-w-md shadow-sm"
            >
              {body}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Enhanced Video Campaign Assets - Improved mobile scroll */}
      {showAssets && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 sm:mb-4"
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h5 className="text-[10px] sm:text-xs font-medium text-gray-600 dark:text-gray-400">Generated Video Campaign Assets</h5>
            <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />
          </div>
          <div className="overflow-hidden">
            <motion.div 
              className="flex gap-2 sm:gap-3 pb-2"
              animate={{ x: assetsScrollX }}
              transition={{ duration: 3, ease: "easeInOut" }}
              style={{ width: `${assets.length * (window.innerWidth < 640 ? 120 : 140)}px` }}
            >
              {assets.map((asset, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0, rotateY: 180 }}
                  animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                  transition={{ 
                    delay: i * 0.15, 
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  className="relative group cursor-pointer flex-shrink-0 w-[110px] sm:w-32"
                >
                  {/* Video Card Container - Adjusted heights */}
                  <div className={`relative h-16 sm:h-20 w-full rounded-xl bg-gradient-to-br ${asset.color} overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}>
                    {/* Video Background Effect */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-black/30"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
                      
                      {/* Simulated video content */}
                      <div className="absolute inset-2 border border-white/30 rounded-lg flex items-center justify-center">
                        <div className="text-white/80 text-xs font-medium bg-black/40 px-1.5 py-0.5 rounded">
                          Video
                        </div>
                      </div>
                    </div>

                    {/* Play Button with Pulse Animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:bg-white transition-colors"
                      >
                        <div className="w-0 h-0 border-l-[6px] border-l-gray-800 border-y-[3px] border-y-transparent ml-0.5"></div>
                      </motion.div>
                    </div>

                    {/* Channel Icon */}
                    <div className="absolute top-1 left-1 bg-white/90 p-1 rounded-full shadow-sm">
                      <div className="text-xs">
                        {asset.icon}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Caption with Channel Name and Action Buttons - Adjusted for mobile */}
                  <div className="mt-1.5 sm:mt-2 text-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5 sm:mb-1">
                      <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                        {asset.icon}
                      </div>
                      <p className="text-[10px] sm:text-xs font-semibold text-gray-900 dark:text-gray-100">
                        {asset.name === 'Facebook' ? 'Facebook Ad' :
                         asset.name === 'Instagram' ? 'Instagram Story' :
                         asset.name === 'TikTok' ? 'TikTok Ad' :
                         'Google Ad'}
                      </p>
                    </div>
                    <p className="text-[8px] sm:text-xs text-gray-500 dark:text-gray-400 mb-1.5 sm:mb-2">
                      Cupcakes Campaign
                    </p>
                    
                    {/* Action Buttons - Smaller on mobile */}
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                      <button className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors shadow-sm">
                        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                      <button className="w-5 h-5 sm:w-6 sm:h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-sm">
                        <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Chat Input Box - Adjusted for mobile */}
      {showInput && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-auto"
        >
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
            <input
              type="text"
              value={inputValue}
              readOnly
              placeholder={!typingInInput ? "Describe your campaign goal..." : ''}
              className="flex-1 bg-transparent text-xs sm:text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-none min-w-0 break-words"
              style={{ 
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                whiteSpace: 'normal',
                lineHeight: '1.4'
              }}
            />
            <button 
              className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 transform flex-shrink-0 ${
                showSendButton
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:scale-105' 
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
              }`}
            >
              <Send className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const BoardSlide: React.FC<BoardSlideProps> = ({ title, kpis, spend, roas, revenue }) => {
  const [isProMode, setIsProMode] = useState(true);
  const [sequenceComplete, setSequenceComplete] = useState(false);
  const [hasStartedSequence, setHasStartedSequence] = useState(false);

  // Enhanced auto-toggle sequence with reduced display times
  useEffect(() => {
    // Start in pro mode
    setIsProMode(true);
    setSequenceComplete(false);

    // Only start the sequence once the component is mounted and visible
    const startTimer = setTimeout(() => {
      setHasStartedSequence(true);
    }, 300); // Reduced from 500ms for quicker start

    // Only run the toggle sequence after it has started
    if (hasStartedSequence) {
      const timer1 = setTimeout(() => {
        setIsProMode(false); // Switch to simple mode
      }, 2500); // Reduced from 4000ms

      const timer2 = setTimeout(() => {
        setIsProMode(true); // Switch back to pro mode
      }, 5000); // Reduced from 8000ms

      // Signal completion after viewing time
      const timer3 = setTimeout(() => {
        setSequenceComplete(true);
        window.dispatchEvent(new CustomEvent('slideAnimationComplete'));
      }, 7500); // Reduced from 12000ms

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }

    return () => clearTimeout(startTimer);
  }, [hasStartedSequence]);

  // Prevent transition until sequence is complete
  useEffect(() => {
    const handleTransitionCheck = () => {
      if (!sequenceComplete) {
        window.dispatchEvent(new CustomEvent('preventTransition'));
      }
    };

    window.addEventListener('checkTransition', handleTransitionCheck);
    return () => {
      window.removeEventListener('checkTransition', handleTransitionCheck);
    };
  }, [sequenceComplete]);

  return (
    <div className="h-full flex flex-col">
      {/* Header with theme colors */}
      <div className="flex items-center gap-3 mb-4 p-4 -mx-6 -mt-4 rounded-t-xl bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="bg-white p-2 rounded-lg">
          <BarChart3 className="w-5 h-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-white text-lg">{title}</h4>
          <p className="text-sm text-white/80">Track your performance and manage your campaigns</p>
        </div>
        <div className="bg-white/20 text-white p-2 rounded-full flex items-center space-x-1">
          <span className="text-xs text-white/80">Simple</span>
          <Switch
            checked={isProMode}
            onCheckedChange={setIsProMode}
            className="scale-75"
          />
          <span className="text-xs text-white/80">Pro</span>
        </div>
      </div>
      
      {/* Enhanced KPI Cards with better text handling and fixed Meta icon */}
      <div className="grid grid-cols-3 gap-2 mb-3 flex-shrink-0">
        {kpis.map((k, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ 
              delay: i * 0.1 + 0.3,
              type: "spring",
              stiffness: 120,
              damping: 12
            }}
            whileHover={{ 
              scale: 1.08, 
              y: -3,
              rotateY: 5,
              transition: { duration: 0.2 }
            }}
            className={`bg-gradient-to-br ${k.bgColor} border ${k.borderColor} rounded-lg shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-105 cursor-pointer group p-2 sm:p-3 relative overflow-hidden`}
          >
            {/* Enhanced animated background gradient */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-purple-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(147,51,234,0.1) 100%)",
                  "linear-gradient(45deg, rgba(147,51,234,0.1) 0%, rgba(59,130,246,0.1) 100%)",
                  "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(147,51,234,0.1) 100%)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <div className="flex items-center justify-between mb-1 sm:mb-2 relative z-10">
              <div className="flex items-center gap-1 sm:gap-2">
                <motion.div 
                  className={`p-1 sm:p-1.5 md:p-2 rounded-lg bg-white/70 group-hover:bg-white/90 transition-all duration-500 shadow-sm ${k.color} flex items-center justify-center`}
                  whileHover={{ rotate: 360, scale: 1.15 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  style={{ minWidth: '24px', minHeight: '24px' }}
                >
                  {k.logo}
                </motion.div>
                <span className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">{k.label}</span>
              </div>
            </div>
            <div className="flex items-center justify-between relative z-10">
              <div className="min-w-0 flex-1">
                <motion.div 
                  className="text-xs sm:text-sm md:text-base lg:text-xl font-bold text-gray-900 dark:text-white"
                  animate={{ 
                    scale: !isProMode ? 1 : 1.05,
                    color: !isProMode ? "#111827" : "#7C3AED"
                  }}
                  transition={{ duration: 0.4, type: "spring" }}
                >
                  {!isProMode ? (
                    <div className="flex flex-col">
                      <span className="text-[10px] sm:text-xs md:text-sm whitespace-normal leading-tight">Earned ${k.roas.toFixed(1)}</span>
                      <span className="text-[10px] sm:text-xs md:text-sm whitespace-normal leading-tight">per $1 spent</span>
                    </div>
                  ) : (
                    `${k.roas.toFixed(1)}×`
                  )}
                </motion.div>
              </div>
              <motion.div 
                className={`flex items-center gap-1 transition-all duration-500 flex-shrink-0 ${
                  k.delta.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}
                whileHover={{ scale: 1.3, rotate: 5 }}
                animate={{ 
                  y: [0, -3, 0],
                  opacity: [0.8, 1, 0.8],
                  transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {k.delta.startsWith('+') ? (
                  <ArrowUpRight className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                ) : (
                  <ArrowDownRight className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                )}
                <span className="text-[10px] sm:text-xs font-bold">
                  {k.delta}
                </span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Enhanced Summary Cards - Better spacing and animations */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 100, damping: 15 }}
        className="flex-1 flex flex-col min-h-0"
      >
        {/* Top Summary Row - Better spacing */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4 flex-shrink-0">
          <motion.div 
            className="bg-gradient-to-br from-orange-50 to-red-100 rounded-lg p-2 sm:p-3 border border-orange-200/60 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group relative overflow-hidden"
            whileHover={{ y: -4, rotateX: 5 }}
            animate={{ 
              boxShadow: [
                "0 4px 6px rgba(0,0,0,0.1)", 
                "0 8px 16px rgba(255,165,0,0.2)", 
                "0 4px 6px rgba(0,0,0,0.1)"
              ],
              transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <motion.div className="absolute inset-0 bg-gradient-to-r from-orange-400/15 to-red-400/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="text-center relative z-10">
              <p className="text-orange-600 text-xs mb-1 font-medium">Total Spend</p>
              <motion.p 
                className="font-bold text-sm sm:text-lg text-orange-900"
                animate={{ 
                  scale: !isProMode ? 1 : 1.08,
                  textShadow: !isProMode ? "none" : "0 2px 4px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                {!isProMode ? `$${spend} spent` : `$${spend}`}
              </motion.p>
              <p className="text-xs text-orange-500">Active</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-lg p-2 sm:p-3 border border-emerald-200/60 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group relative overflow-hidden"
            whileHover={{ y: -4, rotateX: 5 }}
          >
            <motion.div className="absolute inset-0 bg-gradient-to-r from-emerald-400/15 to-green-400/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="text-center relative z-10">
              <p className="text-emerald-600 text-xs mb-1 font-medium">Return on Ad Spend</p>
              <motion.p 
                className="font-bold text-sm sm:text-lg text-emerald-900"
                animate={{ 
                  scale: !isProMode ? 1 : 1.08,
                  textShadow: !isProMode ? "none" : "0 2px 4px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                {!isProMode ? `Earned $${roas.toFixed(1)} per $1 spent` : `${roas.toFixed(1)}×`}
              </motion.p>
              <p className="text-xs text-emerald-500">Excellent performance</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-lg p-2 sm:p-3 border border-purple-200/60 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer group relative overflow-hidden"
            whileHover={{ y: -4, rotateX: 5 }}
          >
            <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-400/15 to-indigo-400/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="text-center relative z-10">
              <p className="text-purple-600 text-xs mb-1 font-medium">Total Sales</p>
              <motion.p 
                className="font-bold text-sm sm:text-lg text-purple-900"
                animate={{ 
                  scale: !isProMode ? 1 : 1.08,
                  textShadow: !isProMode ? "none" : "0 2px 4px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                {!isProMode ? `53 buyers ($${revenue.toLocaleString()} sales)` : `$${revenue.toLocaleString()}`}
              </motion.p>
              <p className="text-xs text-purple-500">Great job!</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Campaign Performance Indicator - Sticky to bottom */}
        <div className="mt-auto">
          <motion.div 
            className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-lg p-2 sm:p-3 border border-blue-200/60 shadow-lg backdrop-blur-sm cursor-pointer group relative overflow-hidden"
            whileHover={{ y: -3, scale: 1.02, rotateX: 2 }}
            animate={{ 
              background: [
                "linear-gradient(90deg, rgb(239, 246, 255) 0%, rgb(238, 242, 255) 50%, rgb(250, 245, 255) 100%)",
                "linear-gradient(90deg, rgb(219, 234, 254) 0%, rgb(224, 231, 255) 50%, rgb(243, 232, 255) 100%)",
                "linear-gradient(90deg, rgb(239, 246, 255) 0%, rgb(238, 242, 255) 50%, rgb(250, 245, 255) 100%)"
              ],
              transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <motion.div 
                  className="w-3 h-3 bg-green-500 rounded-full shadow-sm"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.6, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(34,197,94,0.4)",
                      "0 0 0 8px rgba(34,197,94,0)",
                      "0 0 0 0 rgba(34,197,94,0.4)"
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="text-sm font-medium text-gray-700">Campaign Performance</span>
              </div>
              <motion.div 
                className="flex items-center gap-1 text-green-600"
                whileHover={{ scale: 1.15, x: 3 }}
                animate={{ 
                  x: [0, 3, 0],
                  scale: [1, 1.05, 1],
                  transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-bold">+18% vs last week</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const AssetSlide: React.FC<AssetSlideProps> = ({ title, asset }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    // First show the title faster
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 300);

    // Show confetti sooner
    const confettiTimer = setTimeout(() => {
      setShowConfetti(true);
    }, 800);

    // Hide confetti after shorter animation
    const hideConfettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    // Signal completion after 4s total
    const completionTimer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('slideAnimationComplete'));
    }, 4000);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(confettiTimer);
      clearTimeout(hideConfettiTimer);
      clearTimeout(completionTimer);
    };
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Header with theme colors */}
      <div className="flex items-center gap-3 p-4 -mx-6 -mt-4 rounded-t-xl bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="bg-white p-2 rounded-lg">
          <Trophy className="w-5 h-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-white text-lg">{title}</h4>
          <p className="text-sm text-white/80">Best performing content</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center relative pt-6">
        {/* Confetti Animation - Enhanced */}
        {showConfetti && (
          <motion.div 
            className="absolute inset-0 pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  top: "50%",
                  left: "50%",
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  scale: Math.random() * 1 + 0.5,
                  opacity: 0,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  ease: "easeOut",
                  delay: Math.random() * 0.2,
                }}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                  backgroundColor: ['#FFD700', '#FF6B6B', '#4CAF50', '#2196F3', '#E040FB'][Math.floor(Math.random() * 5)],
                  boxShadow: "0 0 10px rgba(255,255,255,0.5)",
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Main Content Container */}
        <motion.div 
          className="w-full max-w-2xl mx-auto px-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Asset Image Container */}
          <motion.div 
            className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-100 to-blue-100"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Image */}
            <div className="aspect-[4/3] relative">
              <img 
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=450&fit=crop&crop=center"
                alt={asset.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Video Play Button */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play className="w-10 h-10 text-white" />
                </div>
              </motion.div>
            </div>

            {/* Title Overlay with Sequenced Animation */}
            <AnimatePresence>
              {showTitle && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                >
                  <motion.h3 
                    className="text-2xl font-bold text-white text-center mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {asset.name}
                  </motion.h3>
                  <motion.div 
                    className="flex justify-center gap-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                      {asset.views.toLocaleString()} views
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const RecapSlide: React.FC<RecapSlideProps> = ({ title, weeklyData }) => {
  const [currentMetric, setCurrentMetric] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const metrics = [
    { label: 'Total Spend', value: `$${weeklyData.totalSpend.toLocaleString()}`, color: 'from-red-500 to-orange-500', icon: '💰' },
    { label: 'Revenue', value: `$${weeklyData.totalRevenue.toLocaleString()}`, color: 'from-green-500 to-emerald-500', icon: '📈' },
    { label: 'ROAS', value: `${weeklyData.roas}×`, color: 'from-blue-500 to-indigo-500', icon: '🎯' },
    { label: 'Top Channel', value: weeklyData.topChannel, color: 'from-purple-500 to-pink-500', icon: '🏆' }
  ];

  useEffect(() => {
    // Reset animation state when slide becomes active
    setAnimationComplete(false);
    
    // Cycle through metrics every 2 seconds
    const metricsInterval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length);
    }, 2000);

    // After all metrics have been shown (8 seconds) plus a 2-second buffer,
    // signal completion and allow transition
    const completionTimer = setTimeout(() => {
      setAnimationComplete(true);
      window.dispatchEvent(new CustomEvent('slideAnimationComplete'));
    }, 10000); // 8s for metrics + 2s buffer

    // Force transition check after completion
    const transitionTimer = setTimeout(() => {
      if (animationComplete) {
        window.dispatchEvent(new CustomEvent('forceTransition'));
      }
    }, 10500); // Additional 0.5s after completion

    return () => {
      clearInterval(metricsInterval);
      clearTimeout(completionTimer);
      clearTimeout(transitionTimer);
    };
  }, [metrics.length, animationComplete]);

  // Add effect to handle immediate transition check
  useEffect(() => {
    const handleTransitionCheck = () => {
      if (animationComplete) {
        window.dispatchEvent(new CustomEvent('forceTransition'));
      }
    };

    window.addEventListener('checkTransition', handleTransitionCheck);
    return () => {
      window.removeEventListener('checkTransition', handleTransitionCheck);
    };
  }, [animationComplete]);

  return (
    <div className="h-full flex flex-col">
      {/* Header with theme colors */}
      <div className="flex items-center gap-3 mb-2 p-4 -mx-6 -mt-4 rounded-t-xl bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="bg-white p-2 rounded-lg">
          <TrendingUp className="w-5 h-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-white text-lg">{title}</h4>
          <p className="text-sm text-white/80">Share Ready Gif Recap</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {/* Vertical Video Container - Further adjusted height */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative w-[280px] h-[420px] bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-[32px] overflow-hidden shadow-2xl"
          style={{
            boxShadow: "0 0 40px rgba(0,0,0,0.3), inset 0 0 100px rgba(255,255,255,0.1)"
          }}
        >
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Gradient Orbs */}
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-3xl"
              animate={{
                x: [-200, 0, -200],
                y: [-200, 0, -200],
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-pink-500/20 to-orange-500/20 blur-3xl"
              animate={{
                x: [200, 0, 200],
                y: [200, 0, 200],
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Animated Grid Lines */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
            animate={{ y: [-20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/30"
              initial={{ 
                x: Math.random() * 280,
                y: Math.random() * 500,
                scale: 0
              }}
              animate={{ 
                y: [Math.random() * 500, -20],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 2 + 3,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }}
            />
          ))}

          {/* Content Container - Adjusted spacing */}
          <div className="relative z-10 h-full flex flex-col justify-between p-4 pb-3">
            {/* Top Section - Brand */}
            <motion.div 
              className="text-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mx-auto mb-1 flex items-center justify-center shadow-lg"
              >
                <Zap className="w-5 h-5 text-white" />
              </motion.div>
              <h3 className="text-white font-bold text-lg">ZipReach</h3>
              <p className="text-white/80 text-xs">Weekly Performance</p>
            </motion.div>

            {/* Center Section - Metrics */}
            <div className="flex-1 flex items-center justify-center -my-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMetric}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="text-center space-y-2"
                >
                  <motion.div 
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${metrics[currentMetric].color} flex items-center justify-center shadow-lg`}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="text-2xl">{metrics[currentMetric].icon}</span>
                  </motion.div>
                  <div className="text-white space-y-1">
                    <motion.p 
                      className="text-xs text-white/80"
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {metrics[currentMetric].label}
                    </motion.p>
                    <motion.p 
                      className="text-lg font-bold"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {metrics[currentMetric].value}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Section - Compact Stats & Social */}
            <div className="space-y-2">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-1.5"
                >
                  <p className="text-white/70 text-[10px]">Impressions</p>
                  <p className="text-white font-bold text-sm">{(weeklyData.impressions / 1000).toFixed(0)}K</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-1.5"
                >
                  <p className="text-white/70 text-[10px]">Clicks</p>
                  <p className="text-white font-bold text-sm">{(weeklyData.clicks / 1000).toFixed(1)}K</p>
                </motion.div>
              </div>

              {/* Social Media Icons */}
              <div className="flex justify-center gap-2 mt-1">
                {[FaFacebookF, FaInstagram, FaTiktok, FaGoogle].map((Icon, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    animate={{ 
                      y: [0, -2, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className="w-6 h-6 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Icon className="w-2.5 h-2.5 text-white" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
};
