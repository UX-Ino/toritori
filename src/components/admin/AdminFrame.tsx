"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, LogOut, LayoutDashboard, Image, ShoppingBag, MessageCircle, Users, BarChart3 } from 'lucide-react';

export default function AdminFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/admin/dashboard';
  const router = useRouter();

  const nav = [
    { href: '/admin/dashboard', label: '대시보드', icon: LayoutDashboard },
    { href: '/admin/portfolio', label: '포트폴리오 관리', icon: Image },
    { href: '/admin/orders', label: '주문 관리', icon: ShoppingBag },
    { href: '/admin/inquiries', label: '문의 관리', icon: MessageCircle },
    { href: '/admin/customers', label: '고객 관리', icon: Users },
    { href: '/admin/analytics', label: '통계', icon: BarChart3 },
  ];

  const logout = async () => {
    await fetch('/api/admin?off=1', { cache: 'no-store' });
    router.replace('/admin');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl text-amber-800">토리토리 관리자</h1>
            <p className="text-sm text-gray-600">Toritori Admin</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex">
              <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:bg-gray-50">
                <Home size={16} className="mr-2" /> 메인 사이트
              </Button>
            </Link>
            <Button onClick={logout} variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
              <LogOut size={16} className="mr-2" /> 로그아웃
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-1">
            {nav.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href} className="block">
                  <div
                    className={
                      `flex items-center px-4 py-3 rounded-md text-sm transition-colors ` +
                      (active ? 'bg-amber-50 text-amber-700' : 'text-gray-700 hover:bg-gray-50')
                    }
                  >
                    <Icon size={18} className="mr-3" /> {label}
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

