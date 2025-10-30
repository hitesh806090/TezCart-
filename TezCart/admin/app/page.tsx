'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import { api } from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadStats();
  }, []);

  const checkAuth = async () => {
    try {
      const { user } = await api.getMe();
      if (!['owner', 'admin'].includes(user.role)) {
        router.push('/login');
      }
    } catch (error) {
      router.push('/login');
    }
  };

  const loadStats = async () => {
    try {
      const [products, orders, users] = await Promise.all([
        api.getProducts(),
        api.getOrders(),
        api.getUsers(),
      ]);
      
      const revenue = orders.reduce((sum: number, order: any) => sum + order.total, 0);
      
      setStats({
        products: products.length,
        orders: orders.length,
        users: users.length,
        revenue,
      });
    } catch (error) {
      console.error('Failed to load stats');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 min-h-screen border-r bg-card p-6">
          <h1 className="text-2xl font-bold mb-8">TezCart Admin</h1>
          <nav className="space-y-2">
            <Link href="/" className="block px-4 py-2 rounded bg-primary text-primary-foreground">Dashboard</Link>
            <Link href="/products" className="block px-4 py-2 rounded hover:bg-muted">Products</Link>
            <Link href="/categories" className="block px-4 py-2 rounded hover:bg-muted">Categories</Link>
            <Link href="/orders" className="block px-4 py-2 rounded hover:bg-muted">Orders</Link>
            <Link href="/users" className="block px-4 py-2 rounded hover:bg-muted">Users</Link>
            <Link href="/coupons" className="block px-4 py-2 rounded hover:bg-muted">Coupons</Link>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.revenue.toFixed(2)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.orders}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.products}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.users}</div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
