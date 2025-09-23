import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const on = url.searchParams.get('on');
  const off = url.searchParams.get('off');
  const toggle = url.searchParams.get('toggle');
  const redirectTo = url.searchParams.get('redirect') || '/';

  let value: '1' | '0' | null = null;
  if (on && (on === '1' || on === 'true')) value = '1';
  if (off && (off === '1' || off === 'true')) value = '0';
  if (toggle) {
    // toggle based on current cookie (not available here directly), default to on
    value = '1';
  }

  const response = NextResponse.redirect(new URL(redirectTo, request.url));
  if (value !== null) {
    response.cookies.set('admin', value, {
      path: '/',
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }
  return response;
}

