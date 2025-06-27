
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Sparkles, Target, Archive, X, Edit3, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ScheduledCampaign {
  id: number;
  title: string;
  channel: string;
  time: string;
  status: 'scheduled' | 'active' | 'pending';
  emoji: string;
  description?: string;
  audience?: string;
  budget?: string;
}

const Scheduler = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [selectedEvent, setSelectedEvent] = useState<ScheduledCampaign | null>(null);

  const scheduledCampaigns: ScheduledCampaign[] = [
    {
      id: 1,
      title: 'Birthday Cupcake Campaign',
      channel: 'TikTok',
      time: '09:00 AM',
      status: 'scheduled',
      emoji: '🎂',
      description: 'Promote our special birthday cupcake collection with engaging short-form video content.',
      audience: 'Ages 18-35, interested in baking',
      budget: '$500'
    },
    {
      id: 2,
      title: 'Instagram Story Post',
      channel: 'Instagram',
      time: '12:00 PM',
      status: 'active',
      emoji: '📸',
      description: 'Behind-the-scenes content showing our baking process.',
      audience: 'Existing followers',
      budget: '$150'
    },
    {
      id: 3,
      title: 'Email Newsletter',
      channel: 'Email',
      time: '03:00 PM',
      status: 'scheduled',
      emoji: '📧',
      description: 'Weekly newsletter featuring new products and special offers.',
      audience: 'Email subscribers',
      budget: '$75'
    },
    {
      id: 4,
      title: 'Facebook Ad Launch',
      channel: 'Facebook',
      time: '06:00 PM',
      status: 'pending',
      emoji: '👥',
      description: 'Launch new product line with targeted advertising campaign.',
      audience: 'Local area, interests in baking',
      budget: '$800'
    }
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentWeek = getDaysInWeek(currentDate);
  const currentMonth = getDaysInMonth(currentDate);

  function getDaysInWeek(date: Date) {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  }

  function getDaysInMonth(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty days for the beginning of the month
    for (let i = 0; i < (startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1); i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  }

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventsForDay = (date: Date | null) => {
    if (!date) return [];
    // Mock data - return events for specific days
    const day = date.getDate();
    if (day === 15) return [scheduledCampaigns[0], scheduledCampaigns[1]];
    if (day === 18) return [scheduledCampaigns[2]];
    if (day === 22) return [scheduledCampaigns[3]];
    return [];
  };

  const EventModal = ({ event, isOpen, onClose }: { event: ScheduledCampaign; isOpen: boolean; onClose: () => void }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px] bg-gradient-to-br from-white to-purple-50 border-purple-200">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-xl font-bold text-gray-900">
            <span className="text-2xl">{event.emoji}</span>
            <span>{event.title}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-600">Channel</p>
              <p className="text-lg font-medium text-gray-900">{event.channel}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-600">Time</p>
              <p className="text-lg font-medium text-gray-900">{event.time}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-600">Status</p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(event.status)}`}>
              {event.status}
            </span>
          </div>

          {event.description && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-600">Description</p>
              <p className="text-gray-900">{event.description}</p>
            </div>
          )}

          {event.audience && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-600">Target Audience</p>
              <p className="text-gray-900">{event.audience}</p>
            </div>
          )}

          {event.budget && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-600">Budget</p>
              <p className="text-gray-900">{event.budget}</p>
            </div>
          )}

          <div className="flex space-x-3 pt-4 border-t border-purple-200">
            <Button variant="outline" className="flex-1 border-purple-200 hover:bg-purple-50">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Updated with visual effects similar to ChatLab */}
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
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2 drop-shadow-sm">
                  Campaign Scheduler
                </h1>
                <p className="text-gray-600 text-lg">
                  Plan and schedule your cross-channel campaigns with precision
                </p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Schedule Campaign</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-white/60 backdrop-blur-sm border-purple-200/50 hover:bg-white/70 transition-all duration-300 hover:scale-105">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">This Week</p>
                    <p className="text-gray-800 text-2xl font-bold">12</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-purple-200/50 hover:bg-white/70 transition-all duration-300 hover:scale-105">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Active</p>
                    <p className="text-gray-800 text-2xl font-bold">3</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-purple-200/50 hover:bg-white/70 transition-all duration-300 hover:scale-105">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Completed</p>
                    <p className="text-gray-800 text-2xl font-bold">8</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                    <Archive className="w-6 h-6 text-white" />
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
        {/* Calendar Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => viewMode === 'week' ? navigateWeek('prev') : navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900">
                {viewMode === 'week' 
                  ? `Week of ${currentWeek[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
                  : `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                }
              </h2>
              <button
                onClick={() => viewMode === 'week' ? navigateWeek('next') : navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('week')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  viewMode === 'week' 
                    ? 'bg-purple-100 text-purple-700 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  viewMode === 'month' 
                    ? 'bg-purple-100 text-purple-700 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Month
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          {viewMode === 'week' ? (
            <div className="grid grid-cols-7 gap-4">
              {daysOfWeek.map((day, index) => (
                <div key={day} className="text-center">
                  <div className="font-medium text-gray-700 mb-2">{day}</div>
                  <div className="bg-white rounded-lg p-4 min-h-32 border border-gray-200">
                    <div className="text-lg font-semibold text-gray-900 mb-2">
                      {currentWeek[index].getDate()}
                    </div>
                    {index === 1 && (
                      <div className="space-y-1">
                        <button 
                          onClick={() => setSelectedEvent(scheduledCampaigns[0])}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded hover:bg-blue-200 transition-colors w-full text-left"
                        >
                          🎂 TikTok 9AM
                        </button>
                        <button 
                          onClick={() => setSelectedEvent(scheduledCampaigns[1])}
                          className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded hover:bg-green-200 transition-colors w-full text-left"
                        >
                          📸 IG 12PM
                        </button>
                      </div>
                    )}
                    {index === 3 && (
                      <div className="space-y-1">
                        <button 
                          onClick={() => setSelectedEvent(scheduledCampaigns[2])}
                          className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded hover:bg-yellow-200 transition-colors w-full text-left"
                        >
                          📧 Email 3PM
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center font-medium text-gray-700 py-2">
                  {day}
                </div>
              ))}
              {currentMonth.map((date, index) => (
                <div key={index} className="aspect-square">
                  {date ? (
                    <div className="w-full h-full bg-white rounded-lg border border-gray-200 p-2 hover:bg-gray-50 transition-colors">
                      <div className="font-semibold text-gray-900 text-sm mb-1">
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {getEventsForDay(date).map((event, eventIndex) => (
                          <button
                            key={eventIndex}
                            onClick={() => setSelectedEvent(event)}
                            className={`w-full text-xs px-1 py-0.5 rounded text-left truncate ${getStatusColor(event.status)} hover:opacity-80 transition-opacity`}
                          >
                            {event.emoji} {event.channel}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <div className="space-y-4">
                {scheduledCampaigns.map((campaign) => (
                  <button
                    key={campaign.id}
                    onClick={() => setSelectedEvent(campaign)}
                    className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-[1.02] w-full text-left"
                  >
                    <div className="text-2xl">{campaign.emoji}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{campaign.title}</h4>
                      <p className="text-sm text-gray-600">{campaign.channel}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{campaign.time}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Scheduled</span>
                  <span className="font-semibold text-blue-600">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active</span>
                  <span className="font-semibold text-green-600">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold text-gray-600">8</span>
                </div>
              </div>
            </div>

            {/* Time Zone */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span className="font-medium text-gray-900">Time Zone</span>
              </div>
              <p className="text-sm text-gray-600">Pacific Standard Time (PST)</p>
              <p className="text-xs text-gray-500 mt-1">
                All campaigns scheduled in your local time
              </p>
            </div>

            {/* Bulk Actions */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bulk Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  Reschedule all campaigns
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  Duplicate week schedule
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  Export schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          isOpen={!!selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </div>
  );
};

export default Scheduler;
