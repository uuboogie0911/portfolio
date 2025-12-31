// 이 파일은 자동 생성됩니다. data/portfolio.xlsx 파일을 수정한 후 npm run build:data를 실행하세요.
// 직접 수정하지 마세요!

export interface ExperienceItem {
  title: string;
  details: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  startDate: string;
  endDate: string | null;
  items: ExperienceItem[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  goal?: string | null;
  flow?: {
    before: string;
    after: string;
  };
  keyDecisions?: string[];
  solution: string;
  results: string;
  technologies: string[];
  period: string;
  role?: string;
  developmentPeriod?: string;
  teamSize?: string;
  image?: string;
  links?: {
    github?: string;
    demo?: string;
    website?: string;
  };
  deliverables?: {
    category: string;
    name: string;
    image: string;
  }[];
}

export interface Skill {
  category: string;
  items: {
    name: string;
    level?: '상' | '중' | '하';
  }[];
}

export interface Education {
  id: string;
  school: string;
  period: string;
  status: string;
  major: string;
  degree?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  linkedin?: string;
  github?: string;
  resume?: string;
  profileImage?: string;
}

export const personalInfo: PersonalInfo = {
  "name": "문진경",
  "title": "Product Owner / Product Manager",
  "bio": "데이터와 UX 중심 사고로, 서비스 문제를 수치로 해결하는 기획자입니다. 신규 서비스 기획부터 운영·고도화까지 경험한 PO로, 복잡한 문제를 구조화해 사용자와 비즈니스 모두가 이기는 해답을 설계합니다.",
  "email": "uuboogie0911@gmail.com",
  "linkedin": "010-3199-7887",
  "github": "",
  "resume": "/resume.pdf",
  "profileImage": "/profil.jpg.JPG"
};

export const experiences: Experience[] = [
  {
    "id": "exp-1",
    "company": "(주) 타이드스퀘어",
    "position": "Product Owner",
    "period": "2022.02 - 재직중",
    "startDate": "2022-02",
    "endDate": null,
    "items": [
      {
        "title": "항공 Aggregator 플랫폼 - 국내 최초 NDC Aggregator 플랫폼 Halo 내 운영 대시보드 LUNA 기획 총괄",
        "details": [
          "API 서비스 및 고객 니즈 분석을 통한 프로젝트 범위 선정 및 요구사항 수립",
          "예약/취소/환불/변경 등 항공권 사후처리 프로세스 시스템화",
          "운영 효율화 기능 설계"
        ]
      },
      {
        "title": "항공 Aggregator 플랫폼 - 항공사 개발환경 셋업 및 UAT 진행",
        "details": [
          "Use Case/Work Flow 및 XML Logs 검증 및 시뮬레이션"
        ]
      },
      {
        "title": "항공 Aggregator 플랫폼 - 운영",
        "details": [
          "온라인 여행사 및 커머스 사업자(스카이스캐너, 카약, 네이버) 서비스 제공을 위한 항공사별 Use Case/Work Flow 수립",
          "스프린트 운영으로 기획, 개발, 디자인, 사업 등 유관부서와 협력 리딩(스프린트 계획, 요구사항 정의, 테스트 기획)"
        ]
      },
      {
        "title": "회원가입/로그인 개선 프로젝트",
        "details": [
          "이메일, 휴대폰, SNS(Kakao/Naver/Apple) 간편가입·로그인 정책 설계",
          "PC/MO UX 통합, 점유 인증/해제, 자동 로그인 로직 설계",
          "월별 신규 가입율 2배 증가, 로그인 이탈률 24% 감소"
        ]
      },
      {
        "title": "AI 기반 항공 환불 수수료 조회 프로젝트",
        "details": [
          "항공사별 복잡한 환불 규정 데이터 구조화 및 AI 학습 데이터셋 구축",
          "봇·마이페이지·상담센터 화면 연동으로 고객 자기해결 기능 제공",
          "항공 환불 수수료 문의 관련 CS 70% 절감"
        ]
      },
      {
        "title": "상담센터 운영 기획",
        "details": [
          "사내 상담센터 시스템(그룹웨어, 어드민, 상담시스템) 기획 및 유지보수",
          "상담 로그 분석, 상담 프로세스 개선",
          "성과: 상담원 만족도 및 CS 품질 향상"
        ]
      },
      {
        "title": "공급사 이용후기 연동 프로젝트 수행",
        "details": [
          "글로벌 공급사 GetYourGuide의 리뷰 API 연동 기획",
          "상품 상세 내 별점·후기 노출로 유입율 및 신뢰도 제고",
          "네이버쇼핑 전시 순위 상승으로 유입률 30% 상승"
        ]
      }
    ],
    "technologies": []
  },
  {
    "id": "exp-2",
    "company": "주식회사 자이냅스",
    "position": "서비스 기획 / 프로젝트 관리",
    "period": "2021.11 - 2022.01",
    "startDate": "2021-11",
    "endDate": "2022-01",
    "items": [
      {
        "title": "프로젝트 관리",
        "details": [
          "AI 기술을 활용한 제 20대 대선 개표 방송 및 선거 영상 제작 프로젝트",
          "티맵 셀럽 내비게이션 AI 음성 납품 프로젝트"
        ]
      },
      {
        "title": "AI 기술 마케팅 콘텐츠 기획",
        "details": [
          "고인이 된 화가가 자신의 작품을 설명하는 유튜브 콘텐츠 \"AI 뮤지엄\"",
          "마블 캐릭터를 활용한 AI \"MBTI 테스트\" 기획 및 개발 (HTML, CSS, JS)"
        ]
      },
      {
        "title": "서비스 기획",
        "details": [
          "TTS(Text to speech, 가상음성)를 활용한 오디오 성경 앱 \"바이블리\" 화면 기획"
        ]
      }
    ],
    "technologies": []
  },
  {
    "id": "exp-3",
    "company": "(주)디알코퍼레이션",
    "position": "Product Manager / 무역",
    "period": "2019.04 - 2021.11",
    "startDate": "2019-04",
    "endDate": "2021-11",
    "items": [
      {
        "title": "키위블랙 B2B 원단 플랫폼 기획 - 플랫폼 신규 구축",
        "details": [
          "신규 서비스 런칭 PM (회원가입·스와치신청·원단발주·결제·출고·알림 등 풀 사이클 기획)"
        ]
      },
      {
        "title": "키위블랙 B2B 원단 플랫폼 기획 - 고도화 프로젝트",
        "details": [
          "전상품 카테고리화, 추천상품 기능 추가",
          "메인/모바일웹/카테고리 UI 개편, 검색·추천 서비스 고도화"
        ]
      },
      {
        "title": "키위블랙 B2B 원단 플랫폼 기획 - OMS/WMS 운영 시스템 구축",
        "details": [
          "상품·주문·고객·CMS 관리 Back-office 기획 및 QA"
        ]
      },
      {
        "title": "서비스 운영/마케팅",
        "details": [
          "운영 컨텐츠 제작(이벤트, 기획전, 프로모션) 및 플랫폼 관리",
          "고객센터 운영 기획, KPI 모니터링",
          "뉴스레터·카드뉴스 등 마케팅 콘텐츠 제작 및 성과 분석(GA 기반)",
          "성과: 고객 접점 확대 및 플랫폼 인지도 강화"
        ]
      },
      {
        "title": "의류 원자재 무역",
        "details": [
          "무역 업무",
          "각종 세관 서류 번역"
        ]
      }
    ],
    "technologies": []
  },
  {
    "id": "exp-4",
    "company": "(주)트리아나PKG",
    "position": "무역/영업",
    "period": "2017.02 - 2019.04",
    "startDate": "2017.02",
    "endDate": "2019.04",
    "items": [
      {
        "title": "의류 원/부자재 무역 & 영업",
        "details": []
      }
    ],
    "technologies": []
  },
  {
    "id": "exp-5",
    "company": "중국 청도 화통행 유한공사",
    "position": "무역/번역",
    "period": "2015.01 - 2016.12",
    "startDate": "2015.01",
    "endDate": "2016.12",
    "items": [
      {
        "title": "번역 및 통역",
        "details": []
      }
    ],
    "technologies": []
  },
  {
    "id": "exp-6",
    "company": "남미숙중국어연구소",
    "position": "강사",
    "period": "2013.05 - 2014.07",
    "startDate": "2013.05",
    "endDate": "2014.07",
    "items": [
      {
        "title": "중국어 강의",
        "details": [
          "차이나로 중국어학원, 중단기 학원에서 중국어 강의 진행"
        ]
      },
      {
        "title": "중국어 교재 집필 및 감수 작업",
        "details": [
          "다수의 HSK 교재 집필 및 감수"
        ]
      }
    ],
    "technologies": []
  }
];

export const projects: Project[] = [
  {
    "id": "proj-1",
    "title": "회원가입/로그인 개선 프로젝트",
    "description": "B2C 여행 플랫폼 전환의 성패를 좌우하는 로그인 구조 개편 프로젝트",
    "problem": "분리된 가입 구조로 인한 높은 이탈률과 사용자 접근성 문제",
    "solution": "이메일·휴대폰·SNS 통합 로그인 설계, 점유 인증/해제 로직 표준화, 자동 로그인 및 CS 대응 정책 문서화",
    "results": "신규 가입률 100% 증가, 로그인 이탈률 24% 감소",
    "technologies": [],
    "period": "2022.03 - 2022.08",
    "role": "Product Owner (기획 총괄)",
    "links": {}
  },
  {
    "id": "proj-2",
    "title": "AI 기반 항공 환불 수수료 조회",
    "description": "복잡한 항공사 규정을 AI 학습셋으로 구조화한 데이터·AI 접점 기획 사례",
    "problem": "항공사별 환불 규정이 복잡해 CS 문의 과다 발생",
    "solution": "환불 규정 구조화 → AI 학습 데이터셋 구축, 챗봇·마이페이지·상담센터 연동",
    "results": "환불 CS 문의 70% 감소",
    "technologies": [],
    "period": "2022.09 - 2023.02",
    "role": "Product Owner (기획 총괄)",
    "links": {}
  },
  {
    "id": "proj-3",
    "title": "항공 Aggregator 플랫폼 'LUNA' 기획 총괄",
    "description": "국내 최초 NDC Aggregator 시스템 운영 대시보드 기획 총괄",
    "problem": "항공사·OTA별 예약 프로세스가 상이하여 운영 효율성 저하",
    "solution": "Aggregator 표준화 설계, Use Case/XML 로그 검증, 운영 대시보드 기획 및 UAT 리딩",
    "results": "항공사/OTA 표준화 및 자동화 기반 확보, 운영 효율 고도화",
    "technologies": [],
    "period": "2022.05 - 2023.12",
    "role": "Product Owner (기획 총괄)",
    "links": {}
  },
  {
    "id": "proj-4",
    "title": "GetYourGuide(GYG) 리뷰 API 연동",
    "description": "글로벌 API 연동 → 상품 상세 개선 → 외부 트래픽 증대의 End-to-End 퍼포먼스 개선 사례",
    "problem": "후기 부재로 인한 전환률 저하 및 신뢰도 부족",
    "solution": "GYG API 연동 → 상세페이지 후기/별점 노출, UI·UX 최적화",
    "results": "유입률 30% 상승, 네이버쇼핑 전시 순위 상승, 신뢰도 향상",
    "technologies": [],
    "period": "2023.03 - 2023.06",
    "role": "Product Owner",
    "links": {}
  },
  {
    "id": "proj-5",
    "title": "키위블랙 B2B 원단 플랫폼 신규 구축",
    "description": "서비스 런칭 전체 사이클 경험 (회원가입~결제~출고)",
    "problem": "원단 거래의 비효율 및 수동 업무 과다",
    "solution": "회원가입~결제~출고까지 Full Life Cycle 플랫폼 구축",
    "results": "신규고객 확보, B2B 시장 진출 기반 구축",
    "technologies": [],
    "period": "2019.04 - 2021.11",
    "role": "Product Manager",
    "links": {}
  },
  {
    "id": "proj-6",
    "title": "상담센터 운영 시스템 기획",
    "description": "고객 접점 운영 효율 개선 사례",
    "problem": "상담 프로세스 비효율 및 CS 품질 관리 필요",
    "solution": "상담 로그 분석 → 상담 프로세스 개선, 운영 시스템 구축",
    "results": "CS 품질 향상, 상담원 만족도 향상",
    "technologies": [],
    "period": "2023.01 - 2023.05",
    "role": "Product Owner",
    "links": {}
  }
];

export const skills: Skill[] = [
  {
    "category": "Product Planning & Collaboration",
    "items": [
      {
        "name": "Figma",
        "level": "상"
      },
      {
        "name": "Axure RP",
        "level": "중"
      },
      {
        "name": "JIRA",
        "level": "상"
      },
      {
        "name": "Notion",
        "level": "중"
      },
      {
        "name": "Slack",
        "level": "상"
      },
      {
        "name": "Confluence",
        "level": "중"
      },
      {
        "name": "Bot 기획",
        "level": "중"
      }
    ]
  },
  {
    "category": "Data & Growth",
    "items": [
      {
        "name": "GA4",
        "level": "중"
      },
      {
        "name": "SQL",
        "level": "하"
      },
      {
        "name": "Excel Pivot",
        "level": "중"
      }
    ]
  },
  {
    "category": "기타 도구 & 언어",
    "items": [
      {
        "name": "HTML·CSS",
        "level": "하"
      },
      {
        "name": "CURSOR AI",
        "level": "중"
      },
      {
        "name": "중국어",
        "level": "상"
      }
    ]
  },
  {
    "category": "핵심 역량",
    "items": [
      {
        "name": "Full Life Cycle 기획"
      },
      {
        "name": "데이터 기반 성과관리"
      },
      {
        "name": "CX 자동화"
      },
      {
        "name": "AI & 운영 효율화"
      },
      {
        "name": "스프린트 리딩"
      },
      {
        "name": "UAT 검증"
      }
    ]
  }
];

export const educations: Education[] = [
  {
    "id": "edu-1",
    "school": "한국외국어대학교 교육대학원 ",
    "period": "2012.09 - 2020.02",
    "status": "졸업",
    "major": "중국어교육전공",
    "degree": "석사"
  },
  {
    "id": "edu-2",
    "school": "중국베이징사범대학교",
    "period": "2008.02 - 2012.01 ",
    "status": "졸업",
    "major": "중국어과",
    "degree": "학사"
  }
];
