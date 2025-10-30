'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/lib/api';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users');
    }
  };

  const handleToggleBan = async (id: string) => {
    try {
      await api.toggleBanUser(id);
      loadUsers();
    } catch (error) {
      alert('Failed to update user status');
    }
  };

  const getRoleBadge = (role: string) => {
    const colors: any = {
      owner: 'bg-purple-500',
      admin: 'bg-blue-500',
      staff: 'bg-green-500',
      user: 'bg-gray-500',
    };
    return colors[role] || 'bg-gray-500';
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
            <Link href="/users" className="block px-4 py-2 rounded bg-primary text-primary-foreground">Users</Link>
            <Link href="/coupons" className="block px-4 py-2 rounded hover:bg-muted">Coupons</Link>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold mb-8">Users</h2>

          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Role</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Joined</th>
                    <th className="text-right p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b">
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold text-white ${getRoleBadge(user.role)}`}>
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4">
                        {user.banned ? (
                          <span className="text-red-500 font-semibold">Banned</span>
                        ) : (
                          <span className="text-green-500">Active</span>
                        )}
                      </td>
                      <td className="p-4">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        {user.role !== 'owner' && (
                          <Button
                            variant={user.banned ? 'default' : 'destructive'}
                            size="sm"
                            onClick={() => handleToggleBan(user._id)}
                          >
                            {user.banned ? 'Unban' : 'Ban'}
                          </Button>
                        )}
                      </td>
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
