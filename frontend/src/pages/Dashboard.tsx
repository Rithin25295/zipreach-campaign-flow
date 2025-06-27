
import React from 'react';
import { BarChart, Calendar, MessageSquare, Settings, Users, Store, Cable, DollarSign, ShoppingCart, ShieldCheck, TrendingUp, Play, ArrowUpRight, ArrowDownRight, Bell, Clock } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import KPIHeader from '@/components/KPIHeader';
import EmojiTrafficLight from '@/components/EmojiTrafficLight';
import FormattedMetric from '@/components/FormattedMetric';

// Sample data for charts
const spendRoasData = [
  { day: 'Mon', spend: 120, roas: 3.2 },
  { day: 'Tue', spend: 135, roas: 3.8 },
  { day: 'Wed', spend: 98, roas: 4.1 },
  { day: 'Thu', spend: 156, roas: 2.9 },
  { day: 'Fri', spend: 142, roas: 3.5 },
  { day: 'Sat', spend: 167, roas: 3.7 },
  { day: 'Sun', spend: 134, roas: 4.2 },
];

const cpaData = [
  { day: 1, cpa: 12.5 },
  { day: 2, cpa: 11.8 },
  { day: 3, cpa: 13.2 },
  { day: 4, cpa: 10.9 },
  { day: 5, cpa: 12.1 },
  { day: 6, cpa: 11.3 },
  { day: 7, cpa: 10.7 },
];

const topAsset = {
  id: '1',
  name: 'Summer Cake Collection Video',
  type: 'video',
  thumbnail: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=450&fit=crop&crop=center',
  views: 15420,
  clicks: 892,
  conversions: 54,
  ctr: 5.8,
  conversionRate: 6.1
};

