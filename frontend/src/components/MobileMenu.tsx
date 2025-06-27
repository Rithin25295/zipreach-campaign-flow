
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart, Calendar, MessageSquare, Settings, Users, Menu, X } from 'lucide-react';

interface MobileMenuProps {
  className?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart },
    { path: '/chatlab', label: 'Chat Lab', icon: MessageSquare },
    { path: '/studio', label: 'Studio', icon: Users },
    { path: '/scheduler', label: 'Scheduler', icon: Calendar },
    { path: '/analytics', label: 'Analytics', icon: BarChart },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={className}>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-lg bg-white/70 backdrop-blur-sm shadow-lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={toggleMenu}>
          <div 
            className="bg-white h-full w-2/3 max-w-xs p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-2 mb-8" onClick={toggleMenu}>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ZipReach
              </span>
            </Link>

            {/* Nav Links */}
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={toggleMenu}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
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
            </nav>
          </div>
        </div>
      )}
      
      {/* Bottom Tab Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex justify-around">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center py-2 px-3 ${
                  isActive ? 'text-purple-600' : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs mt-1">{item.label.split(' ')[0]}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
