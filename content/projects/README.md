# 프로젝트별 추가 문서 가이드

각 프로젝트에 추가적인 문서나 내용을 추가하려면 다음 방법을 사용하세요.

## 1. 마크다운 문서 추가

각 프로젝트별로 `content/projects/{project-id}.md` 파일을 생성하면 프로젝트 상세 페이지의 "추가 정보" 섹션에 표시됩니다.

### 파일 구조
```
content/
  projects/
    proj-1.md  (회원가입·로그인 개선 프로젝트)
    proj-2.md  (AI 기반 항공 환불 수수료 조회)
    proj-3.md  (항공 Aggregator 플랫폼 'LUNA')
    proj-4.md  (GetYourGuide 리뷰 API 연동)
    proj-5.md  (키위블랙 B2B 원단 플랫폼)
    proj-6.md  (상담센터 운영 시스템)
```

### 예시: `content/projects/proj-1.md`
```markdown
# 추가 정보

## 주요 화면

### 로그인 화면
- 간편 로그인 옵션 제공
- 비회원 구매 옵션 노출

### 회원가입 화면
- 단계별 가입 프로세스
- 최소 정보 입력으로 간편 가입

## 데이터 분석 결과

- 전환율: 2배 이상 개선
- 이탈률: 24% 감소
```

## 2. 이미지 추가

각 프로젝트별로 `public/projects/{project-id}/` 폴더에 이미지를 추가하면 프로젝트 상세 페이지의 "프로젝트 이미지" 섹션에 표시됩니다.

### 폴더 구조
```
public/
  projects/
    proj-1/
      hero.jpg          (히어로 이미지로 사용됨)
      screen-1.png
      screen-2.png
      flow-diagram.png
    proj-2/
      hero.jpg
      ...
```

### 이미지 파일 형식
- 지원 형식: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- 첫 번째 이미지는 자동으로 히어로 이미지로 사용됩니다.

### 이미지 순서 제어
이미지가 표시되는 순서를 제어하려면 파일명 앞에 숫자를 붙여주세요:

**권장 파일명 형식:**
```
public/
  projects/
    proj-1/
      01-hero.jpg          ← 히어로 이미지 (첫 번째)
      02-screen-1.png      ← 갤러리 첫 번째 이미지
      03-screen-2.png      ← 갤러리 두 번째 이미지
      04-flow-diagram.png  ← 갤러리 세 번째 이미지
```

**정렬 규칙:**
- 파일명 앞에 숫자가 있으면 숫자 순서로 정렬됩니다 (예: `01-`, `02-`, `03-`)
- 숫자가 없으면 알파벳 순서로 정렬됩니다
- 숫자와 알파벳이 섞여 있으면 숫자 우선, 그 다음 알파벳 순서로 정렬됩니다

## 3. 프로젝트 데이터 수정

프로젝트의 기본 정보(개요, 산출물, 프로세스 등)를 수정하려면:

1. **엑셀 파일 수정** (권장)
   - `data/portfolio.xlsx` 파일의 "프로젝트" 시트 수정
   - `npm run build:data` 실행

2. **직접 수정** (임시)
   - `data/portfolio-generated.ts` 파일 직접 수정
   - ⚠️ 주의: `npm run build:data` 실행 시 덮어씌워집니다.

## 4. 프로젝트별 필드 설명

각 프로젝트 객체에는 다음 필드들이 있습니다:

- `projectOverview`: 프로젝트 개요
  - `duration`: 개발 기간
  - `teamSize`: 투입 인원
  - `responsibilities`: 주요 담당 업무 배열

- `deliverables`: 주요 산출물 배열

- `process`: 프로세스 설명 (줄바꿈으로 구분)

## 5. 예시: 프로젝트 데이터 구조

```typescript
{
  "id": "proj-1",
  "title": "프로젝트명",
  "description": "프로젝트 설명",
  "problem": "문제 정의",
  "solution": "해결 방법",
  "results": "결과",
  "projectOverview": {
    "duration": "6개월",
    "teamSize": "기획 1명, 개발 3명",
    "responsibilities": [
      "담당 업무 1",
      "담당 업무 2"
    ]
  },
  "deliverables": [
    "산출물 1",
    "산출물 2"
  ],
  "process": "1. 단계 1\n2. 단계 2"
}
```
