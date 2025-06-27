
import React from 'react';
import { Play, Eye, TrendingUp, TrendingDown } from 'lucide-react';
import FormattedMetric from '@/components/FormattedMetric';

interface AssetCardProps {
  id: string;
  channel: string;
  thumbnail: string;
  cta: string;
  cpa: number;
  type: 'video' | 'image' | 'carousel' | 'search' | 'newsletter';
  status: 'performing' | 'average' | 'underperforming';
  title: string;
}

const AssetCard = ({ channel, thumbnail, cta, cpa, type, status, title }: AssetCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'performing': return 'bg-green-100 text-green-800 border-green-200';
      case 'average': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'underperforming': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'tiktok': return 'bg-black text-white';
      case 'instagram': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'facebook': return 'bg-blue-600 text-white';
      case 'google': return 'bg-blue-500 text-white';
      case 'email': return 'bg-gray-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'image': return <Eye className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getChannelColor(channel)}`}>
            {channel}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
        {type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/50 rounded-full p-3">
              <Play className="w-6 h-6 text-white" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-sm truncate">{title}</h3>
          {getTypeIcon(type)}
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-600">CTA: {cta}</span>
          <div className="flex items-center space-x-1">
            {status === 'performing' ? (
              <TrendingUp className="w-3 h-3 text-green-500" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-500" />
            )}
            <span className="text-xs font-medium text-gray-700">
              <FormattedMetric type="CPA" value={cpa} className="text-xs" />
            </span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs py-2 px-3 rounded-lg hover:shadow-lg transition-all duration-200">
            Edit
          </button>
          <button className="flex-1 border border-gray-200 text-gray-700 text-xs py-2 px-3 rounded-lg hover:bg-gray-50 transition-all duration-200">
            Duplicate
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
