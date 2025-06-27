
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import FormattedMetric from '@/components/FormattedMetric';

interface KPIHeaderProps {
  roas: number;
  spend: number;
  sales: number;
  trafficLight: 'green' | 'yellow' | 'red';
}

const KPIHeader = ({ roas, spend, sales, trafficLight }: KPIHeaderProps) => {
  const getTrafficLightEmoji = (color: string) => {
    switch (color) {
      case 'green': return '🟢';
      case 'yellow': return '🟡';
      case 'red': return '🔴';
      default: return '⚪';
    }
  };

  const getTrendIcon = (value: number, threshold: number) => {
    if (value > threshold) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (value < threshold * 0.8) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-yellow-500" />;
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 transition-all duration-300 hover:shadow-xl hover:bg-white/80 hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-bold text-gray-900">Campaign Performance</h2>
          <div className="flex items-center space-x-2">
            <span className="text-xl">{getTrafficLightEmoji(trafficLight)}</span>
            <span className="text-sm font-medium text-gray-600 capitalize">{trafficLight}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-4 border border-green-200 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:from-green-100 hover:to-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Return on Ad Spend</p>
              <p className="text-3xl font-bold text-green-900">
                <FormattedMetric type="ROAS" value={roas} />
              </p>
            </div>
            {getTrendIcon(roas, 3.0)}
          </div>
          <p className="text-xs text-green-700 mt-2">
            {roas >= 3.0 ? 'Excellent performance' : roas >= 2.0 ? 'Good performance' : 'Needs improvement'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl p-4 border border-blue-200 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:from-blue-100 hover:to-cyan-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Total Spend</p>
              <p className="text-3xl font-bold text-blue-900">
                <FormattedMetric type="Spend" value={spend} />
              </p>
            </div>
            {getTrendIcon(spend, 100)}
          </div>
          <p className="text-xs text-blue-700 mt-2">
            {spend <= 100 ? 'Within budget' : 'Over budget'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl p-4 border border-purple-200 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:from-purple-100 hover:to-violet-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-800">Total Sales</p>
              <p className="text-3xl font-bold text-purple-900">
                <FormattedMetric type="Sales" value={sales} extra={{ buyers: Math.floor(sales / 59.4) }} />
              </p>
            </div>
            {getTrendIcon(sales, 200)}
          </div>
          <p className="text-xs text-purple-700 mt-2">
            Revenue: ${(sales - spend).toFixed(0)} profit
          </p>
        </div>
      </div>
    </div>
  );
};

export default KPIHeader;
