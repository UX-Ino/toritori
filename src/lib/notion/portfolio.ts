type NotionProperty = Record<string, any>;

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  image: string | null;
  story: string | null;
  emotion: string | null;
  message: string | null;
};

export function extractTitle(properties: NotionProperty): string {
  for (const key of Object.keys(properties)) {
    const prop = properties[key];
    if (prop?.type === 'title' && Array.isArray(prop.title)) {
      const text = prop.title.map((t: any) => t.plain_text || '').join('');
      if (text) return text;
    }
  }
  return '';
}

export function textFromRich(prop: any): string | null {
  if (prop?.type === 'rich_text' && Array.isArray(prop.rich_text)) {
    const text = prop.rich_text.map((t: any) => t.plain_text || '').join('');
    return text || null;
  }
  return null;
}

export function firstMatchingProperty(
  properties: NotionProperty,
  candidates: string[]
): any | null {
  for (const name of candidates) {
    if (properties[name]) return properties[name];
  }
  return null;
}

export function extractCategory(properties: NotionProperty): string {
  const prop =
    firstMatchingProperty(properties, [
      'Category',
      '카테고리',
      'category',
      '분류',
    ]) || Object.values(properties).find((p: any) => p?.type === 'select' || p?.type === 'multi_select');

  if (prop?.type === 'select') {
    return prop.select?.name || '기타';
  }
  if (prop?.type === 'multi_select') {
    return prop.multi_select?.[0]?.name || '기타';
  }
  return '기타';
}

export function extractImage(properties: NotionProperty): string | null {
  const prop = firstMatchingProperty(properties, ['Image', '이미지', 'image', 'Thumbnail', '썸네일']);
  if (!prop) return null;
  if (prop.type === 'url') return prop.url || null;
  if (prop.type === 'files' && Array.isArray(prop.files) && prop.files.length) {
    const f = prop.files[0];
    if (f?.type === 'file') return f.file?.url || null;
    if (f?.type === 'external') return f.external?.url || null;
  }
  return null;
}

export function extractRichTextByCandidates(properties: NotionProperty, candidates: string[]): string | null {
  const prop = firstMatchingProperty(properties, candidates);
  return textFromRich(prop);
}

export function normalizePageToPortfolioItem(page: any): PortfolioItem {
  const props = page.properties || {};
  const title = extractTitle(props);
  const category = extractCategory(props);
  const image = extractImage(props);
  const story = extractRichTextByCandidates(props, ['Story', '이야기', 'story']) || null;
  const emotion = extractRichTextByCandidates(props, ['Emotion', '감정', 'emotion']) || null;
  const message = extractRichTextByCandidates(props, ['Message', '메시지', 'message']) || null;
  return { id: page.id, title, category, image, story, emotion, message };
}

export async function queryAllPages(databaseId: string, apiKey: string): Promise<any[]> {
  const results: any[] = [];
  let nextCursor: string | null = null;
  do {
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page_size: 100, start_cursor: nextCursor || undefined }),
    });
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const data = await res.json();
    results.push(...(data.results || []));
    nextCursor = data.has_more ? data.next_cursor : null;
  } while (nextCursor);
  return results;
}

export function buildPropertiesFromItem(input: Partial<PortfolioItem>): Record<string, any> {
  const props: Record<string, any> = {};
  if (input.title !== undefined) {
    props['Title'] = { title: [{ type: 'text', text: { content: input.title } }] };
  }
  if (input.category !== undefined) {
    props['Category'] = { select: { name: input.category } };
  }
  if (input.story !== undefined) {
    props['Story'] = { rich_text: [{ type: 'text', text: { content: input.story || '' } }] };
  }
  if (input.emotion !== undefined) {
    props['Emotion'] = { rich_text: [{ type: 'text', text: { content: input.emotion || '' } }] };
  }
  if (input.message !== undefined) {
    props['Message'] = { rich_text: [{ type: 'text', text: { content: input.message || '' } }] };
  }
  if (input.image !== undefined) {
    // Prefer URL property named Image if present
    props['Image'] = { url: input.image || '' };
  }
  return props;
}

