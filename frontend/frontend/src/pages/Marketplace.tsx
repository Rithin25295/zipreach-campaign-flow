
import React, { useState } from 'react';
import { Search, Filter, Store, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import MarketplaceTileGrid from '@/components/MarketplaceTileGrid';
import { useConfetti } from '@/hooks/useConfetti';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { triggerConfetti } = useConfetti();

  const categories = ['all', 'templates', 'assets', 'integrations', 'tools'];

  const marketplaceItems = [
    {
      id: 1,
      name: 'E-commerce Campaign Bundle',
      description: 'Complete campaign templates for online stores',
      price: 'Free',
      rating: 4.8,
      downloads: 1243,
      category: 'templates',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      tags: ['E-commerce', 'Templates', 'Multi-channel']
    },
    {
      id: 2,
      name: 'Social Media Asset Pack',
      description: 'Ready-to-use graphics for social platforms',
      price: '$29',
      rating: 4.9,
      downloads: 892,
      category: 'assets',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400',
      tags: ['Graphics', 'Social Media', 'Design']
    },
    {
      id: 3,
      name: 'Zapier Integration',
      description: 'Connect ZipReach with 3000+ apps',
      price: 'Free',
      rating: 4.7,
      downloads: 2156,
      category: 'integrations',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      tags: ['Integration', 'Automation', 'Workflow']
    },
    {
      id: 4,
      name: 'Restaurant Marketing Kit',
      description: 'Templates designed for food businesses',
      price: '$19',
      rating: 4.6,
      downloads: 567,
      category: 'templates',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
      tags: ['Restaurant', 'Food', 'Local Business']
    },
    {
      id: 5,
      name: 'A/B Testing Tool',
      description: 'Advanced campaign testing features',
      price: '$49',
      rating: 4.5,
      downloads: 334,
      category: 'tools',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      tags: ['Testing', 'Analytics', 'Optimization']
    },
    {
      id: 6,
      name: 'Holiday Campaign Templates',
      description: 'Seasonal campaigns for all major holidays',
      price: '$39',
      rating: 4.8,
      downloads: 721,
      category: 'templates',
      image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400',
      tags: ['Seasonal', 'Holidays', 'Templates']
    }
  ];

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToWorkspace = (item) => {
    triggerConfetti();
    console.log('Added to workspace:', item.name);
    // Here you would typically handle the actual add to workspace logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="p-3 bg-purple-200/30 rounded-xl shadow-lg border border-purple-300/30">
                <Store className="w-8 h-8 text-purple-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                Marketplace
              </h1>
              <p className="text-gray-600 text-lg">
                Discover templates, assets, and integrations to supercharge your campaigns
              </p>
            </div>
          </div>
        </div>

        {/* Featured Carousel */}
        <FeaturedCarousel />

        {/* Search and Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 mb-8 transform transition-all duration-300 hover:shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1 max-w-md group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
              <Input
                type="text"
                placeholder="Search marketplace..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <Select
                value={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value)}
              >
                <SelectTrigger className="w-[180px] capitalize border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-200">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white backdrop-blur-sm border border-gray-100 shadow-lg animate-fade-in">
                  {categories.map(category => (
                    <SelectItem key={category} value={category} className="capitalize">
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white/80 backdrop-blur-sm transition-all duration-200">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-lg rounded-lg border border-gray-100 p-2 animate-scale-in">
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md transition-colors duration-150">
                    Most Popular
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md transition-colors duration-150">
                    Newest First
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md transition-colors duration-150">
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md transition-colors duration-150">
                    Price: High to Low
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md transition-colors duration-150">
                    Highest Rated
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <MarketplaceTileGrid items={filteredItems} onAddToWorkspace={handleAddToWorkspace} />

        {/* Featured Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 mt-8 transform transition-all duration-300 hover:shadow-xl animate-fade-in">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Featured This Week</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <h4 className="font-semibold mb-2">New: AI Asset Generator</h4>
              <p className="text-sm opacity-90 mb-4">Create unlimited custom assets with AI</p>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                Learn More
              </button>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <h4 className="font-semibold mb-2">Free Template Pack</h4>
              <p className="text-sm opacity-90 mb-4">50+ high-converting templates</p>
              <button className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                Download
              </button>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <h4 className="font-semibold mb-2">Pro Analytics</h4>
              <p className="text-sm opacity-90 mb-4">Advanced reporting and insights</p>
              <button className="bg-white text-orange-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
