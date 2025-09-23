"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';

export function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check cookie-based admin status
  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch('/api/admin/status', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setIsAdmin(!!data?.isAdmin);
        }
      } finally {
        setLoading(false);
      }
    };
    check();
  }, []);

  const onExit = () => router.push('/');

  const handleLogin = async (username: string, password: string) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) return false;
      setIsAdmin(true);
      router.replace('/admin/dashboard');
      router.refresh();
      return true;
    } catch {
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin?off=1', { cache: 'no-store' });
      setIsAdmin(false);
      router.replace('/admin');
      router.refresh();
    } catch {}
  };

  if (loading) return null;

  if (!isAdmin) {
    return <AdminLogin onLogin={handleLogin} onExit={onExit} />;
  }

  return <AdminDashboard onLogout={handleLogout} onExit={onExit} />;
}
