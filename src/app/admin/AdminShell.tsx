"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export default function AdminShell({ initialIsAdmin }: { initialIsAdmin: boolean }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(initialIsAdmin);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Sync with cookie-based status on mount (in case of client nav)
    const check = async () => {
      try {
        const res = await fetch('/api/admin/status', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setIsAdmin(!!data?.isAdmin);
        }
      } catch {}
    };
    check();
  }, []);

  const onExit = () => {
    router.push('/');
  };

  const onLogin = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const onLogout = async () => {
    setLoading(true);
    try {
      await fetch('/api/admin?off=1', { cache: 'no-store' });
      setIsAdmin(false);
      router.replace('/admin');
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    // Pass a wrapper to match AdminLogin signature
    const handleLogin = async (u: string, p: string) => {
      const ok = await onLogin(u, p);
      return ok;
    };
    return <AdminLogin onLogin={handleLogin} onExit={onExit} />;
  }

  return <AdminDashboard onLogout={onLogout} onExit={onExit} />;
}