// Brand Icons Components with improved visibility
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
    <path d="M82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78C38.61,71.62,31.06,99.34,31.06,126c0,11,2.41,19.41,5.56,24.51L10.14,167.91C3.34,156.6,0,141.76,0,124.85,0,94.1,8.44,62.05,24.49,37.3,38.73,15.35,59.28,0,82.85,0Z" fill="url(#linear-gradient-2)"/>
  </svg>
);

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 248.31 226.88" fill="none">
    <path d="M84.5,28.57c2.4-6.3,5.7-12.1,10.6-16.8c19.6-19.1,52-14.3,65.3,9.7c10,18.2,20.6,36,30.9,54c17.2,29.9,34.6,59.8,51.6,89.8c14.3,25.1-1.2,56.8-29.6,61.1c-17.4,2.6-33.7-5.4-42.7-21c-15.1-26.3-30.3-52.6-45.4-78.8c-0.3-0.6-0.7-1.1-1.1-1.6c-1.6-1.3-2.3-3.2-3.3-4.9c-6.7-11.8-13.6-23.5-20.3-35.2c-4.3-7.6-8.8-15.1-13.1-22.7c-3.9-6.8-5.7-14.2-5.5-22C82.2,36.17,82.7,32.17,84.5,28.57" fill="#3C8BD9"/>
    <path d="M84.5,28.57c-0.9,3.6-1.7,7.2-1.9,11c-0.3,8.4,1.8,16.2,6,23.5c11,18.9,22,37.9,32.9,56.9c1,1.7,1.8,3.4,2.8,5c-6,10.4-12,20.7-18.1,31.1c-8.4,14.5-16.8,29.1-25.3,43.6c-0.4,0-0.5-0.2-0.6-0.5c-0.1-0.8,0.2-1.5,0.4-2.3c4.1-15,0.7-28.3-9.6-39.7c-6.3-6.9-14.3-10.8-23.5-12.1c-12-1.7-22.6,1.4-32.1,8.9c-1.7,1.3-2.8,3.2-4.8,4.2c-0.4,0-0.6-0.2-0.7-0.5c4.8-8.3,9.5-16.6,14.3-24.9c19.8-34.4,39.6-68.8,59.5-103.1C84,29.27,84.3,28.97,84.5,28.57" fill="#FABC04"/>
    <path d="M10.4,157.97c1.9-1.7,3.7-3.5,5.7-5.1c24.3-19.2,60.8-5.3,66.1,25.1c1.3,7.3,0.6,14.3-1.6,21.3c-0.1,0.6-0.2,1.1-0.4,1.7c-0.9,1.6-1.7,3.3-2.7,4.9c-8.9,14.7-22,22-39.2,20.9c-19.7-1.4-35.2-16.2-37.9-35.8c-1.3-9.5,0.6-18.4,5.5-26.6c1-1.8,2.2-3.4,3.3-5.2C9.7,158.77,9.5,157.97,10.4,157.97" fill="#34A852"/>
    <path d="M80.2,200.97c-0.4-0.7,0-1.2,0.4-1.7c0.1,0.1,0.3,0.3,0.4,0.4L80.2,200.97" fill="#E1C025"/>
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1000 1000" fill="none">
    <defs>
      <linearGradient id="tiktokGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff0050"/>
        <stop offset="100%" stopColor="#000000"/>
      </linearGradient>
      <linearGradient id="tiktokGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00f2ea"/>
        <stop offset="100%" stopColor="#ff0050"/>
      </linearGradient>
    </defs>
    <path d="M217 0h566c120 0 217 97 217 217v566c0 120-97 217-217 217H217C97 1000 0 903 0 783V217C0 97 97 0 217 0z" fill="#1a1a1a"/>
    <path d="M600 212c1 8 2 17 4 25l19 1c4 30 12 57 25 80 22 20 50 33 85 35v28c6 1 13 2 20 3v89c-45 4-84-10-129-38l7 153c0 49 0 72-26 117-62 106-175 110-247 55-37-13-69-37-90-71-60-98-6-257 167-273l0 24v6c9-2 19-3 29-4v94c-37 6-61 18-72 39-22 43-12 80 11 103 49 8 103-25 95-130V212h95z" fill="url(#tiktokGradient1)"/>
    <path d="M505 212c9 79 57 135 134 140v75l0 0v-64c-35-2-63-15-85-35-13-23-21-50-25-80l-19-1c-2-8-3-17-4-25l0-10h-1z" fill="#ff0050"/>
    <path d="M505 212v10c1 8 2 17 4 25l19 1c4 30 12 57 25 80 22 20 50 33 85 35v64c-45 4-84-10-129-38l7 153c0 49 0 72-26 117-62 106-175 110-247 55 93 53 255 11 255-127v-167c45 28 84 42 129 38v-89c-7-1-14-2-20-3v-28c-35-2-63-15-85-35-13-23-21-50-25-80l-19-1c-2-8-3-17-4-25v-10h55z" fill="url(#tiktokGradient2)"/>
  </svg>
);

