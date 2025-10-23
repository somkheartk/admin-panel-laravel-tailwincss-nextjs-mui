"use client";

import React from 'react';
import Link from 'next/link';
import {
  Dashboard,
  People,
  Settings,
  Inventory,
  Assessment,
  ShoppingCart,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: Dashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: People, label: 'Users', href: '/dashboard/users' },
  { icon: Inventory, label: 'Products', href: '/dashboard/products' },
  { icon: ShoppingCart, label: 'Orders', href: '/dashboard/orders' },
  { icon: Assessment, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar({ open, onToggle }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-30 h-screen w-64 transform bg-gradient-to-b from-indigo-900 to-purple-900 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo/Header */}
          <div className="flex items-center justify-between border-b border-indigo-800 px-6 py-4">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <IconButton
              onClick={onToggle}
              className="text-white lg:hidden"
              size="small"
            >
              <MenuIcon />
            </IconButton>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:shadow-lg"
                    >
                      <Icon className="text-2xl" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-indigo-800 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 to-yellow-500" />
              <div>
                <p className="text-sm font-semibold">Admin User</p>
                <p className="text-xs text-indigo-300">admin@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
