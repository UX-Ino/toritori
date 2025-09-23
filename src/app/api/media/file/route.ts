import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.searchParams.get('path');
  const debug = url.searchParams.get('debug');

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
  const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET || 'portfolio';

  if (!path) return NextResponse.json({ error: 'PATH_REQUIRED' }, { status: 400 });
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
    return NextResponse.json({ error: 'SERVER_MISCONFIG' }, { status: 500 });
  }

  try {
    // Generate signed URL (defaults to 1 day = 86400s)
    const expiresIn = Number(url.searchParams.get('expiresIn') || 86400);
    const signRes = await fetch(
      `${SUPABASE_URL}/storage/v1/object/sign/${encodeURIComponent(SUPABASE_BUCKET)}/${path}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expiresIn }),
      }
    );
    if (!signRes.ok) {
      const text = await signRes.text();
      if (debug) {
        return NextResponse.json({ error: 'SIGN_FAILED', details: text, bucket: SUPABASE_BUCKET, path }, { status: 502 });
      }
      return NextResponse.json({ error: 'SIGN_FAILED' }, { status: 502 });
    }
    const data = await signRes.json();
    const signedPath = data?.signedURL || data?.signedUrl || data?.url;
    if (!signedPath) {
      return NextResponse.json({ error: 'INVALID_SIGN_RESPONSE', data }, { status: 502 });
    }
    const absolute = signedPath.startsWith('http') ? signedPath : `${SUPABASE_URL}${signedPath}`;
    if (debug) {
      return NextResponse.json({ ok: true, absolute, signedPath, bucket: SUPABASE_BUCKET, path });
    }
    return NextResponse.redirect(absolute, { status: 302 });
  } catch (e: any) {
    return NextResponse.json({ error: 'SUPABASE_ERROR', details: e?.message, path }, { status: 502 });
  }
}
