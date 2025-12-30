// 간단한 엑셀 템플릿 생성 스크립트
const XLSX = require('xlsx');
const path = require('path');

const workbook = XLSX.utils.book_new();

// 1. 개인정보 시트
const personalInfoData = [
  ['항목', '값'],
  ['이름', '문진경'],
  ['직책', 'Product Owner / Product Manager'],
  ['소개', '데이터와 UX 중심 사고로, 서비스 문제를 수치로 해결하는 기획자입니다. 신규 서비스 기획부터 운영·고도화까지 경험한 PO로, 복잡한 문제를 구조화해 사용자와 비즈니스 모두가 이기는 해답을 설계합니다.'],
  ['이메일', 'your.email@example.com'],
  ['LinkedIn', ''],
  ['GitHub', ''],
  ['이력서', '/resume.pdf'],
  ['프로필사진', '/profil.jpg.JPG'],
];
const personalInfoSheet = XLSX.utils.aoa_to_sheet(personalInfoData);
XLSX.utils.book_append_sheet(workbook, personalInfoSheet, '개인정보');

// 2. 경력 시트
const experienceData = [
  ['회사명', '직책', '기간', '시작일', '종료일', '설명 (줄바꿈으로 구분)', '기술스택 (쉼표로 구분)'],
  ['(주) 타이드스퀘어', 'Product Owner', '2022.02 - 재직중', '2022-02', '', '국내 최초 NDC Aggregator 플랫폼 Halo 내 운영 대시보드 LUNA 기획 총괄\nAPI 서비스 및 고객 니즈 분석을 통한 프로젝트 범위 선정 및 요구사항 수립\n예약/취소/환불/변경 등 항공권 사후처리 프로세스 시스템화 및 운영 효율화 기능 설계\n항공사 개발환경 셋업 및 UAT 진행 - Use Case/Work Flow 및 XML Logs 검증 및 시뮬레이션\n온라인 여행사 및 커머스 사업자(스카이스캐너, 카약, 네이버) 서비스 제공을 위한 항공사별 Use Case/Work Flow 수립\n스프린트 운영으로 기획, 개발, 디자인, 사업 등 유관부서와 협력 리딩\n회원가입/로그인 개선 프로젝트 - 이메일, 휴대폰, SNS(Kakao/Naver/Apple) 간편가입·로그인 정책 설계, PC/MO UX 통합, 점유 인증/해제, 자동 로그인 로직 설계 (신규 가입율 100% 증가, 로그인 이탈률 24% 감소)\nAI 기반 항공 환불 수수료 조회 프로젝트 - 항공사별 복잡한 환불 규정 데이터 구조화 및 AI 학습 데이터셋 구축, 봇·마이페이지·상담센터 화면 연동 (항공 환불 수수료 CS 70% 절감)\n상담센터 운영 기획 - 사내 상담센터 시스템(그룹웨어, 어드민, 상담시스템) 기획 및 유지보수, 상담 프로세스 개선\n글로벌 공급사 GetYourGuide의 리뷰 API 연동 기획 - 상품 상세 내 별점·후기 노출로 유입율 및 신뢰도 제고 (네이버쇼핑 전시 순위 상승으로 유입률 30% 상승)', 'Figma, JIRA, Notion, GA4, Axure RP, Confluence, Slack'],
  ['주식회사 자이냅스', '서비스 기획 / 프로젝트 관리', '2021.11 - 2022.01', '2021-11', '2022-01', '영상/음성 합성 기술을 활용한 서비스 기획 및 프로젝트 관리\nAI 기술을 활용한 제 20대 대선 개표 방송 및 선거 영상 제작 프로젝트\n티앱 셀럽 내비게이션 AI 음성 납품 프로젝트\nAI 기술 마케팅 콘텐츠 기획 - 고인이 된 화가가 자신의 작품을 설명하는 유튜브 콘텐츠 "AI 뮤지엄"\n마블 캐릭터를 활용한 AI "MBTI 테스트" 기획 및 개발 (HTML, CSS, JS)\nTTS(Text to speech, 가상음성)를 활용한 오디오 성경 앱 "바이블리" 화면 기획\n서비스 운영/마케팅 - 운영 컨텐츠 제작(이벤트, 기획전, 프로모션) 및 플랫폼 관리\n고객센터 운영 기획 및 KPI 모니터링, 뉴스레터·카드뉴스 등 마케팅 콘텐츠 제작 및 성과 분석(GA 기반)', 'Figma, Notion, Google Analytics, HTML, CSS, JavaScript'],
  ['키위블랙 B2B 원단 플랫폼', 'Product Manager', '2019.04 - 2021.11', '2019-04', '2021-11', '플랫폼 신규 구축 - 신규 서비스 런칭 PM으로 회원가입·스와치신청·원단발주·결제·출고·알림 등 풀 사이클 기획 (신규 고객 확보 및 B2B 시장 진출 기반 마련)\n고도화 프로젝트 - 전상품 카테고리화, 추천상품 기능 추가, 메인/모바일웹/카테고리 UI 개편\n검색·추천 서비스 고도화 (사용자 편의성 및 검색·구매 경험 개선)\nOMS/WMS 운영 시스템 구축 - 상품·주문·고객·CMS 관리 Back-office 기획 및 QA (운영 효율 증대 및 내부 관리 체계 확립)', 'Figma, Axure RP, JIRA, Notion'],
];
const experienceSheet = XLSX.utils.aoa_to_sheet(experienceData);
XLSX.utils.book_append_sheet(workbook, experienceSheet, '경력');

