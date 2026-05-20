# 38-COLLABORATION-WEB-SNAPDECK

### LETS SOPT 38기 합동 세미나 데스크탑 웹 2조 스냅덱 🍰

<br />

<p align="center">
  <img src="src/assets/images/logo.svg" alt="스냅덱 로고" width="160" />
</p>

<br />

## 👥 팀 소개

<div align="center">

|                                                   **chungyo**                                                   |                                                    **seojin15**                                                    |                                                       **gyeongbibin**                                                       |                                                  **nyewon**                                                  |                                                   **jyeon03**                                                   |
| :-------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/chungyo.png" width="150" height="150"/><br/>[@chungyo](https://github.com/chungyo) | <img src="https://github.com/seojin15.png" width="150" height="150"/><br/>[@seojin15](https://github.com/seojin15) | <img src="https://github.com/gyeongbibin.png" width="150" height="150"/><br/>[@gyeongbibin](https://github.com/gyeongbibin) | <img src="https://github.com/nyewon.png" width="150" height="150"/><br/>[@nyewon](https://github.com/nyewon) | <img src="https://github.com/jyeon03.png" width="150" height="150"/><br/>[@jyeon03](https://github.com/jyeon03) |

</div>

<br />

## 🛠️ 기술 스택

| 역할                 | 종류                                                                                                                                                                                                                                                                                                              |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Library              | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)                                                                                                                                                                                                                |
| Programming Language | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)                                                                                                                                                                                                 |
| Build Tool           | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)                                                                                                                                                                                                                   |
| Styling              | ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)                                                                                                                                                                                              |
| Routing              | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)                                                                                                                                                                                            |
| Data Fetching        | ![Tanstack Query](https://img.shields.io/badge/tanstackquery-FF4154.svg?style=for-the-badge&logo=tanstackquery&logoColor=white)                                                                                                                                                                                   |
| UI Primitive         | ![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radixui&logoColor=white)                                                                                                                                                                                                        |
| DnD                  | ![dnd kit](https://img.shields.io/badge/dnd--kit-000000?style=for-the-badge)                                                                                                                                                                                                                                      |
| Formatting           | ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)                                                                                                |
| Package Manager      | ![Pnpm](https://img.shields.io/badge/Pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)                                                                                                                                                                                                                   |
| Version Control      | ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)                                                                                                  |
| UI Documentation     | ![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white) ![Chromatic](https://img.shields.io/badge/Chromatic-FC521F?style=for-the-badge&logo=chromatic&logoColor=white)                                                                                     |
| Deployment           | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)                                                                                                                                                                                                             |
| Cooperation          | ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white) |

<br />

## 🚀 실행 방법

```bash
pnpm install
pnpm dev
```

<br />

## 📜 Scripts

| Command                | Description                           |
| ---------------------- | ------------------------------------- |
| `pnpm dev`             | Vite 개발 서버 실행                   |
| `pnpm build`           | TypeScript 빌드 및 Vite 프로덕션 빌드 |
| `pnpm lint`            | ESLint 검사                           |
| `pnpm lint:fix`        | ESLint 자동 수정                      |
| `pnpm format`          | Prettier 포맷 적용                    |
| `pnpm format:check`    | Prettier 포맷 검사                    |
| `pnpm preview`         | 빌드 결과 미리보기                    |
| `pnpm storybook`       | Storybook 개발 서버 실행              |
| `pnpm build-storybook` | Storybook 정적 빌드                   |
| `pnpm chromatic`       | Chromatic 배포                        |

<br />

## 🗂️ 폴더 구조

```text
📦 38-COLLABORATION-WEB-SNAPDECK
├── 📁 public
│   └── 📁 fonts
├── 📁 src
│   ├── 📁 app
│   │   ├── App.tsx
│   │   └── 📁 router
│   ├── 📁 assets
│   │   ├── 📁 icons
│   │   └── 📁 images
│   ├── 📁 features
│   │   ├── 📁 content
│   │   │   ├── 📁 api
│   │   │   ├── 📁 components
│   │   │   ├── 📁 constants
│   │   │   ├── 📁 hooks
│   │   │   ├── 📁 queries
│   │   │   ├── 📁 types
│   │   │   └── 📁 utils
│   │   └── 📁 home
│   │       ├── 📁 api
│   │       ├── 📁 components
│   │       ├── 📁 constants
│   │       ├── 📁 hooks
│   │       ├── 📁 queries
│   │       └── 📁 types
│   ├── 📁 pages
│   │   ├── 📁 ContentPage
│   │   ├── 📁 HomePage
│   │   └── 📁 NotFoundPage
│   ├── 📁 shared
│   │   ├── 📁 api
│   │   ├── 📁 styles
│   │   ├── 📁 types
│   │   ├── 📁 ui
│   │   └── 📁 utils
│   └── main.tsx
├── .github
├── package.json
└── vite.config.ts
```

<br />

## 📑 컨벤션

### Git Branch

