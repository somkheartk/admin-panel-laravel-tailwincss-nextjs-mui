"use client";

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
} from '@mui/icons-material';

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231',
    change: '+20.1%',
    icon: AttachMoney,
    color: 'from-green-500 to-emerald-600',
  },
  {
    title: 'Total Users',
    value: '2,345',
    change: '+15.3%',
    icon: People,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Total Orders',
    value: '1,234',
    change: '+8.2%',
    icon: ShoppingCart,
    color: 'from-purple-500 to-pink-600',
  },
  {
    title: 'Growth Rate',
    value: '24.5%',
    change: '+3.1%',
    icon: TrendingUp,
    color: 'from-orange-500 to-red-600',
  },
];

const recentOrders = [
  { id: '#12345', customer: 'John Doe', product: 'Premium Package', amount: '$299', status: 'Completed' },
  { id: '#12344', customer: 'Jane Smith', product: 'Basic Plan', amount: '$99', status: 'Pending' },
  { id: '#12343', customer: 'Bob Johnson', product: 'Pro Package', amount: '$199', status: 'Completed' },
  { id: '#12342', customer: 'Alice Brown', product: 'Enterprise', amount: '$499', status: 'Processing' },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-600">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="overflow-hidden rounded-xl bg-white shadow-md transition-all duration-200 hover:shadow-xl"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="mt-1 text-sm text-green-600">{stat.change} from last month</p>
                    </div>
                    <div className={`rounded-lg bg-gradient-to-br ${stat.color} p-3`}>
                      <Icon className="text-3xl text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Orders Table */}
        <div className="overflow-hidden rounded-xl bg-white shadow-md">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {order.customer}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {order.product}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
                      {order.amount}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          order.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
