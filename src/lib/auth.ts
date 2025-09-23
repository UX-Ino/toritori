import { cookies } from 'next/headers';

export function isAdminFromCookies(): boolean {
  const cookieStore = cookies();
  const adminCookie = cookieStore.get('admin')?.value || cookieStore.get('isAdminMode')?.value;
  return (
    adminCookie === '1' ||
    adminCookie === 'true' ||
    process.env.ADMIN_MODE === 'true'
  );
}

