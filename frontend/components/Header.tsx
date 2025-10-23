"use client";

import React from 'react';
import { IconButton, Badge } from '@mui/material';
import {
  Notifications,
  Search,
  Menu as MenuIcon,
} from '@mui/icons-material';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Left side - Menu button */}
        <div className="flex items-center gap-4">
          <IconButton
            onClick={onMenuClick}
            className="text-gray-700 lg:hidden"
            size="medium"
          >
            <MenuIcon />
          </IconButton>
          <h2 className="hidden text-xl font-semibold text-gray-800 sm:block">
            Dashboard
          </h2>
        </div>

        {/* Search bar - hidden on mobile */}
        <div className="hidden flex-1 px-8 md:block">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>

        {/* Right side - Notifications */}
        <div className="flex items-center gap-2">
          <IconButton className="text-gray-700">
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>
        </div>
      </div>
    </header>
  );
}
