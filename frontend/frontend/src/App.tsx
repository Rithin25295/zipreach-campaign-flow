
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { MetricModeProvider } from '@/contexts/MetricModeContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import LandingPage from '@/pages/LandingPage';
import Dashboard from '@/pages/Dashboard';
import ChatLab from '@/pages/ChatLab';
import Studio from '@/pages/Studio';
import Scheduler from '@/pages/Scheduler';
import Analytics from '@/pages/Analytics';
import Marketplace from '@/pages/Marketplace';
import Connectors from '@/pages/Connectors';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MetricModeProvider>
          <Router>
            <div className="min-h-screen">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={
                  <SidebarProvider defaultOpen={true}>
                    <div className="flex min-h-screen w-full">
                      <AppSidebar />
                      <main className="flex-1">
                        <Dashboard />
                      </main>
                    </div>
                  </SidebarProvider>
                } />
                <Route path="/chatlab" element={
                  <SidebarProvider defaultOpen={true}>
                    <div className="flex min-h-screen w-full">
                      <AppSidebar />
                      <main className="flex-1">
                        <ChatLab />
                      </main>
                    </div>
                  </SidebarProvider>
                } />
                <Route path="/studio" element={
                  <SidebarProvider defaultOpen={true}>
                    <div className="flex min-h-screen w-full">
                      <AppSidebar />
                      <main className="flex-1">
                        <Studio />
                      </main>
                    </div>
                  </SidebarProvider>
                } />
                <Route path="/scheduler" element={
                  <SidebarProvider defaultOpen={true}>
                    <div className="flex min-h-screen w-full">
                      <AppSidebar />
                      <main className="flex-1">
                        <Scheduler />
                      </main>
                    </div>
                  </SidebarProvider>
                } />
                <Route path="/analytics" element={
                  <SidebarProvider defaultOpen={true}>
                    <div className="flex min-h-screen w-full">
                      <AppSidebar />
                      <main className="flex-1">
                        <Analytics />
                      </main>
                    </div>
                  </SidebarProvider>
                } />
                <Route path="/marketplace" element={
                  <SidebarProvider defaultOpen={true}>
                    <div className="flex min-h-screen w-full">
                      <AppSidebar />
                      <main className="flex-1">
                        <Marketplace />
                      </main>
                    </div>
                  </SidebarProvider>
                } />
                <Route path="/connectors" element={
                  <SidebarProvider defaultOpen={true}>
                    <div className="flex min-h-screen w-full">
                      <AppSidebar />
                      <main className="flex-1">
                        <Connectors />
                      </main>
                    </div>
                  </SidebarProvider>
                } />
                <Route path="/settings" element={
                  <SidebarProvider defaultOpen={true}>
                    <div className="flex min-h-screen w-full">
                      <AppSidebar />
                      <main className="flex-1">
                        <Settings />
                      </main>
                    </div>
                  </SidebarProvider>
                } />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </div>
            <Toaster />
          </Router>
        </MetricModeProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
