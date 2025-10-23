"use client";

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className="lg:ml-64">
        <Header onMenuClick={toggleSidebar} />
        
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
