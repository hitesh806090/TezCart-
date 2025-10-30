'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/lib/api';
import { formatPrice } from '@/lib/utils';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await api.getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders');
    }
  };

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await api.updateOrderStatus(orderId, status);
      loadOrders();
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      pending: 'bg-yellow-500',
      paid: 'bg-blue-500',
      shipped: 'bg-purple-500',
      completed: 'bg-green-500',
      cancelled: 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 min-h-screen border-r bg-card p-6">
          <h1 className="text-2xl font-bold mb-8">TezCart Admin</h1>
          <nav className="space-y-2">
            <Link href="/" className="block px-4 py-2 rounded hover:bg-muted">Dashboard</Link>
            <Link href="/products" className="block px-4 py-2 rounded hover:bg-muted">Products</Link>
            <Link href="/categories" className="block px-4 py-2 rounded hover:bg-muted">Categories</Link>
            <Link href="/orders" className="block px-4 py-2 rounded bg-primary text-primary-foreground">Orders</Link>
            <Link href="/users" className="block px-4 py-2 rounded hover:bg-muted">Users</Link>
            <Link href="/coupons" className="block px-4 py-2 rounded hover:bg-muted">Coupons</Link>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold mb-8">Orders</h2>

          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order._id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-semibold">Order #{order._id.slice(-8)}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                      <p className="text-sm">
                        Customer: {order.user?.name || 'N/A'} ({order.user?.email || 'N/A'})
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{formatPrice(order.total)}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mt-2 ${getStatusColor(order.status)}`}>
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold mb-2">Items:</p>
                    {order.items.map((item: any, idx: number) => (
                      <p key={idx} className="text-sm">
                        {item.name} × {item.quantity} = {formatPrice(item.price * item.quantity)}
                      </p>
                    ))}
                  </div>

                  {order.shippingAddress && (
                    <div className="mb-4">
                      <p className="font-semibold mb-2">Shipping Address:</p>
                      <p className="text-sm">
                        {order.shippingAddress.name}<br />
                        {order.shippingAddress.address}<br />
                        {order.shippingAddress.city}, {order.shippingAddress.zip}<br />
                        {order.shippingAddress.country}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <label className="text-sm font-semibold">Update Status:</label>
                    <Select value={order.status} onValueChange={(value) => handleStatusChange(order._id, value)}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
