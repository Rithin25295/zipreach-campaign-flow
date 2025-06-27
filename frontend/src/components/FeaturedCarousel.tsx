
import React from 'react';
import { Star, Users, TrendingUp } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const FeaturedCarousel = () => {
  const featuredItems = [
    {
      id: 1,
      type: 'template',
      title: 'Social Media Mastery Pack',
      creator: 'Digital Studio Pro',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600',
      rating: 4.9,
      downloads: 2340,
      price: '$49'
    },
    {
      id: 2,
      type: 'creator',
      title: 'Sarah Johnson',
      specialty: 'E-commerce Expert',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c27bb19c?w=600',
      coverImage: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600',
      matchPercentage: 95,
      campaigns: 127,
      followers: '12.5K'
    },
    {
      id: 3,
      type: 'template',
      title: 'Holiday Campaign Bundle',
      creator: 'Festive Designs Co',
      image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600',
      rating: 4.8,
      downloads: 1890,
      price: '$39'
    },
    {
      id: 4,
      type: 'creator',
      title: 'Marcus Chen',
      specialty: 'Tech Influencer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
      coverImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600',
      matchPercentage: 88,
      campaigns: 89,
      followers: '8.3K'
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Templates & Creators</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {featuredItems.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                {item.type === 'creator' && item.coverImage && (
                  <div className="h-24 w-full">
                    <img
                      src={item.coverImage}
                      alt={`${item.title} cover`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className={`${item.type === 'creator' ? 'relative pt-12 pb-2' : ''}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`${item.type === 'template' ? 'w-full h-48 object-cover' : 'h-24 w-24 rounded-full object-cover mx-auto -mt-12 border-4 border-white shadow-md absolute top-0 left-0 right-0 z-10'}`}
                  />
                </div>
                <div className={`p-6 ${item.type === 'creator' ? 'mt-0' : ''}`}>
                  {item.type === 'template' ? (
                    <>
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">by {item.creator}</p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm">{item.downloads}</span>
                          </div>
                        </div>
                        <span className="text-xl font-bold text-gray-900">{item.price}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold text-gray-900 text-lg mb-2 text-center">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 text-center">{item.specialty}</p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            <span className="text-sm font-medium text-green-600">{item.matchPercentage}% match</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">{item.followers}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium">
                    Add to Workspace
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default FeaturedCarousel;
