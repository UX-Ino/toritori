export const metadata = {
  title: '토리토리 이야기 | Toritori Story',
  description: 'Toritori — Next.js app',
};

import '../index.css';
import '../styles/globals.css';
import '../styles/tw.css';
import LayoutChrome from '@/components/LayoutChrome';
import { cookies } from 'next/headers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Admin mode detection: cookie or env fallback
  const cookieStore = cookies();
  const adminCookie = cookieStore.get('admin')?.value || cookieStore.get('isAdminMode')?.value;
  const isAdminMode =
    adminCookie === '1' || adminCookie === 'true' || process.env.ADMIN_MODE === 'true';

  return (
    <html lang="ko">
      <body className="min-h-screen bg-white">
        <LayoutChrome isAdminMode={isAdminMode}>{children}</LayoutChrome>
      </body>
    </html>
  );
}
