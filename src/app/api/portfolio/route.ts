import { NextResponse } from "next/server";

// Ensure this route is always dynamic and never cached by Next/Vercel
export const dynamic = "force-dynamic";
export const revalidate = 0;

// This API normalizes a Notion database into the Portfolio shape used by the UI
// Expected env vars: NOTION_API_KEY, NOTION_DATABASE_ID

type NotionPage = {
  id: string;
  properties: Record<string, any>;
};

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  image: string | null;
  story: string | null;
  emotion: string | null;
  message: string | null;
};

function extractTitle(properties: Record<string, any>): string {
  // Find the title property regardless of name
  for (const key of Object.keys(properties)) {
    const prop = properties[key];
    if (prop?.type === "title" && Array.isArray(prop.title)) {
      const text = prop.title.map((t: any) => t.plain_text || "").join("");
      if (text) return text;
    }
  }
  return "";
}

function textFromRich(prop: any): string | null {
  if (prop?.type === "rich_text" && Array.isArray(prop.rich_text)) {
    const text = prop.rich_text.map((t: any) => t.plain_text || "").join("");
    return text || null;
  }
  return null;
}

function firstMatchingProperty(
  properties: Record<string, any>,
  candidates: string[]
): any | null {
  for (const name of candidates) {
    if (properties[name]) return properties[name];
  }
  return null;
}

function extractCategory(properties: Record<string, any>): string {
  const prop =
    firstMatchingProperty(properties, [
      "Category",
      "카테고리",
      "category",
      "분류",
    ]) || Object.values(properties).find((p: any) => p?.type === "select" || p?.type === "multi_select");

  if (prop?.type === "select") {
    return prop.select?.name || "기타";
  }
  if (prop?.type === "multi_select") {
    return prop.multi_select?.[0]?.name || "기타";
  }
  return "기타";
}

function extractImage(properties: Record<string, any>): string | null {
  const prop = firstMatchingProperty(properties, ["Image", "이미지", "image", "Thumbnail", "썸네일"]); 
  if (!prop) return null;

  if (prop.type === "url") {
    return prop.url || null;
  }
  if (prop.type === "files" && Array.isArray(prop.files) && prop.files.length) {
    const f = prop.files[0];
    if (f?.type === "file") return f.file?.url || null;
    if (f?.type === "external") return f.external?.url || null;
  }
  return null;
}

function extractRichTextByCandidates(
  properties: Record<string, any>,
  candidates: string[]
): string | null {
  const prop = firstMatchingProperty(properties, candidates);
  return textFromRich(prop);
}

function normalize(page: NotionPage): PortfolioItem {
  const props = page.properties || {};
  const title = extractTitle(props);
  const category = extractCategory(props);
  const image = extractImage(props);
  const story =
    extractRichTextByCandidates(props, ["Story", "이야기", "story"]) || null;
  const emotion =
    extractRichTextByCandidates(props, ["Emotion", "감정", "emotion"]) || null;
  const message =
    extractRichTextByCandidates(props, ["Message", "메시지", "message"]) || null;

  return {
    id: page.id,
    title,
    category,
    image,
    story,
    emotion,
    message,
  };
}

async function queryAllPages(databaseId: string, apiKey: string) {
  const results: any[] = [];
  let nextCursor: string | null = null;
  do {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page_size: 100, start_cursor: nextCursor || undefined }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Notion query failed");
    }
    const data = await res.json();
    results.push(...(data.results || []));
    nextCursor = data.has_more ? data.next_cursor : null;
  } while (nextCursor);

  return results;
}

export async function GET() {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !databaseId) {
    return NextResponse.json(
      { error: "Missing NOTION_API_KEY or NOTION_DATABASE_ID" },
      { status: 500 }
    );
  }

  try {
    const results = await queryAllPages(databaseId, apiKey);
    const items: PortfolioItem[] = results.map((p: any) => normalize(p));

    // Unique categories with a friendly default list head
    const categorySet = new Set<string>(items.map((i) => i.category).filter(Boolean));
    const categories = ["전체", ...Array.from(categorySet)];

    return NextResponse.json(
      { items, categories },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Unexpected error", details: err?.message || String(err) },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