| 브랜치                        | 용도      |
| ----------------------------- | --------- |
| **main**                      | 배포용    |
| **develop**                   | 통합 개발 |
| **feat/기능명/#이슈번호**     | 기능 개발 |
| **fix/기능명/#이슈번호**      | 버그 수정 |
| **refactor/기능명/#이슈번호** | 리팩토링  |

### Commit Convention

| 태그         | 내용                                        |
| ------------ | ------------------------------------------- |
| **init**     | 개발 환경 초기 세팅                         |
| **feat**     | 새로운 기능 추가                            |
| **fix**      | 버그 수정                                   |
| **docs**     | 문서 수정                                   |
| **style**    | 스타일 변경 코드                            |
| **refactor** | 기능 변화 없이 코드 구조 개선 / 가독성 향상 |
| **hotfix**   | 긴급 수정 사항                              |
| **chore**    | 기타 자잘한 작업                            |

### Commit Message Example

```text
feat: 프롬프트 입력 컴포넌트 구현
```

### Issue Convention

```text
[TYPE] 작업 내용

## Describe
작업에 대한 설명을 작성합니다.

## Tasks
- [ ] 해야 할 작업 1
- [ ] 해야 할 작업 2
```

### PR Convention

```text
[TYPE] 작업 내용

## 📌 Summary
- Closes #이슈 번호

## 📚 Tasks
- 작업 내용

## 🔍 Describe
- 작업에 대한 상세 설명

## 👀 To Reviewer
- 리뷰어가 봐주었으면 하는 부분

## 📸 Screenshot
- 작업 결과물 이미지 또는 영상
```

### Coding Convention

<details>
<summary>🐵 컴포넌트</summary>

- 공통 컴포넌트는 `shared/ui`에 배치합니다.
- feature에 종속되는 컴포넌트는 `features/{domain}/components`에 배치합니다.
- 컴포넌트명은 파스칼케이스를 사용합니다. ex) `PromptTextarea`
- UI 컴포넌트는 가능한 한 렌더링 책임에 집중합니다.
</details>

<details>
<summary>🐷 변수/상수</summary>

- 상수는 대문자 SNAKE_CASE를 사용합니다. ex) `SOURCE_ACTION_OPTIONS`
- feature 내부에서만 공유되는 상수는 `features/{domain}/constants`에 배치합니다.
</details>

<details>
<summary>🐶 함수 & 훅</summary>

- hooks는 `use` 접두어를 사용합니다.
- 화살표 함수 사용을 우선합니다.
- 이벤트 핸들링 함수는 `handle` 접두어를 사용합니다.
- 이벤트 핸들링 함수가 아닌 함수에는 불필요하게 `handle`을 붙이지 않습니다.
</details>

<details>
<summary>🐰 타입</summary>

- 객체 구조 타입은 `interface` 사용을 우선합니다.
- 여러 파일에서 공유되는 타입은 `types` 폴더에 분리합니다.
- 1회성 props 타입은 `~Props`로 네이밍합니다.
</details>

<details>
<summary>🐢 스타일</summary>

- 시맨틱 태그 사용을 지향합니다.
- 단위는 `rem` 사용을 기본으로 합니다.
- border처럼 고정 크기가 필요한 경우 `px` 사용을 허용합니다.
- Tailwind class가 길어질 경우 `cn`으로 역할별 분리를 고려합니다.
</details>

</br>

## 🧩 초기 세팅 역할 분배

| 담당자   | 담당 기능                                                                                      |
| -------- | ---------------------------------------------------------------------------------------------- |
| **지연** | 폴더 구조 세팅, PR, Issue 템플릿 및 라벨 자동화 설정, Auto 리뷰어 설정, Discord 자동 알림 설정 |
| **충영** | CI/CD 파이프라인 구축 및 배포, 라우터 초기 세팅                                                |
| **예원** | 절대 경로 설정, SVGR 설정, MSW 세팅                                                            |
| **경빈** | StoryBook 세팅 및 배포, Tailwind CSS 세팅, Style 설정                                          |
| **서진** | Tanstack Query 및 axios 세팅, ESLint, Prettier 설정                                            |

</br>

## 🧩 컴포넌트 & 뷰 역할 분배

| 담당자   | 담당 컴포넌트                                         |
| -------- | ----------------------------------------------------- |
| **지연** | LinkModal, ConfirmModal, PromptPanel, HomePage Layout |
| **충영** | TextButton, SlideContent, ContentPage Layout          |
| **예원** | Modal, MenuHeader, BackHeader, SlideTitle             |
| **경빈** | TextField, ChatPrompt                                 |
| **서진** | IconButton, HomeTitle, DashBoard                      |

</br>

## 🧩 API 역할 분배

| 담당자   | 담당 기능              |
| -------- | ---------------------- |
| **지연** | 슬라이드 순서 변경     |
| **충영** | 덱 조회, 슬라이드 삭제 |
| **예원** | 슬라이드 추가          |
| **경빈** | 채팅 조회              |
| **서진** | 대시보드 조회          |
