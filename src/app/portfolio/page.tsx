"use client";
import { useRouter } from 'next/navigation';
import { PortfolioPage } from '@/components/PortfolioPage';

export default function Page() {
  const router = useRouter();
  const go = (id: string) => {
    const map: Record<string, string> = {
      home: '/',
      about: '/about',
      portfolio: '/portfolio',
      order: '/order',
      contact: '/contact',
    };
    router.push(map[id] || '/');
  };
  return <PortfolioPage onNavigate={go} />;
}
