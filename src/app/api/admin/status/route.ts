import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const cookieStore = cookies();
  const adminCookie = cookieStore.get('admin')?.value || cookieStore.get('isAdminMode')?.value;
  const isAdmin = adminCookie === '1' || adminCookie === 'true' || process.env.ADMIN_MODE === 'true';
  return NextResponse.json({ isAdmin });
}

