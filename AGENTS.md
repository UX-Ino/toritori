# Repository Guidelines

## 프로젝트 구조 및 모듈 구성
- 소스: `src/` (진입점 `main.tsx`, 루트 `App.tsx`).
- UI: `src/components/` (PascalCase: `Header.tsx`, 각 페이지 컴포넌트).
- 스타일: `src/index.css`, `src/styles/globals.css`.
- 문서·에셋: `src/guidelines/Guidelines.md`, `src/Attributions.md`, `src/components/figma/`.
- 설정: `vite.config.ts` (`@` → `src` 별칭, dev 포트 3000, 빌드 출력 `build/`).

## 빌드·테스트·개발 명령
- 의존성 설치: `npm i`
- 개발 서버: `npm run dev` (http://localhost:3000)
- 프로덕션 빌드: `npm run build` (`build/` 생성)
- 빌드 미리보기: `npx vite preview --port 3000`

## 코딩 스타일·네이밍
- 언어: TypeScript + React 18 (TSX).
- 들여쓰기 2스페이스, 불필요한 줄바꿈·복잡도 최소화.
- 컴포넌트: PascalCase 파일/내보내기 (예: `PortfolioPage.tsx`).
- 훅/유틸: camelCase (예: `useScroll.ts`).
- CSS: 기존 유틸리티/스코프 유지, 새로운 선택자는 최소·로컬화. 파일명은 소문자/케밥(예: `index.css`).
- 임포트: `@/` 별칭 사용 (예: `@/components/Header`).

## 테스트 가이드
- 현재 테스트 도구 없음. 도입 시 Vitest + React Testing Library 권장.
- 테스트 파일은 코드 옆에 배치: `Component.test.tsx`.
- 스크립트 추가 후 `npm test` 실행. 핵심 경로 위주 실용적 커버리지 지향.

## 커밋·PR 가이드
- 작은 단위로 빈번히 커밋. Conventional Commits 권장: `feat: add Portfolio grid`, `fix(header): correct active state`.
- PR에는 목적/변경 요약, 스크린샷·GIF(UI), 관련 이슈 링크, 테스트 방법/영향 범위 포함.
- 구조·동작 변경 시 문서 갱신, 불필요한 diff 지양.

## 보안·설정 팁
- 비밀값/키 커밋 금지. 기본은 정적 앱이며 API 추가 시에만 `.env` 사용.
- `vite.config.ts` 별칭/출력 준수, 절대 경로 하드코딩 지양.
- 외부 패키지 검증, 의존성 최소화 및 `package.json` 버전 고정 준수.
