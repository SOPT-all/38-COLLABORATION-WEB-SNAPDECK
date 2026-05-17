import type { SlideContentItem } from "@/features/content/types";

/** SlideTitleViewer 미리보기에 표시할 슬라이드 수 (Figma 기준) */
export const SLIDE_PREVIEW_COUNT = 5;

export const SLIDE_CONTENT_EXAMPLES: SlideContentItem[] = [
  {
    id: 1,
    deckId: 1,
    order: 1,
    imageName: "img_apple_1",
    title: "Apple의 생태계 전략과 모바일 기술 분야의 경쟁 우위",
    content: "",
    footer: "발표자: [발표자명] 소속: [회사명] 직책: [직책] 날짜: [YYYY-MM-DD]",
    createdAt: "2025-11-01T09:00:00",
    updatedAt: null,
  },
  {
    id: 2,
    deckId: 1,
    order: 2,
    imageName: "img_apple_2",
    title: "불릿 리스트 예시: 하드웨어와 소프트웨어의 수직적 통합",
    content:
      "• Apple은 자체 설계한 A-시리즈 및 M-시리즈 칩을 통해 하드웨어 성능을 극대화합니다.\n• 독자적인 iOS와 macOS 운영체제는 하드웨어와 완벽하게 맞물려 끊김 없는 사용자 경험을 제공합니다.\n• 이러한 수직적 통합은 타사 대비 월등한 전력 효율성과 연산 속도를 보장합니다.\n• 사용자는 기기 간의 이질감 없는 인터페이스를 통해 높은 만족도를 유지합니다.\n• 독점적 하드웨어-소프트웨어 구조는 강력한 진입 장벽을 구축하는 핵심 요소입니다.\n• 정기적인 보안 업데이트와 최적화는 기기의 잔존 가치를 높여 브랜드 충성도를 강화합니다.",
    footer: "[다이어그램] Apple 하드웨어, 소프트웨어, 서비스의 결합 구조도",
    createdAt: "2025-11-01T09:05:00",
    updatedAt: "2025-11-02T10:00:00",
  },
  {
    id: 3,
    deckId: 1,
    order: 3,
    imageName: "img_apple_3",
    title: "일반 문장 예시: AI 통합을 통한 업무 방식 변화",
    content:
      "생성형 AI는 단순한 도구를 넘어 기업 운영의 핵심 인터페이스로 진화하고 있습니다.\n기존의 복잡한 UI/UX 대신 자연어 기반의 인터페이스가 표준으로 자리 잡고 있습니다.\n데이터 분석과 보고서 작성이 자동화되어 의사결정 속도가 획기적으로 향상됩니다.",
    footer:
      "[다이어그램] 기존 수동 워크플로우와 AI 통합 자동화 워크플로우의 비교 구조도",
    createdAt: "2025-11-01T09:10:00",
    updatedAt: null,
  },
  {
    id: 4,
    deckId: 1,
    order: 4,
    imageName: "img_apple_4",
    title: "Apple Silicon 전환이 만든 성능 우위",
    content:
      "• Apple Silicon으로의 전환을 통해 노트북과 모바일 간의 기술적 경계를 허물었습니다.\n• 머신러닝 전용 뉴럴 엔진(Neural Engine) 탑재로 온디바이스 AI 분야에서 우위를 점하고 있습니다.\n• 타사 플래그십 모델 대비 긱벤치(Geekbench) 등 성능 지표에서 압도적인 수치를 기록합니다.",
    footer: "[표] M 시리즈 칩셋별 성능 비교",
    createdAt: "2025-11-01T09:15:00",
    updatedAt: null,
  },
  {
    id: 5,
    deckId: 1,
    order: 5,
    imageName: "img_apple_5",
    title: "서비스 번들 전략을 통한 반복 매출 확대",
    content:
      "• Apple One 번들을 통해 음악, TV, 클라우드, 게임 서비스를 하나의 구독 경험으로 묶었습니다.\n• 하드웨어 판매 이후에도 서비스 매출이 지속적으로 발생하는 구조를 만들었습니다.\n• 기기 생태계와 서비스 경험이 결합되면서 사용자의 이탈 가능성을 낮춥니다.",
    footer: "",
    createdAt: "2025-11-01T09:20:00",
    updatedAt: null,
  },
  {
    id: 6,
    deckId: 1,
    order: 6,
    imageName: "image6",
    title: "개인정보 보호 중심의 브랜드 차별화",
    content:
      "• App Tracking Transparency 정책을 통해 개인정보 보호를 핵심 브랜드 메시지로 강화했습니다.\n• 사용자는 앱별 추적 권한을 직접 제어할 수 있습니다.\n• 보안과 프라이버시를 제품 경험의 일부로 설계해 신뢰 기반의 경쟁 우위를 확보합니다.",
    footer: "[인용] Privacy. That's Apple.",
    createdAt: "2025-11-01T09:25:00",
    updatedAt: null,
  },
  {
    id: 7,
    deckId: 1,
    order: 7,
    imageName: "image7",
    title: "공급망 관리와 제조 역량",
    content:
      "• 글로벌 공급망을 장기 계약 중심으로 운영해 핵심 부품의 안정적인 수급을 확보합니다.\n• 대규모 생산 능력은 신제품 출시 초기 수요를 빠르게 흡수하는 기반이 됩니다.\n• 품질 관리와 물류 최적화를 통해 프리미엄 제품 경험을 일정하게 유지합니다.",
    footer: "",
    createdAt: "2025-11-01T09:30:00",
    updatedAt: null,
  },
  {
    id: 8,
    deckId: 1,
    order: 8,
    imageName: "image8",
    title: "AR 및 공간 컴퓨팅 시장 진입",
    content:
      "• Vision Pro를 통해 공간 컴퓨팅이라는 새로운 제품 카테고리에 진입했습니다.\n• 기존 iOS 앱 생태계와 개발자 도구를 활용해 초기 콘텐츠 기반을 확보합니다.\n• 장기적으로는 업무, 엔터테인먼트, 커뮤니케이션 경험을 재정의할 가능성이 있습니다.",
    footer: "[다이어그램] 공간 컴퓨팅 생태계 확장 구조",
    createdAt: "2025-11-01T09:35:00",
    updatedAt: null,
  },
  {
    id: 9,
    deckId: 1,
    order: 9,
    imageName: "image9",
    title: "개발자 생태계와 앱스토어 네트워크 효과",
    content:
      "• App Store는 개발자와 사용자가 만나는 핵심 유통 채널입니다.\n• 높은 결제 신뢰도와 글로벌 배포 환경은 개발자가 Apple 플랫폼을 우선 고려하게 만듭니다.\n• 앱 품질 관리와 리뷰 시스템은 플랫폼 전체의 사용자 경험을 일정 수준 이상으로 유지합니다.",
    footer: "",
    createdAt: "2025-11-01T09:40:00",
    updatedAt: null,
  },
  {
    id: 10,
    deckId: 1,
    order: 10,
    imageName: "image10",
    title: "프리미엄 가격 전략과 브랜드 충성도",
    content:
      "• Apple은 고가 정책을 유지하면서도 제품 완성도와 서비스 경험으로 가격 저항을 낮춥니다.\n• 중고가 방어와 긴 소프트웨어 지원은 총소유비용 관점의 설득력을 만듭니다.\n• 브랜드 충성도는 신제품 출시 때 반복 구매와 초기 수요를 견인합니다.",
    footer: "[그래프] iPhone 평균 판매 단가 추이",
    createdAt: "2025-11-01T09:45:00",
    updatedAt: null,
  },
  {
    id: 11,
    deckId: 1,
    order: 11,
    imageName: "image11",
    title: "온디바이스 AI와 개인화 경험",
    content:
      "• 온디바이스 처리 방식은 개인정보 보호와 빠른 응답성을 동시에 확보합니다.\n• 기기 내 데이터 맥락을 활용해 더 개인화된 추천과 자동화 경험을 제공할 수 있습니다.\n• 하드웨어, OS, 앱 생태계를 모두 통제하는 구조가 AI 기능 확산에 유리하게 작동합니다.",
    footer: "",
    createdAt: "2025-11-01T09:50:00",
    updatedAt: null,
  },
  {
    id: 12,
    deckId: 1,
    order: 12,
    imageName: "image12",
    title: "결론: 통합 생태계가 만든 지속 가능한 우위",
    content:
      "• Apple의 경쟁 우위는 단일 제품 성능이 아니라 통합된 생태계 경험에서 발생합니다.\n• 하드웨어, 소프트웨어, 서비스, 보안, 브랜드가 서로 강화되는 구조를 형성합니다.\n• 이러한 구조는 단기간에 복제하기 어려운 진입 장벽으로 작동합니다.",
    footer: "[요약] 사용자 경험 중심의 통합 전략",
    createdAt: "2025-11-01T09:55:00",
    updatedAt: null,
  },
];
