
import React, { useState } from 'react';
import { Plus, Upload, Archive, Copy, Send, Filter, X, Rocket, PaintBucket, Palette, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import AssetCard from '@/components/AssetCard';
import FormattedMetric from '@/components/FormattedMetric';

const Studio = () => {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState({
    channel: 'all',
    status: 'all',
    type: 'all'
  });
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Sample asset data
  const assets = [
    {
      id: '1',
      title: 'Summer Campaign Hero',
      channel: 'instagram',
      thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=600&fit=crop',
      cta: 'Shop Now',
      cpa: 2.45,
      type: 'image' as const,
      status: 'performing' as const
    },
    {
      id: '2',
      title: 'Product Demo Video',
      channel: 'tiktok',
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      cta: 'Learn More',
      cpa: 1.89,
      type: 'video' as const,
      status: 'average' as const
    },
    {
      id: '3',
      title: 'Holiday Promotion',
      channel: 'facebook',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=500&fit=crop',
      cta: 'Get Discount',
      cpa: 3.21,
      type: 'carousel' as const,
      status: 'underperforming' as const
    },
    {
      id: '4',
      title: 'Brand Story',
      channel: 'google',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop',
      cta: 'Discover',
      cpa: 1.67,
      type: 'search' as const,
      status: 'performing' as const
    },
    {
      id: '5',
      title: 'Newsletter Template',
      channel: 'email',
      thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=350&fit=crop',
      cta: 'Subscribe',
      cpa: 0.89,
      type: 'newsletter' as const,
      status: 'performing' as const
    },
    {
      id: '6',
      title: 'Mobile App Promo',
      channel: 'instagram',
      thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=550&fit=crop',
      cta: 'Download',
      cpa: 2.33,
      type: 'video' as const,
      status: 'average' as const
    }
  ];

  const filterOptions = {
    channel: ['all', 'instagram', 'tiktok', 'facebook', 'google', 'email'],
    status: ['all', 'performing', 'average', 'underperforming'],
    type: ['all', 'image', 'video', 'carousel', 'search', 'newsletter']
  };

  const filteredAssets = assets.filter(asset => {
    return (activeFilters.channel === 'all' || asset.channel === activeFilters.channel) &&
           (activeFilters.status === 'all' || asset.status === activeFilters.status) &&
           (activeFilters.type === 'all' || asset.type === activeFilters.type);
  });

  const toggleAssetSelection = (assetId: string) => {
    setSelectedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const selectAllAssets = () => {
    setSelectedAssets(filteredAssets.map(asset => asset.id));
  };

  const clearSelection = () => {
    setSelectedAssets([]);
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
          <PaintBucket className="w-16 h-16 text-purple-400" />
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center animate-pulse">
            <Rocket className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Creative Canvas Awaits</h3>
      <p className="text-gray-600 text-center max-w-md mb-6">
        Start building amazing campaigns by uploading your first assets. Mix, remix, and create something extraordinary!
      </p>
      <Button 
        onClick={() => setIsUploadModalOpen(true)}
        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Upload className="w-4 h-4 mr-2" />
        Upload Your First Asset
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Updated to match Brand Voice gradient */}
      <div className="relative bg-gradient-to-r from-purple-50 to-blue-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-blue-200/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-purple-200/20 rounded-full blur-xl animate-pulse delay-500"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-200/15 rounded-full blur-lg animate-pulse delay-700"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #8b5cf6 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}></div>
        </div>

        {/* Header Content */}
        <div className="relative z-10 p-8 pb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-purple-200/30 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-purple-300/30 shadow-lg">
                  <Palette className="w-8 h-8 text-purple-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2 drop-shadow-sm">
                  Asset Studio ✨
                </h1>
                <p className="text-gray-600 text-lg">
                  Create, manage, and remix your creative assets with AI-powered tools
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-white/60 backdrop-blur-sm border-purple-200/50 hover:bg-white/70 transition-all duration-300 hover:scale-105">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Assets</p>
                    <p className="text-gray-800 text-2xl font-bold">{assets.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl flex items-center justify-center">
                    <Archive className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-purple-200/50 hover:bg-white/70 transition-all duration-300 hover:scale-105">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Performing</p>
                    <p className="text-gray-800 text-2xl font-bold">{assets.filter(a => a.status === 'performing').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-purple-200/50 hover:bg-white/70 transition-all duration-300 hover:scale-105">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Avg. CPA</p>
                    <p className="text-gray-800 text-2xl font-bold">
                      <FormattedMetric 
                        type="CPA" 
                        value={assets.reduce((sum, a) => sum + a.cpa, 0) / assets.length}
                      />
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/30 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="p-8 relative z-10">
        {/* Filter Chips */}
        <div className="flex flex-wrap gap-4 mb-6">
          {Object.entries(filterOptions).map(([filterType, options]) => (
            <div key={filterType} className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 capitalize">{filterType}:</span>
              <div className="flex space-x-1">
                {options.map(option => (
                  <button
                    key={option}
                    onClick={() => setActiveFilters(prev => ({ ...prev, [filterType]: option }))}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      activeFilters[filterType as keyof typeof activeFilters] === option
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-white text-gray-600 hover:bg-gray-50 hover:shadow-sm border border-gray-200'
                    }`}
                  >
                    {option === 'all' ? 'All' : option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bulk Selection Toolbar */}
        {selectedAssets.length > 0 && (
          <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-200 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  {selectedAssets.length} asset{selectedAssets.length !== 1 ? 's' : ''} selected
                </span>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={selectAllAssets}
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearSelection}
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    Clear
                  </Button>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-red-50 hover:text-red-600 hover:scale-105 transition-all duration-200"
                >
                  <Archive className="w-4 h-4 mr-1" />
                  Archive
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-blue-50 hover:text-blue-600 hover:scale-105 transition-all duration-200"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Duplicate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-green-50 hover:text-green-600 hover:scale-105 transition-all duration-200"
                >
                  <Send className="w-4 h-4 mr-1" />
                  Push Now
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Asset Grid or Empty State */}
        {filteredAssets.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className={`break-inside-avoid relative group ${
                  selectedAssets.includes(asset.id) ? 'ring-2 ring-blue-400 ring-offset-2' : ''
                }`}
                onClick={() => toggleAssetSelection(asset.id)}
              >
                <div className="cursor-pointer">
                  <AssetCard {...asset} />
                </div>
                {selectedAssets.includes(asset.id) && (
                  <div className="absolute top-2 left-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-scale-in">
                    <X className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAB Upload Button */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
            size="icon"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Upload to Remix
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors duration-200">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag & drop your files here</p>
              <p className="text-sm text-gray-500">or click to browse</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Remix Prompt
              </label>
              <textarea
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Describe how you'd like to remix this asset..."
              />
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsUploadModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsUploadModalOpen(false)}
              >
                Upload & Remix
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Studio;
