import { NextResponse } from 'next/server';
import { isAdminFromCookies } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function uuid() {
  // Use crypto.randomUUID if available; else fallback
  // @ts-ignore
  if (typeof crypto !== 'undefined' && typeof (crypto as any).randomUUID === 'function') {
    // @ts-ignore
    return (crypto as any).randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export async function POST(request: Request) {
  if (!isAdminFromCookies()) return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
  const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET || 'portfolio';
  const SUPABASE_FOLDER = process.env.SUPABASE_FOLDER || 'uploads';

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
    return NextResponse.json({ error: 'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE' }, { status: 500 });
  }

  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'FILE_REQUIRED' }, { status: 400 });
  }

  const safeName = (file.name || 'image').replace(/[^a-zA-Z0-9_.-]/g, '_');
  const objectPath = `${SUPABASE_FOLDER}/${new Date().toISOString().slice(0,10)}/${uuid()}-${safeName}`;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${encodeURIComponent(SUPABASE_BUCKET)}/${objectPath}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE}`,
        'Content-Type': file.type || 'application/octet-stream',
        'x-upsert': 'true',
      },
      body: Buffer.from(arrayBuffer),
    } as any);

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: 'UPLOAD_FAILED', details: text }, { status: 502 });
    }

    // Private bucket: return storage path; clients should request signed URL via /api/media/file
    return NextResponse.json({ path: objectPath });
  } catch (e: any) {
    return NextResponse.json({ error: 'SUPABASE_ERROR', details: e?.message }, { status: 502 });
  }
}
