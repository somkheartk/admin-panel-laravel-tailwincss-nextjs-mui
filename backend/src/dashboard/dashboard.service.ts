import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  getStats() {
    return {
      total_revenue: '$45,231',
      total_users: 2345,
      total_orders: 1234,
      growth_rate: '24.5%',
    };
  }

  getRecentOrders() {
    return [
      {
        id: '#12345',
        customer: 'John Doe',
        product: 'Premium Package',
        amount: '$299',
        status: 'Completed',
      },
      {
        id: '#12344',
        customer: 'Jane Smith',
        product: 'Basic Plan',
        amount: '$99',
        status: 'Pending',
      },
      {
        id: '#12343',
        customer: 'Bob Johnson',
        product: 'Pro Package',
        amount: '$199',
        status: 'Completed',
      },
      {
        id: '#12342',
        customer: 'Alice Brown',
        product: 'Enterprise',
        amount: '$499',
        status: 'Processing',
      },
    ];
  }
}
