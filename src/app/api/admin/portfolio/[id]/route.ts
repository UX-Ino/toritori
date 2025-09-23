import { NextResponse } from 'next/server';
import { isAdminFromCookies } from '@/lib/auth';
import { buildPropertiesFromItem, normalizePageToPortfolioItem } from '@/lib/notion/portfolio';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function PATCH(_req: Request, { params }: { params: { id: string } }) {
  if (!isAdminFromCookies()) return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'Missing NOTION_API_KEY' }, { status: 500 });

  let body: any = {};
  try { body = await _req.json(); } catch {}
  const properties = buildPropertiesFromItem(body || {});
  try {
    const res = await fetch(`https://api.notion.com/v1/pages/${params.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties }),
    });
    if (!res.ok) return NextResponse.json({ error: 'UPDATE_FAILED', details: await res.text() }, { status: 502 });
    const updated = await res.json();
    return NextResponse.json({ item: normalizePageToPortfolioItem(updated) });
  } catch (e: any) {
    return NextResponse.json({ error: 'NOTION_ERROR', details: e?.message }, { status: 502 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  if (!isAdminFromCookies()) return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'Missing NOTION_API_KEY' }, { status: 500 });
  try {
    const res = await fetch(`https://api.notion.com/v1/pages/${params.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ archived: true }),
    });
    if (!res.ok) return NextResponse.json({ error: 'DELETE_FAILED', details: await res.text() }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: 'NOTION_ERROR', details: e?.message }, { status: 502 });
  }
}

