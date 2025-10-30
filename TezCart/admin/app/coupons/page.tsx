'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api';
import { Plus } from 'lucide-react';

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage',
    value: '',
    expiresAt: '',
  });

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      const data = await api.getCoupons();
      setCoupons(data);
    } catch (error) {
      console.error('Failed to load coupons');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await api.createCoupon({
        ...formData,
        value: parseFloat(formData.value),
      });
      setShowForm(false);
      setFormData({ code: '', type: 'percentage', value: '', expiresAt: '' });
      loadCoupons();
    } catch (error) {
      alert('Failed to create coupon');
    }
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
            <Link href="/orders" className="block px-4 py-2 rounded hover:bg-muted">Orders</Link>
            <Link href="/users" className="block px-4 py-2 rounded hover:bg-muted">Users</Link>
            <Link href="/coupons" className="block px-4 py-2 rounded bg-primary text-primary-foreground">Coupons</Link>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Coupons</h2>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Coupon
            </Button>
          </div>

          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Create New Coupon</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label>Coupon Code</Label>
                    <Input value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })} required />
                  </div>
                  <div>
                    <Label>Type</Label>
                    <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm">
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                  <div>
                    <Label>Value</Label>
                    <Input type="number" step="0.01" value={formData.value} onChange={(e) => setFormData({ ...formData, value: e.target.value })} required />
                  </div>
                  <div>
                    <Label>Expires At</Label>
                    <Input type="date" value={formData.expiresAt} onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })} required />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">Create</Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4">Code</th>
                    <th className="text-left p-4">Type</th>
                    <th className="text-left p-4">Value</th>
                    <th className="text-left p-4">Expires</th>
                    <th className="text-left p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon._id} className="border-b">
                      <td className="p-4 font-mono font-bold">{coupon.code}</td>
                      <td className="p-4 capitalize">{coupon.type}</td>
                      <td className="p-4">{coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}</td>
                      <td className="p-4">{new Date(coupon.expiresAt).toLocaleDateString()}</td>
                      <td className="p-4">{new Date(coupon.expiresAt) > new Date() ? <span className="text-green-500">Active</span> : <span className="text-red-500">Expired</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
