**Add your own guidelines here**
<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->

# Notion Integration (Portfolio)

- API route: `src/app/api/portfolio/route.ts` queries Notion and returns `{ items, categories }`.
- Env vars required (add to `.env.local`):
  - `NOTION_API_KEY`: Notion internal integration token (secret).
  - `NOTION_DATABASE_ID`: Database ID containing portfolio rows.
- Expected Notion database properties (names can be localized; handler is flexible):
  - Title: type `title` (used for `title`).
  - Category: type `select` or `multi_select` (first value used for `category`).
  - Image: type `url` or `files` (first file/external used for `image`).
  - Story: type `rich_text` (mapped to `story`).
  - Emotion: type `rich_text` (mapped to `emotion`).
  - Message: type `rich_text` (mapped to `message`).
- Supported property name candidates per field:
  - Category: `Category`, `카테고리`, `category`, `분류`
  - Image: `Image`, `이미지`, `image`, `Thumbnail`, `썸네일`
  - Story: `Story`, `이야기`, `story`
  - Emotion: `Emotion`, `감정`, `emotion`
  - Message: `Message`, `메시지`, `message`
- Client usage: `src/components/PortfolioPage.tsx` fetches `/api/portfolio` on mount,
  hydrates categories and items, and falls back to local seed data if the request fails.

# Admin Mode

- Detection: Layout checks cookie `admin=1|true` or env `ADMIN_MODE=true`.
- Toggle via server route:
  - Enable: visit `/api/admin?on=1` (optional `&redirect=/somepath`).
  - Disable: visit `/api/admin?off=1`.
- UI:
  - When not admin, a tiny amber dot appears bottom-right to enable admin quickly.
  - When admin, a small “Admin 종료” chip appears bottom-right to disable.

# Tailwind CSS (v4) Notes

- Current setup uses prebuilt `src/index.css`. New classes added in TSX won't apply until CSS is regenerated.
- Quick fix utilities are added in `src/styles/globals.css` to cover missing classes:
  - `.fixed`, `.bottom-4`, `.w-3`, `.h-3`, `.bg-amber-25`, `.to-yellow-25`
  - Variants: `.hover:opacity-100`, `.group-hover:opacity-100`, `.group-hover:bg-black/20`, `.group-hover:scale-110`
- Recommended: regenerate CSS with Tailwind CLI v4
  1) Create input: `src/styles/tw.css`
     - `@import "tailwindcss";`
     - `@source "../**/*.{ts,tsx}";`
  2) Build once: `npx @tailwindcss/cli -i src/styles/tw.css -o src/index.css --minify`
  3) Watch dev: `npx @tailwindcss/cli -i src/styles/tw.css -o src/index.css --watch`
  4) Ensure your editor saves trigger rebuilds so all used classes appear in `index.css`.
- If you keep prebuilt CSS, prefer existing tokens (e.g., `w-4/h-4`, `bottom-2`) or extend utilities in `globals.css` as done above.

# Media Storage

- Default: Supabase Storage (public bucket) via `POST /api/admin/upload`.
- Env vars:
  - `SUPABASE_URL`: Project URL (e.g., https://xyzcompany.supabase.co)
  - `SUPABASE_SERVICE_ROLE`: Service role key (server-only)
  - `SUPABASE_BUCKET`: Bucket name (e.g., `portfolio`)
  - `SUPABASE_FOLDER`: Optional folder prefix (e.g., `toritori/portfolio`)
- Flow: Admin uploads file -> API stores to Supabase -> returns public URL -> UI fills image field -> Notion stores URL.
- Alternative providers: Cloudflare R2, Firebase, Vercel Blob, Cloudinary (commented envs in `.env.local.example`).
