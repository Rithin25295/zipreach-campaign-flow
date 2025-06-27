import React, { useState } from 'react';
import HeatMapGrid from '@/components/HeatMapGrid';
import EmojiTrafficLight from '@/components/EmojiTrafficLight';
import FormattedMetric from '@/components/FormattedMetric';
import { TrendingUp, DollarSign, Eye, BarChart2, Sparkles, Trophy, FileDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import metricsData from '@/data/metrics.json';
import campaignsData from '@/data/campaigns.json';
import assetsData from '@/data/assets.json';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Process data for charts
  const chartData = metricsData.reduce((acc: any[], metric) => {
    const existingDate = acc.find(item => item.date === metric.date);
    if (existingDate) {
      existingDate[metric.channel] = metric.sales;
      existingDate[`${metric.channel}_spend`] = metric.spend;
      existingDate.spend = (existingDate.spend || 0) + metric.spend;
      existingDate.roas = (existingDate.sales || 0) / existingDate.spend;
    } else {
      const spend = metric.spend;
      const sales = metric.sales;
      acc.push({
        date: metric.date,
        [metric.channel]: sales,
        [`${metric.channel}_spend`]: spend,
        spend: spend,
        sales: sales,
        roas: sales / spend
      });
    }
    return acc;
  }, []);

  const totalMetrics = metricsData.reduce((acc, metric) => {
    acc.spend += metric.spend;
    acc.sales += metric.sales;
    acc.impressions += metric.impressions;
    acc.clicks += metric.clicks;
    return acc;
  }, { spend: 0, sales: 0, impressions: 0, clicks: 0 });

  const roas = totalMetrics.sales / totalMetrics.spend;
  const ctr = (totalMetrics.clicks / totalMetrics.impressions) * 100;

  // Determine ROAS traffic light status
  const getROASStatus = (roas: number) => {
    if (roas >= 3.0) return 'green';
    if (roas >= 2.0) return 'yellow';
    return 'red';
  };

  const channelPerformance = metricsData.reduce((acc: any, metric) => {
    if (!acc[metric.channel]) {
      acc[metric.channel] = { spend: 0, sales: 0, impressions: 0, clicks: 0, conversions: 0 };
    }
    acc[metric.channel].spend += metric.spend;
    acc[metric.channel].sales += metric.sales;
    acc[metric.channel].impressions += metric.impressions;
    acc[metric.channel].clicks += metric.clicks;
    acc[metric.channel].conversions = Math.round(metric.clicks * 0.15); // Mock conversion rate for demo
    return acc;
  }, {});

  const channelData = Object.entries(channelPerformance).map(([channel, data]: [string, any]) => ({
    channel,
    roas: data.sales / data.spend,
    spend: data.spend,
    sales: data.sales,
    conversions: data.conversions
  })).sort((a, b) => b.roas - a.roas);

  const conversionsByChannel = Object.entries(channelPerformance).map(([channel, data]: [string, any]) => ({
    channel: channel === 'facebook' ? 'meta' : channel,
    conversions: data.conversions
  }));

  // Calculate CTR for heatmap
  const ctrData = metricsData.map(metric => ({
    date: metric.date,
    channel: metric.channel,
    ctr: (metric.clicks / metric.impressions) * 100
  }));

  // Best performing hook (mock data)
  const bestHook = {
    text: "\"Discover how our customers saved 35% on their first order with this one-click solution\"",
    ctr: 4.8,
    channel: "tiktok"
  };

  const handleDownloadCSV = () => {
    // In a real app, this would generate and download a CSV
    console.log("Downloading analytics CSV...");
    alert("CSV download started!");
  };

  const handleGenerateGif = () => {
    // In a real app, this would generate a GIF recap
    console.log("Generating GIF recap...");
    alert("GIF generation in progress!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="p-6">
        {/* Header - Updated to match Chat Lab and Studio style */}
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
                    <BarChart2 className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-2 drop-shadow-sm">
                    Analytics Dashboard
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Track performance across all channels and campaigns
                  </p>
                </div>
              </div>
              <div className="w-56">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="bg-white/80 backdrop-blur-sm border border-purple-200/30 hover:bg-white/90 transition-all duration-300">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/90 backdrop-blur-sm border border-purple-200/30 shadow-xl">
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Stats Cards - Updated to show all four KPIs with FormattedMetric */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {/* Total ROAS Card */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-200/50 hover:bg-white/70 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total ROAS</p>
                    <p className="text-gray-800 text-2xl font-bold">
                      <FormattedMetric type="ROAS" value={roas} />
                    </p>
                  </div>
                  <EmojiTrafficLight status={getROASStatus(roas)} size="lg" />
                </div>
              </div>

              {/* Total Sales Card */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-200/50 hover:bg-white/70 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Sales</p>
                    <p className="text-gray-800 text-2xl font-bold">
                      <FormattedMetric 
                        type="Sales" 
                        value={totalMetrics.sales} 
                        extra={{ buyers: Math.floor(totalMetrics.sales / 59.4) }} 
                      />
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Click Rate Card */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-200/50 hover:bg-white/70 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Click Rate</p>
                    <p className="text-gray-800 text-2xl font-bold">
                      <FormattedMetric 
                        type="CTR" 
                        value={ctr} 
                        extra={{ clicks: totalMetrics.clicks, views: totalMetrics.impressions }} 
                      />
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-400 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Total Spend Card */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-200/50 hover:bg-white/70 transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Spend</p>
                    <p className="text-gray-800 text-2xl font-bold">
                      <FormattedMetric type="Spend" value={totalMetrics.spend} />
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                    <BarChart2 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/30 to-transparent"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mb-6 mt-6">
          <Button 
            variant="outline" 
            className="bg-white/70 border border-purple-200/50 hover:bg-white flex items-center gap-2"
            onClick={handleDownloadCSV}
          >
            <FileDown size={16} />
            Download CSV
          </Button>
          <Button 
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:from-purple-600 hover:to-pink-600"
            onClick={handleGenerateGif}
          >
            Generate GIF Recap
          </Button>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="bg-white/50 backdrop-blur-sm border border-purple-200/30 p-1 rounded-lg">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-md">Overview</TabsTrigger>
            <TabsTrigger value="channels" className="data-[state=active]:bg-white data-[state=active]:shadow-md">Channels</TabsTrigger>
            <TabsTrigger value="assets" className="data-[state=active]:bg-white data-[state=active]:shadow-md">Assets</TabsTrigger>
            <TabsTrigger value="abtests" className="data-[state=active]:bg-white data-[state=active]:shadow-md">A/B Tests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6 space-y-8">
            {/* Dual-axis Spend/ROAS line chart */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Spend vs ROAS</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="spend" stroke="#8b5cf6" strokeWidth={2} name="Spend ($)" />
                  <Line yAxisId="right" type="monotone" dataKey="roas" stroke="#ec4899" strokeWidth={2} name="ROAS" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Conversions by Channel */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversions by Channel</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={conversionsByChannel}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="channel" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="conversions" fill="#8b5cf6" name="Conversions" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* HeatMapGrid for creative CTR */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Creative Performance (CTR)</h3>
              <HeatMapGrid metrics={metricsData} />
            </div>

            {/* KPI callout for Best Hook */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-100 rounded-xl p-6 shadow-lg border border-yellow-200/50">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-amber-400 to-yellow-400 p-3 rounded-lg">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Performing Hook</h3>
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-amber-200/50">
                    <p className="text-gray-800 italic">{bestHook.text}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-medium text-gray-600">Channel: {bestHook.channel}</span>
                      <span className="text-sm font-medium text-gray-600">CTR: {bestHook.ctr}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="channels" className="mt-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Channel Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {channelData.map((channel, index) => {
                  const getGradient = () => {
                    switch(channel.channel) {
                      case 'tiktok': return 'from-violet-400 to-purple-500';
                      case 'instagram': return 'from-pink-400 to-rose-500';
                      case 'facebook': return 'from-blue-400 to-indigo-500';
                      case 'google': return 'from-emerald-400 to-green-500';
                      case 'email': return 'from-amber-400 to-yellow-500';
                      default: return 'from-gray-400 to-slate-500';
                    }
                  };
                  
                  const getEmoji = () => {
                    switch(channel.channel) {
                      case 'tiktok': return '🎵';
                      case 'instagram': return '📸';
                      case 'facebook': return '🔷';
                      case 'google': return '🔍';
                      case 'email': return '📧';
                      default: return '📱';
                    }
                  };

                  return (
                    <div 
                      key={channel.channel} 
                      className={`relative overflow-hidden rounded-xl p-5 shadow-lg border border-white/30 bg-gradient-to-br ${getGradient()} hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
                    >
                      {/* Background blobs */}
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
                      <div className="absolute bottom-0 left-0 w-20 h-20 bg-black/5 rounded-full blur-lg"></div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl bg-white/30 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-sm">
                              {getEmoji()}
                            </div>
                            <h4 className="text-lg font-bold text-white capitalize">
                              {channel.channel === 'facebook' ? 'Meta' : channel.channel}
                            </h4>
                          </div>
                          <div className="bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full">
                            <p className="text-white font-bold">
                              <FormattedMetric type="ROAS" value={channel.roas} />
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                            <p className="text-xs text-white/70">Spend</p>
                            <p className="text-base font-bold text-white">
                              <FormattedMetric type="Spend" value={channel.spend} />
                            </p>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                            <p className="text-xs text-white/70">Sales</p>
                            <p className="text-base font-bold text-white">
                              <FormattedMetric 
                                type="Sales" 
                                value={channel.sales} 
                                extra={{ buyers: Math.floor(channel.sales / 59.4) }} 
                              />
                            </p>
                          </div>
                        </div>
                        
                        {/* Animated bars */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                          <div 
                            className="h-full bg-white/40 animate-pulse"
                            style={{ width: `${Math.min(channel.roas * 20, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="assets" className="mt-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Asset Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assetsData.map(asset => (
                  <HoverCard key={asset.id}>
                    <HoverCardTrigger>
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-md border border-purple-100/50 hover:shadow-lg transition-all duration-300 hover:scale-102 cursor-pointer group">
                        <div className="relative h-40">
                          <img 
                            src={asset.thumbnail} 
                            alt={asset.title} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                            {asset.type}
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                            <span className="capitalize text-white font-medium">{asset.channel}</span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                            {asset.title}
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">{asset.cta}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              asset.status === 'performing' ? 'bg-green-100 text-green-800' : 
                              asset.status === 'average' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {asset.status}
                            </span>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm text-gray-600">CPA:</span>
                            <span className="text-sm font-bold text-gray-800">
                              <FormattedMetric type="CPA" value={asset.cpa} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 p-0">
                      <div className="p-4">
                        <h4 className="font-bold text-gray-800 mb-2">{asset.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          This {asset.type} asset on {asset.channel} has a CPA of ${asset.cpa.toFixed(2)}.
                        </p>
                        <div className="aspect-video bg-gray-100 flex items-center justify-center rounded-md mb-2">
                          <img 
                            src={asset.thumbnail} 
                            alt={asset.title} 
                            className="w-full h-full object-cover rounded-md" 
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm" className="text-xs">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="abtests" className="mt-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 flex items-center justify-center h-64">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-400 mb-2">A/B Test Dashboard Coming Soon</h3>
                <p className="text-gray-500">We're currently building the A/B testing analytics features.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
