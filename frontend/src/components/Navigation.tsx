import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart, 
  Calendar, 
  MessageSquare, 
  Settings, 
  Users,
  Store,
  Cable
} from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart },
    { path: '/chatlab', label: 'Chat Lab', icon: MessageSquare },
    { path: '/studio', label: 'Studio', icon: Users },
    { path: '/scheduler', label: 'Scheduler', icon: Calendar },
    { path: '/analytics', label: 'Analytics', icon: BarChart },
    { path: '/marketplace', label: 'Marketplace', icon: Store },
    { path: '/connectors', label: 'Connectors', icon: Cable },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ZipReach
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.plan} Plan</p>
                </div>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full bg-gray-200"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
