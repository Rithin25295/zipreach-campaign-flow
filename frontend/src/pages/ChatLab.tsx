import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Target, DollarSign, History, ThumbsUp, RefreshCw, Image, Video, Menu, Check, RotateCcw, Zap, MessageCircle, Clock, Brain, Wand2, Mic, Palette, Megaphone, Building2, PartyPopper, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChatMessage {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
  assets?: Array<{ type: 'image' | 'video'; url: string; id: string; title: string }>;
}

interface PromptHistoryItem {
  id: string;
  prompt: string;
  timestamp: Date;
  category: string;
}

const ChatLab = () => {
  const [message, setMessage] = useState('');
  const [brandVoice, setBrandVoice] = useState(50);
  const [assetsViewMode, setAssetsViewMode] = useState<'corporate' | 'fun' | 'balanced'>('balanced');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'assistant',
      content: "Hi! I'm your AI campaign assistant. Tell me what you want to sell and I'll create cross-channel campaigns for you. Try: 'Sell 100 birthday cupcakes, fun tone, $100 budget'"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [promptHistory, setPromptHistory] = useState<PromptHistoryItem[]>([
    { id: '1', prompt: 'Launch summer sale campaign', timestamp: new Date(), category: 'Sales' },
    { id: '2', prompt: 'Promote new product launch', timestamp: new Date(Date.now() - 86400000), category: 'Product' },
    { id: '3', prompt: 'Brand awareness campaign', timestamp: new Date(Date.now() - 172800000), category: 'Branding' },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const StreamingText = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, 20);
        return () => clearTimeout(timer);
      } else if (onComplete) {
        onComplete();
      }
    }, [currentIndex, text, onComplete]);

    return <span>{displayedText}</span>;
  };

  const LoadingSkeleton = () => (
    <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6 animate-pulse border border-purple-200">
      <div className="space-y-3">
        <div className="h-4 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full w-1/2 animate-pulse"></div>
        <div className="h-4 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full w-5/6 animate-pulse"></div>
      </div>
    </div>
  );

  const PlaceholderGallery = () => (
    <div className="mt-6 animate-fade-in">
      <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
        Generating Assets...
      </h4>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i} 
            className="aspect-square bg-gradient-to-br from-purple-200 via-blue-200 to-pink-200 rounded-2xl animate-pulse shadow-lg"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
    </div>
  );

  const getAssetsCount = () => {
    switch (assetsViewMode) {
      case 'corporate': return 1205;
      case 'fun': return 1543;
      case 'balanced': return 1374;
      default: return 1543;
    }
  };

  const getAssetsIcon = () => {
    switch (assetsViewMode) {
      case 'corporate': return Building2;
      case 'fun': return PartyPopper;
      case 'balanced': return Scale;
      default: return Sparkles;
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: chatHistory.length + 1,
      type: 'user',
      content: message
    };

    const newHistoryItem: PromptHistoryItem = {
      id: Date.now().toString(),
      prompt: message,
      timestamp: new Date(),
      category: 'Recent'
    };
    setPromptHistory(prev => [newHistoryItem, ...prev]);

    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    const loadingResponse: ChatMessage = {
      id: chatHistory.length + 2,
      type: 'assistant',
      content: '',
      isStreaming: false
    };
    setChatHistory(prev => [...prev, loadingResponse]);

    setTimeout(() => {
      setIsLoading(false);
      const assistantResponse: ChatMessage = {
        id: chatHistory.length + 2,
        type: 'assistant',
        content: "🎯 Great! I've analyzed your request and created cross-channel campaigns for Facebook, Instagram, TikTok, Google, and Email. Here are the optimized assets and copy I've generated for your campaign:",
        isStreaming: true,
        assets: [
          { 
            type: 'image', 
            url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=400&fit=crop', 
            id: '1',
            title: 'Facebook Ad Creative'
          },
          { 
            type: 'image', 
            url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop', 
            id: '2',
            title: 'Instagram Story'
          },
          { 
            type: 'video', 
            url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop', 
            id: '3',
            title: 'TikTok Video'
          },
          { 
            type: 'image', 
            url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=400&fit=crop', 
            id: '4',
            title: 'Google Display Ad'
          },
          { 
            type: 'image', 
            url: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=400&fit=crop', 
            id: '5',
            title: 'Email Header'
          },
        ]
      };
      setChatHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = assistantResponse;
        return newHistory;
      });
    }, 1500);
  };

  const handleApprove = (messageId: number) => {
    console.log(`Approved message ${messageId}`);
  };

  const handleRegenerate = (messageId: number) => {
    console.log(`Regenerating message ${messageId}`);
  };

  const handleApproveAsset = (assetId: string, messageId: number) => {
    console.log(`Approved asset ${assetId} from message ${messageId}`);
  };

  const handleRegenerateAsset = (assetId: string, messageId: number) => {
    console.log(`Regenerating asset ${assetId} from message ${messageId}`);
  };

  const quickPrompts = [
    { icon: Target, text: "Launch summer sale campaign", category: "Sales", color: "from-red-200 to-pink-300" },
    { icon: DollarSign, text: "Promote new product launch", category: "Product", color: "from-green-200 to-emerald-300" },
    { icon: Palette, text: "Brand awareness campaign", category: "Branding", color: "from-purple-200 to-indigo-300" },
    { icon: Sparkles, text: "Holiday promotion", category: "Seasonal", color: "from-yellow-200 to-orange-300" }
  ];

  const AssetGallery = ({ assets, messageId }: { assets: Array<{ type: 'image' | 'video'; url: string; id: string; title: string }>, messageId: number }) => (
    <TooltipProvider>
      <div className="mt-8 animate-fade-in">
        <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          Generated Campaign Assets
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {assets.map((asset, index) => {
            const shouldTruncate = asset.title.length > 15;
            const truncatedTitle = shouldTruncate ? `${asset.title.substring(0, 12)}...` : asset.title;
            
            return (
              <div 
                key={asset.id} 
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg border-2 border-white transition-shadow duration-300">
                    <img 
                      src={asset.url} 
                      alt={asset.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="mt-3 mb-3 h-6 flex items-center justify-center">
                    {shouldTruncate ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-sm font-semibold text-gray-700 text-center px-2 cursor-pointer truncate w-full hover:text-purple-600 transition-colors">
                            {truncatedTitle}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{asset.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <p className="text-sm font-semibold text-gray-700 text-center px-2 truncate w-full">
                        {asset.title}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApproveAsset(asset.id, messageId);
                      }}
                      className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border-2 border-white"
                      title="Approve Asset"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRegenerateAsset(asset.id, messageId);
                      }}
                      className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border-2 border-white"
                      title="Regenerate Asset"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );

  const PromptHistoryDrawer = () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="bg-white/80 backdrop-blur-sm border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 shadow-lg">
          <History className="w-4 h-4 text-purple-600" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh] bg-gradient-to-br from-purple-50 to-blue-50">
        <DrawerHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
          <DrawerTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Prompt History
          </DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {promptHistory.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-white/80 backdrop-blur-sm border border-purple-200 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-200 animate-fade-in relative z-10"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full font-medium">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {item.timestamp.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-900 font-medium mb-3">{item.prompt}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs bg-gradient-to-r from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 text-purple-700 border border-purple-200"
                  onClick={() => setMessage(item.prompt)}
                >
                  <Wand2 className="w-3 h-3 mr-1" />
                  Use Again
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Header - Updated to match Brand Voice gradient */}
      <div className="relative bg-gradient-to-r from-purple-50 to-blue-50 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-blue-200/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-purple-200/20 rounded-full blur-xl animate-pulse delay-500"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-200/15 rounded-full blur-lg animate-pulse delay-700"></div>
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #8b5cf6 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}></div>
        </div>

        {/* Header Content */}
        <div className="relative z-10 p-4 lg:p-6 pb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="animate-fade-in flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-purple-200/30 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-purple-300/30 shadow-lg">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2 drop-shadow-sm">
                  AI Chat Lab ✨
                </h1>
                <p className="text-gray-600 text-lg">
                  Describe your campaign goals and let AI create everything for you
                </p>
              </div>
            </div>
            {!isMobile && (
              <div className="animate-slide-in-right">
                <PromptHistoryDrawer />
              </div>
            )}
          </div>

          {/* Stats Cards - Updated to 2 cards and added toggle for Assets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="bg-white/60 backdrop-blur-sm border-purple-200/50 hover:bg-white/70 transition-all duration-300 hover:scale-105">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Campaigns Created</p>
                    <p className="text-gray-800 text-2xl font-bold">127</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-purple-200/50 hover:bg-white/70 transition-all duration-300 hover:scale-105">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="text-gray-600 text-sm">Assets Generated</p>
                      <p className="text-gray-800 text-2xl font-bold">{getAssetsCount().toLocaleString()}</p>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => {
                              const modes: ('corporate' | 'fun' | 'balanced')[] = ['corporate', 'balanced', 'fun'];
                              const currentIndex = modes.indexOf(assetsViewMode);
                              const nextIndex = (currentIndex + 1) % modes.length;
                              setAssetsViewMode(modes[nextIndex]);
                            }}
                            className="w-8 h-8 bg-purple-100 hover:bg-purple-200 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                          >
                            {React.createElement(getAssetsIcon(), { className: "w-4 h-4 text-purple-600" })}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Toggle view: {assetsViewMode}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Subtle Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/30 to-transparent"></div>
      </div>

      {/* Brand Voice Bar - Updated icon to Megaphone */}
      <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 shadow-sm border border-purple-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-purple-600" />
              Brand Voice
            </span>
            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-700">
              {brandVoice < 30 ? '🏢 Corporate' : brandVoice > 70 ? '🎉 Fun' : '⚖️ Balanced'}
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={brandVoice}
              onChange={(e) => setBrandVoice(Number(e.target.value))}
              className="w-full h-3 bg-purple-200 rounded-full appearance-none cursor-pointer slider hover:shadow-lg transition-shadow"
              style={{
                background: `linear-gradient(to right, #e2e8f0 0%, #c084fc ${brandVoice}%, #e2e8f0 ${brandVoice}%, #e2e8f0 100%)`
              }}
            />
            <div className="flex justify-between text-sm font-medium text-gray-600 mt-2">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Corporate
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                Fun
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col min-h-0">
        {/* Enhanced Main Chat Container */}
        <div className="flex-1 px-4 lg:px-6 pb-4 lg:pb-6 flex flex-col min-h-0 pt-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 flex flex-col animate-scale-in" style={{ minHeight: '60vh' }}>
            {/* Chat Messages Area */}
            <div className="flex-1 min-h-0 overflow-hidden" style={{ minHeight: '550px' }}>
              <ScrollArea className="h-full p-6 lg:p-8" ref={scrollAreaRef}>
                <div className="space-y-6 pb-6">
                  {chatHistory.map((chat, index) => (
                    <div
                      key={chat.id}
                      className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div
                        className={`max-w-xs lg:max-w-2xl px-6 py-4 rounded-2xl shadow-lg ${
                          chat.type === 'user'
                            ? 'bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white border-2 border-white hover:shadow-xl transition-shadow duration-300'
                            : 'bg-gradient-to-r from-gray-50 to-white text-gray-900 border-2 border-gray-200 hover:shadow-xl transition-shadow duration-300'
                        }`}
                      >
                        {chat.content && (
                          <div className="font-medium">
                            {chat.isStreaming ? (
                              <StreamingText text={chat.content} />
                            ) : (
                              chat.content
                            )}
                          </div>
                        )}
                        
                        {chat.type === 'assistant' && !chat.content && isLoading && (
                          <PlaceholderGallery />
                        )}
                        
                        {chat.assets && <AssetGallery assets={chat.assets} messageId={chat.id} />}
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="max-w-xs lg:max-w-2xl">
                        <LoadingSkeleton />
                      </div>
                    </div>
                  )}
                  
                  <div ref={chatEndRef} />
                </div>
              </ScrollArea>
            </div>

            {/* Enhanced Input Area */}
            <div className="p-6 lg:p-8 border-t border-gray-200/50 flex-shrink-0 bg-gradient-to-r from-white/50 to-gray-50/50 backdrop-blur-sm rounded-b-3xl">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  placeholder="Describe your campaign goals... ✨"
                  className="flex-1 px-6 py-4 rounded-2xl border-2 border-purple-200 focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-500 font-medium shadow-lg transition-all duration-200"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white px-6 py-4 rounded-2xl hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white shadow-lg"
                >
                  {isLoading ? (
                    <Zap className="w-5 h-5 animate-pulse" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
                {isMobile && <PromptHistoryDrawer />}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="px-4 lg:px-6 pb-4 lg:pb-6 flex-shrink-0 mt-6">
          {/* Enhanced Quick Prompts */}
          <div className="mb-6 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Quick Start Templates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickPrompts.map((prompt, index) => {
                const Icon = prompt.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setMessage(prompt.text)}
                    className={`flex items-center space-x-4 p-6 bg-gradient-to-r ${prompt.color} text-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 text-left border border-gray-200 animate-scale-in hover-scale`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-white/70 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-gray-800">{prompt.text}</p>
                      <p className="text-sm text-gray-600 font-medium">{prompt.category}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Enhanced AI Features */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 animate-scale-in">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-600" />
              What AI Does For You
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-110">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Generate Assets</h4>
                <p className="text-sm text-gray-600 font-medium">Creates optimized content for each platform with AI precision</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-110">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Smart Targeting</h4>
                <p className="text-sm text-gray-600 font-medium">Finds the best audiences automatically using advanced algorithms</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-110">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Budget Optimization</h4>
                <p className="text-sm text-gray-600 font-medium">Redistributes budget to top performers in real-time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLab;