const channelPerformance = [
  { 
    name: 'Meta', 
    icon: MetaIcon, 
    roas: 4.2, 
    delta: 0.3, 
    trend: 'up',
    color: 'bg-blue-50 border-blue-200 text-blue-700'
  },
  { 
    name: 'Google', 
    icon: GoogleIcon, 
    roas: 3.8, 
    delta: -0.2, 
    trend: 'down',
    color: 'bg-green-50 border-green-200 text-green-700'
  },
  { 
    name: 'TikTok', 
    icon: TikTokIcon, 
    roas: 3.1, 
    delta: 0.5, 
    trend: 'up',
    color: 'bg-purple-50 border-purple-200 text-purple-700'
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  
  // Check if there's campaign data
  const hasCampaignData = true; // Set to false to see empty state

  // Get current date and time
  const now = new Date();
  const currentDate = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const currentTime = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  if (!hasCampaignData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="p-6">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Launch a campaign to see metrics here
              </h2>
              <p className="text-gray-600 mb-6">
                Start your first campaign to view performance data and insights.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Create Campaign
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="p-6 space-y-6">
        {/* Page Header with Enhanced Typography */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-indigo-600/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-md opacity-30 animate-pulse"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">Z</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-extrabold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent leading-tight tracking-tight">
                    Zippy Board
                  </h1>
                  <p className="text-lg text-gray-600 font-medium mt-1">
                    Track your performance and manage your campaigns
                  </p>
                </div>
              </div>

              {/* Right side information panel with reduced size */}
              <div className="flex items-center space-x-4">
                {/* Enhanced Date and Time Card - smaller */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl p-3 border border-indigo-200/60 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-indigo-500 rounded-lg shadow-md">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-indigo-900">{currentTime}</div>
                      <div className="text-xs text-indigo-600 font-medium">{currentDate}</div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Active Campaigns Card - smaller */}
                <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-3 border border-emerald-200/60 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105 group">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <div className="p-1.5 bg-emerald-500 rounded-lg shadow-md group-hover:bg-emerald-600 transition-colors duration-300">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-md font-bold text-emerald-900">3 Active</div>
                      <div className="text-xs text-emerald-600 font-medium">Campaigns Running</div>
                      <div className="text-xs text-emerald-500">Last updated 2m ago</div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Notifications Card - smaller */}
                <div className="relative bg-gradient-to-br from-red-50 to-pink-100 rounded-xl p-3 border border-red-200/60 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105 group cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <div className="p-1.5 bg-red-500 rounded-lg shadow-md group-hover:bg-red-600 transition-colors duration-300">
                        <Bell className="w-4 h-4 text-white" />
                      </div>
                      {/* Enhanced notification badge - smaller */}
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                        <span className="text-xs text-white font-bold">2</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-md font-bold text-red-900">2 New</div>
                      <div className="text-xs text-red-600 font-medium">Notifications</div>
                      <div className="text-xs text-red-500">Campaign alerts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Channel Performance Mini-Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {channelPerformance.map((channel) => {
            const IconComponent = channel.icon;
            return (
              <Card key={channel.name} className={`bg-white/80 backdrop-blur-md border-white/30 ${channel.color} transition-all duration-500 hover:shadow-2xl hover:scale-110 hover:bg-white/90 cursor-pointer group hover:-translate-y-2`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-white/60 group-hover:bg-white/80 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <span className="font-bold text-lg group-hover:text-gray-900 transition-colors duration-300">{channel.name}</span>
                    </div>
                    <div className="group-hover:scale-125 transition-transform duration-300">
                      <EmojiTrafficLight 
                        status={channel.roas >= 3.5 ? 'green' : channel.roas >= 2.5 ? 'yellow' : 'red'} 
                        size="sm" 
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="group-hover:scale-105 transition-transform duration-300">
                      <div className="text-3xl font-bold group-hover:text-gray-900 transition-colors duration-300">
                        <FormattedMetric type="ROAS" value={channel.roas} />
                      </div>
                      <div className="text-sm text-gray-600 font-medium">ROAS</div>
                    </div>
                    <div className={`flex items-center gap-1 transition-all duration-500 group-hover:scale-125 ${
                      channel.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {channel.trend === 'up' ? (
                        <ArrowUpRight className="w-5 h-5 group-hover:animate-bounce" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 group-hover:animate-bounce" />
                      )}
                      <span className="text-sm font-bold">
                        {channel.trend === 'up' ? '+' : ''}{channel.delta}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* KPI Header with Traffic Lights */}
        <KPIHeader 
          roas={3.8}
          spend={845}
          sales={3206}
          trafficLight="green"
        />

        {/* Two-Column Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Top Asset Card */}
          <Card className="bg-white/80 backdrop-blur-md border-white/30 transition-all duration-500 hover:shadow-2xl hover:bg-white/90 hover:scale-[1.03] group hover:-translate-y-1">
            <CardHeader className="group-hover:bg-gradient-to-r group-hover:from-purple-50/50 group-hover:to-blue-50/50 transition-all duration-500 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl group-hover:text-gray-900 transition-colors duration-300">
                <span className="text-2xl group-hover:animate-bounce">🏆</span>
                <span className="group-hover:scale-105 transition-transform duration-300">Top Performing Asset</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Video Player */}
              <div className="relative rounded-xl overflow-hidden bg-gray-900 aspect-video transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02]">
                <img 
                  src={topAsset.thumbnail} 
                  alt={topAsset.name}
                  className="w-full h-full object-cover opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button 
                    size="lg" 
                    className="rounded-full w-16 h-16 bg-white/20 hover:bg-white/40 backdrop-blur-sm border-white/30 transition-all duration-500 hover:scale-125 hover:rotate-12 group-hover:animate-pulse"
                  >
                    <Play className="w-8 h-8 text-white" />
                  </Button>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/50 text-white px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm border border-white/20 group-hover:bg-black/70 transition-all duration-300">
                  {topAsset.type.toUpperCase()}
                </div>
              </div>

              {/* Asset Info */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-800 transition-colors duration-300">{topAsset.name}</h3>
                
                {/* CTA Stats */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                      <span className="text-sm text-gray-600 font-medium">Views</span>
                      <span className="font-bold text-gray-900">{topAsset.views.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                      <span className="text-sm text-gray-600 font-medium">Clicks</span>
                      <span className="font-bold text-gray-900">{topAsset.clicks.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg hover:bg-green-50 transition-colors duration-300">
                      <span className="text-sm text-gray-600 font-medium">CTR</span>
                      <span className="font-bold text-green-600">
                        <FormattedMetric 
                          type="CTR" 
                          value={topAsset.ctr} 
                          extra={{ clicks: topAsset.clicks, views: topAsset.views }} 
                        />
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                      <span className="text-sm text-gray-600 font-medium">Conversions</span>
                      <span className="font-bold text-gray-900">{topAsset.conversions}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                      <span className="text-sm text-gray-600 font-medium">Conv. Rate</span>
                      <span className="font-bold text-blue-600">
                        <FormattedMetric 
                          type="ConversionRate" 
                          value={topAsset.conversionRate} 
                          extra={{ conversions: topAsset.conversions, clicks: topAsset.clicks }} 
                        />
                      </span>
                    </div>
                    <div className="pt-2">
                      <Button size="sm" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-500 hover:scale-105 hover:shadow-lg font-semibold">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Charts */}
          <div className="space-y-6">
            {/* Spend vs ROAS Chart */}
            <Card className="bg-white/80 backdrop-blur-md border-white/30 transition-all duration-500 hover:shadow-2xl hover:bg-white/90 hover:scale-[1.03] group hover:-translate-y-1">
              <CardHeader className="group-hover:bg-gradient-to-r group-hover:from-blue-50/50 group-hover:to-green-50/50 transition-all duration-500 rounded-t-lg">
                <CardTitle className="text-lg group-hover:text-gray-900 group-hover:scale-105 transition-all duration-300">Spend vs ROAS (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent className="group-hover:scale-[1.02] transition-transform duration-500">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={spendRoasData}>
                    <defs>
                      <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="roasGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="spend" 
                      stroke="#3b82f6" 
                      fill="url(#spendGradient)" 
                      strokeWidth={3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="roas" 
                      stroke="#10b981" 
                      fill="url(#roasGradient)" 
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex justify-between text-sm text-gray-600 mt-3">
                  <div className="flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-3 h-3 bg-blue-500 rounded shadow-sm"></div>
                    <span className="font-medium">Spend ($)</span>
                  </div>
                  <div className="flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-3 h-3 bg-green-500 rounded shadow-sm"></div>
                    <span className="font-medium">ROAS (x)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CPA Trend Sparkline */}
            <Card className="bg-white/80 backdrop-blur-md border-white/30 transition-all duration-500 hover:shadow-2xl hover:bg-white/90 hover:scale-[1.03] group hover:-translate-y-1">
              <CardHeader className="group-hover:bg-gradient-to-r group-hover:from-emerald-50/50 group-hover:to-teal-50/50 transition-all duration-500 rounded-t-lg">
                <CardTitle className="text-lg group-hover:text-gray-900 group-hover:scale-105 transition-all duration-300">CPA Trend</CardTitle>
              </CardHeader>
              <CardContent className="group-hover:scale-[1.02] transition-transform duration-500">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-300">
                    <FormattedMetric type="CPA" value={10.70} />
                  </span>
                  <div className="flex items-center text-green-600 group-hover:scale-110 transition-transform duration-300">
                    <ArrowDownRight className="w-4 h-4 group-hover:animate-bounce" />
                    <span className="text-sm font-bold">-15%</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={60}>
                  <LineChart data={cpaData}>
                    <Line 
                      type="monotone" 
                      dataKey="cpa" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
