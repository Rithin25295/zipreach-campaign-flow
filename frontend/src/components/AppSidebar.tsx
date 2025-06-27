
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  BarChart, 
  Calendar, 
  MessageSquare, 
  Settings, 
  Users,
  Cable,
  Store,
  Moon,
  Sun
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import MetricModeToggle from '@/components/MetricModeToggle';

const AppSidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart },
    { path: '/chatlab', label: 'Chat Lab', icon: MessageSquare },
    { path: '/studio', label: 'Asset Studio', icon: Users },
    { path: '/scheduler', label: 'Scheduler', icon: Calendar },
    { path: '/analytics', label: 'Analytics', icon: BarChart },
    { path: '/marketplace', label: 'Marketplace', icon: Store },
    { path: '/connectors', label: 'Connectors', icon: Cable },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between px-2 py-1">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #007BFF 0%, #00C2A8 100%)' }}>
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent" style={{ background: 'linear-gradient(90deg, #007BFF 0%, #00C2A8 100%)', WebkitBackgroundClip: 'text' }}>
              ZipReach
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-8 w-8"
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.path}>
                        {Icon && <Icon className="w-4 h-4" />}
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {user && (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <div className="flex items-center justify-between w-full py-2">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="relative w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-sm font-bold text-white">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <p className="text-sm font-semibold text-sidebar-foreground truncate">{user.name}</p>
                      <p className="text-xs text-sidebar-foreground/60 capitalize">{user.plan} Plan</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    <MetricModeToggle />
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
};

export default AppSidebar;
