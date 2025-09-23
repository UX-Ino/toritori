import { NextResponse } from 'next/server';
import { isAdminFromCookies } from '@/lib/auth';
import { normalizePageToPortfolioItem, queryAllPages } from '@/lib/notion/portfolio';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  if (!isAdminFromCookies()) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
  }
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!apiKey || !databaseId) {
    return NextResponse.json({ error: 'Missing NOTION_API_KEY or NOTION_DATABASE_ID' }, { status: 500 });
  }
  try {
    const results = await queryAllPages(databaseId, apiKey);
    const items = results.map((p: any) => normalizePageToPortfolioItem(p));
    return NextResponse.json({ items });
  } catch (e: any) {
    return NextResponse.json({ error: 'NOTION_ERROR', details: e?.message }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!isAdminFromCookies()) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
  }
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!apiKey || !databaseId) {
    return NextResponse.json({ error: 'Missing NOTION_API_KEY or NOTION_DATABASE_ID' }, { status: 500 });
  }
  const input = await request.json();

  // Fetch database schema to find actual property names/types
  const dbRes = await fetch(`https://api.notion.com/v1/databases/${databaseId}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Notion-Version': '2022-06-28',
    },
  });
  if (!dbRes.ok) {
    return NextResponse.json({ error: 'DB_SCHEMA_FETCH_FAILED', details: await dbRes.text() }, { status: 502 });
  }
  const db = await dbRes.json();
  const props: Record<string, any> = db?.properties || {};

  // Resolve property keys
  const titleKey = Object.keys(props).find((k) => props[k]?.type === 'title');
  const categoryKey =
    Object.keys(props).find((k) => props[k]?.type === 'select') ||
    Object.keys(props).find((k) => props[k]?.type === 'multi_select');
  const storyKey =
    Object.keys(props).find((k) => k.toLowerCase() === 'story') ||
    Object.keys(props).find((k) => props[k]?.type === 'rich_text');
  const emotionKey = Object.keys(props).find((k) => k.toLowerCase() === 'emotion');
  const messageKey = Object.keys(props).find((k) => k.toLowerCase() === 'message');
  const imageKey =
    Object.keys(props).find((k) => ['image', 'thumbnail', '이미지', '썸네일'].includes(k.toLowerCase())) ||
    Object.keys(props).find((k) => ['url', 'files'].includes(props[k]?.type));

  const imageType = imageKey ? props[imageKey]?.type : null; // 'url' | 'files' | null

  // Build properties payload dynamically
  const properties: Record<string, any> = {};
  if (titleKey && typeof input.title === 'string') {
    properties[titleKey] = { title: [{ type: 'text', text: { content: input.title } }] };
  }
  if (categoryKey && typeof input.category === 'string') {
    if (props[categoryKey]?.type === 'multi_select') {
      properties[categoryKey] = { multi_select: [{ name: input.category }] };
    } else {
      properties[categoryKey] = { select: { name: input.category } };
    }
  }
  if (storyKey && typeof input.story === 'string') {
    properties[storyKey] = { rich_text: [{ type: 'text', text: { content: input.story } }] };
  }
  if (emotionKey && typeof input.emotion === 'string') {
    properties[emotionKey] = { rich_text: [{ type: 'text', text: { content: input.emotion } }] };
  }
  if (messageKey && typeof input.message === 'string') {
    properties[messageKey] = { rich_text: [{ type: 'text', text: { content: input.message } }] };
  }

  // Handle image: accept absolute URL or Supabase storage path
  if (imageKey && typeof input.image === 'string' && input.image.length) {
    const raw: string = input.image;
    const isAbs = /^https?:\/\//i.test(raw);
    let finalUrl = raw;
    if (!isAbs) {
      const origin = process.env.APP_ORIGIN || (new URL(request.url).origin);
      finalUrl = `${origin}/api/media/file?path=${encodeURIComponent(raw)}`;
    }
    if (imageType === 'url') {
      properties[imageKey] = { url: finalUrl };
    } else if (imageType === 'files') {
      properties[imageKey] = { files: [{ type: 'external', name: input.title || 'image', external: { url: finalUrl } }] };
    } else {
      // Fallback: store into a rich_text-like field if available
      if (storyKey) {
        properties[storyKey] = properties[storyKey] || { rich_text: [] };
        properties[storyKey].rich_text.push({ type: 'text', text: { content: `\n[image]: ${finalUrl}` } });
      }
    }
  }
  try {
    const res = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ parent: { database_id: databaseId }, properties }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'CREATE_FAILED', details: await res.text() }, { status: 502 });
    }
    const created = await res.json();
    return NextResponse.json({ item: normalizePageToPortfolioItem(created) }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: 'NOTION_ERROR', details: e?.message }, { status: 502 });
  }
}
