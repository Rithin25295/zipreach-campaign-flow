import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, Globe, TrendingUp, ArrowRight } from 'lucide-react';

const ZipReachSocialPreview: React.FC = () => {
  const features = [
    { icon: Zap, text: 'AI-Powered Campaigns' },
    { icon: Users, text: 'Multi-Channel Marketing' },
    { icon: Globe, text: 'Cross-Platform Analytics' },
    { icon: TrendingUp, text: 'Automated Growth' }
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-12 flex flex-col justify-between">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl font-bold bg-gradient-to-br from-purple-600 to-blue-600 text-transparent bg-clip-text">Z</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">ZipReach</h1>
            <p className="text-white/80">AI-Powered Marketing Automation</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center">
          <div className="space-y-8">
            <h2 className="text-6xl font-bold text-white leading-tight">
              Transform Your <br />
              Marketing Strategy
            </h2>
            <p className="text-2xl text-white/90 max-w-2xl">
              One platform to create, manage, and optimize your multi-channel marketing campaigns with AI-powered insights
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-4 gap-6 mt-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center space-x-3"
              >
                <Icon className="w-6 h-6 text-white" />
                <span className="text-white font-medium">{feature.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ZipReachSocialPreview; 