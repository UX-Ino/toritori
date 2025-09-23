"use client";
import { usePathname } from 'next/navigation';
import NextHeader from '@/components/NextHeader';
import { Footer } from '@/components/Footer';

export default function LayoutChrome({
  children,
  isAdminMode = false,
}: {
  children: React.ReactNode;
  isAdminMode?: boolean;
}) {
  const pathname = usePathname() || '/';
  const onAdminPath = pathname.startsWith('/admin');
  const hideChrome = isAdminMode || onAdminPath;

  return (
    <>
      {!hideChrome && <NextHeader />}
      <main>{children}</main>
      {!hideChrome && <Footer />}

      {/* Admin shortcut (only when not admin and not on /admin) */}
      {!hideChrome && (
        <a
          href="/admin"
          className="fixed bottom-2 right-4 z-50 block w-4 h-4 bg-amber-600 rounded-full opacity-20 hover:opacity-100 transition-opacity duration-300"
          title="관리자 페이지"
          aria-label="관리자 페이지"
        />
      )}

      {/* Quick exit when admin cookie is set */}
      {isAdminMode && (
        <a
          href="/api/admin?off=1"
          className="fixed bottom-2 right-4 z-50 px-3 py-1 text-xs bg-amber-600 text-white rounded-full opacity-80 hover:opacity-100 transition-opacity"
          title="관리자 모드 종료"
        >
          Admin 종료
        </a>
      )}
    </>
  );
}

