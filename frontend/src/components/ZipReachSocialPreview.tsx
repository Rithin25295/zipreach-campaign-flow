import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Users, Globe, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SocialPreviewProps {
  platform?: 'facebook' | 'twitter' | 'linkedin';
  theme?: 'light' | 'dark';
  title?: string;
  description?: string;
  isLoading?: boolean;
  showInteractions?: boolean;
}

const ZipReachSocialPreview: React.FC<SocialPreviewProps> = ({
  platform = 'facebook',
  theme = 'light',
  title = 'Connect, Engage, Grow',
  description = 'Let ZipReach turn one smart prompt into everywhere-ready campaigns—AI insights, cross-channel magic, zero hassle.',
  isLoading = false,
  showInteractions = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(!isLoading);

  const features = [
    { icon: Zap, text: 'AI-Powered Analytics' },
    { icon: Users, text: 'Audience Insights' },
    { icon: Globe, text: 'Multi-Platform' },
    { icon: TrendingUp, text: 'Growth Tracking' }
  ];

  const platformDimensions = {
    facebook: { width: 1200, height: 630 },
    twitter: { width: 1200, height: 675 },
    linkedin: { width: 1200, height: 627 }
  };

  const dimensions = platformDimensions[platform];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [features.length]);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setImageLoaded(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const containerClasses = `
    relative overflow-hidden cursor-pointer transition-all duration-300
    ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-background text-foreground'}
    border border-border
  `;

  const gradientOverlay = theme === 'dark' 
    ? 'from-purple-900/20 via-blue-900/20 to-cyan-900/20'
    : 'from-purple-100/30 via-blue-100/30 to-cyan-100/30';

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <motion.div
        className={containerClasses}
        style={{
          aspectRatio: `${dimensions.width}/${dimensions.height}`,
          maxWidth: '100%'
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background Pattern */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientOverlay}`} />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-32 h-32 rounded-full ${
                theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-200/20'
              }`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 2) * 60}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className={`absolute w-px h-full ${
                theme === 'dark' ? 'bg-blue-500/5' : 'bg-blue-200/10'
              }`}
              style={{
                left: `${10 + i * 20}%`,
                top: 0,
              }}
              animate={{
                y: ['-100%', '100%'],
              }}
              transition={{
                duration: 8 + i * 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
              }}
            />
          ))}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              className={`absolute w-2 h-2 rounded-full ${
                theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-200/30'
              }`}
              style={{
                left: `${5 + i * 25}%`,
                top: `${10 + (i % 2) * 70}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Loading State */}
        <AnimatePresence>
          {!imageLoaded && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12">
          {/* Header */}
          <div className="flex items-start justify-between">
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">ZipReach</h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-muted-foreground'}`}>
                  Your Campaign Assistant
                </p>
              </div>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex items-center">
            <div className="w-full max-w-2xl">
              <motion.h2
                className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {title}
              </motion.h2>
              
              <motion.p
                className={`text-lg md:text-xl mb-8 leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-muted-foreground'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {description}
              </motion.p>

              {/* Features Carousel */}
              <motion.div
                className="flex items-center space-x-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <AnimatePresence mode="wait">
                  {features.map((feature, index) => (
                    index === currentFeature && (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                          <feature.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-lg">{feature.text}</span>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  size="lg"
                  className={`${
                    theme === 'dark' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white border-0' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0'
                  } transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                >
                  Get Started
                  <motion.div
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Website URL */}
          {showInteractions && (
            <motion.div
              className="flex items-center justify-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'}`}>
                zipreach.com
              </div>
            </motion.div>
          )}
        </div>

        {/* Hover Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-[1px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ZipReachSocialPreview; 