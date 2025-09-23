import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminFrame from '@/components/admin/AdminFrame';

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const adminCookie = cookieStore.get('admin')?.value || cookieStore.get('isAdminMode')?.value;
  const isAdmin = adminCookie === '1' || adminCookie === 'true' || process.env.ADMIN_MODE === 'true';
  if (!isAdmin) redirect('/admin');
  return <AdminFrame>{children}</AdminFrame>;
}