// 3. 프로젝트 시트
const projectData = [
  ['제목', '설명', '문제', '해결책', '결과', '기간', '역할', '기술스택', 'GitHub', '데모', '웹사이트', '이미지'],
  ['회원가입/로그인 개선 프로젝트', 'B2C 여행 플랫폼 전환의 성패를 좌우하는 로그인 구조 개편 프로젝트', '분리된 가입 구조로 인한 높은 이탈률과 사용자 접근성 문제', '이메일·휴대폰·SNS 통합 로그인 설계, 점유 인증/해제 로직 표준화, 자동 로그인 및 CS 대응 정책 문서화', '신규 가입률 100% 증가, 로그인 이탈률 24% 감소', '2022.03 - 2022.08', 'Product Owner (기획 총괄)', 'Figma, Axure RP, JIRA', '', '', '', ''],
  ['AI 기반 항공 환불 수수료 조회', '복잡한 항공사 규정을 AI 학습셋으로 구조화한 데이터·AI 접점 기획 사례', '항공사별 환불 규정이 복잡해 CS 문의 과다 발생', '환불 규정 구조화 → AI 학습 데이터셋 구축, 챗봇·마이페이지·상담센터 연동', '환불 CS 문의 70% 감소', '2022.09 - 2023.02', 'Product Owner (기획 총괄)', 'Figma, JIRA', '', '', '', ''],
  ['항공 Aggregator 플랫폼 \'LUNA\' 기획 총괄', '국내 최초 NDC Aggregator 시스템 운영 대시보드 기획 총괄', '항공사·OTA별 예약 프로세스가 상이하여 운영 효율성 저하', 'Aggregator 표준화 설계, Use Case/XML 로그 검증, 운영 대시보드 기획 및 UAT 리딩', '항공사/OTA 표준화 및 자동화 기반 확보, 운영 효율 고도화', '2022.05 - 2023.12', 'Product Owner (기획 총괄)', 'Figma, JIRA, Notion, Confluence', '', '', '', ''],
  ['GetYourGuide(GYG) 리뷰 API 연동', '글로벌 API 연동 → 상품 상세 개선 → 외부 트래픽 증대의 End-to-End 퍼포먼스 개선 사례', '후기 부재로 인한 전환률 저하 및 신뢰도 부족', 'GYG API 연동 → 상세페이지 후기/별점 노출, UI·UX 최적화', '유입률 30% 상승, 네이버쇼핑 전시 순위 상승, 신뢰도 향상', '2023.03 - 2023.06', 'Product Owner', 'Figma, JIRA, GA4', '', '', '', ''],
  ['키위블랙 B2B 원단 플랫폼 신규 구축', '서비스 런칭 전체 사이클 경험 (회원가입~결제~출고)', '원단 거래의 비효율 및 수동 업무 과다', '회원가입~결제~출고까지 Full Life Cycle 플랫폼 구축', '신규고객 확보, B2B 시장 진출 기반 구축', '2019.04 - 2021.11', 'Product Manager', 'Figma, Axure RP, JIRA', '', '', '', ''],
  ['상담센터 운영 시스템 기획', '고객 접점 운영 효율 개선 사례', '상담 프로세스 비효율 및 CS 품질 관리 필요', '상담 로그 분석 → 상담 프로세스 개선, 운영 시스템 구축', 'CS 품질 향상, 상담원 만족도 향상', '2023.01 - 2023.05', 'Product Owner', 'Figma, JIRA, Notion', '', '', '', ''],
];
const projectSheet = XLSX.utils.aoa_to_sheet(projectData);
XLSX.utils.book_append_sheet(workbook, projectSheet, '프로젝트');

// 4. 스킬 시트
const skillData = [
  ['카테고리', '스킬명', '레벨'],
  ['Product Planning & Collaboration', 'Figma', '상'],
  ['', 'Axure RP', '중'],
  ['', 'JIRA', '상'],
  ['', 'Notion', '중'],
  ['', 'Slack', '상'],
  ['', 'Confluence', '중'],
  ['', 'Bot 기획', '중'],
  ['Data & Growth', 'GA4', '중'],
  ['', 'SQL', '하'],
  ['', 'Excel Pivot', '중'],
  ['기타 도구 & 언어', 'HTML·CSS', '하'],
  ['', 'CURSOR AI', '중'],
  ['', '중국어', '상'],
  ['핵심 역량', 'Full Life Cycle 기획', ''],
  ['', '데이터 기반 성과관리', ''],
  ['', 'CX 자동화', ''],
  ['', 'AI & 운영 효율화', ''],
  ['', '스프린트 리딩', ''],
  ['', 'UAT 검증', ''],
];
const skillSheet = XLSX.utils.aoa_to_sheet(skillData);
XLSX.utils.book_append_sheet(workbook, skillSheet, '스킬');

// 5. 학력 시트
const educationData = [
  ['학교명', '기간', '상태', '전공', '학위'],
  ['한국외국어대학교 교육대학원', '2012.09 - 2020.02', '졸업', '중국어교육전공', ''],
  ['중국베이징사범대학교', '2008.02 - 2012.01', '졸업', '중국어과', ''],
];
const educationSheet = XLSX.utils.aoa_to_sheet(educationData);
XLSX.utils.book_append_sheet(workbook, educationSheet, '학력');

// 파일 저장
const outputPath = path.join(process.cwd(), 'data', 'portfolio.xlsx');
XLSX.writeFile(workbook, outputPath);
console.log('✅ 엑셀 템플릿 파일이 생성되었습니다!');
console.log(`📄 파일 위치: ${outputPath}`);
console.log('\n이제 엑셀 파일을 열어서 내용을 수정한 후 npm run build:data를 실행하세요.');

