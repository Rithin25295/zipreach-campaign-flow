
import React from 'react';

interface HeatMapGridProps {
  metrics: Array<{
    date: string;
    channel: string;
    spend: number;
    sales: number;
    impressions: number;
    clicks: number;
  }>;
}

const HeatMapGrid = ({ metrics }: HeatMapGridProps) => {
  const channels = ['tiktok', 'instagram', 'facebook', 'google', 'email'];
  const dates = [...new Set(metrics.map(m => m.date))].sort();

  const getIntensity = (channel: string, date: string) => {
    const metric = metrics.find(m => m.channel === channel && m.date === date);
    if (!metric) return 0;
    
    const roas = metric.sales / metric.spend;
    if (roas >= 4) return 4;
    if (roas >= 3) return 3;
    if (roas >= 2) return 2;
    if (roas >= 1) return 1;
    return 0;
  };

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 4: return 'bg-green-500';
      case 3: return 'bg-green-400';
      case 2: return 'bg-yellow-400';
      case 1: return 'bg-red-400';
      default: return 'bg-gray-200';
    }
  };

  const getChannelEmoji = (channel: string) => {
    switch (channel) {
      case 'tiktok': return '🎵';
      case 'instagram': return '📸';
      case 'facebook': return '👥';
      case 'google': return '🔍';
      case 'email': return '📧';
      default: return '📱';
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Performance Heatmap</h3>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>High ROAS</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded"></div>
            <span>Medium ROAS</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded"></div>
            <span>Low ROAS</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-1 gap-2">
          {channels.map((channel) => (
            <div key={channel} className="flex items-center space-x-4">
              <div className="w-20 flex items-center space-x-2">
                <span className="text-lg">{getChannelEmoji(channel)}</span>
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {channel}
                </span>
              </div>
              <div className="flex space-x-1">
                {dates.map((date) => {
                  const intensity = getIntensity(channel, date);
                  const metric = metrics.find(m => m.channel === channel && m.date === date);
                  const roas = metric ? (metric.sales / metric.spend).toFixed(1) : '0.0';
                  
                  return (
                    <div
                      key={`${channel}-${date}`}
                      className={`w-12 h-8 rounded flex items-center justify-center ${getIntensityColor(intensity)} transition-all duration-200 hover:scale-110 cursor-pointer`}
                      title={`${channel} - ${date}: ${roas}x ROAS`}
                    >
                      <span className="text-xs font-bold text-white">
                        {roas}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeatMapGrid;
