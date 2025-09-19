"use client";
import { useRouter, usePathname } from 'next/navigation';
import { Header } from './Header';

const pathToPageId = (path: string): string => {
  if (path === '/' || path === '') return 'home';
  if (path.startsWith('/about')) return 'about';
  if (path.startsWith('/portfolio')) return 'portfolio';
  if (path.startsWith('/order')) return 'order';
  if (path.startsWith('/contact')) return 'contact';
  return 'home';
};

const idToPath: Record<string, string> = {
  home: '/',
  about: '/about',
  portfolio: '/portfolio',
  order: '/order',
  contact: '/contact',
};

export default function NextHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = pathToPageId(pathname || '/');

  return (
    <Header
      currentPage={currentPage}
      onNavigate={(id) => router.push(idToPath[id] || '/')}
    />
  );
}

