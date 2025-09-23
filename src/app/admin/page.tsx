import { cookies } from 'next/headers';
import AdminShell from './AdminShell';

export default function AdminPageRoute() {
  const cookieStore = cookies();
  const adminCookie = cookieStore.get('admin')?.value || cookieStore.get('isAdminMode')?.value;
  const isAdmin = adminCookie === '1' || adminCookie === 'true' || process.env.ADMIN_MODE === 'true';
  return <AdminShell initialIsAdmin={isAdmin} />;
}

