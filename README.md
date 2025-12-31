# 포트폴리오 웹사이트

ChatGPT에서 정리한 경력을 바탕으로 제작한 개인 포트폴리오 웹사이트입니다.

## 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **애니메이션**: Framer Motion
- **데이터 관리**: Excel 파일 기반
- **배포**: Vercel, Netlify 등 정적 호스팅

## 시작하기

### 설치

```bash
npm install
# 또는
yarn install
# 또는
pnpm install
```

### 엑셀 파일 설정

1. `data/portfolio.xlsx` 파일을 생성하세요
2. `scripts/createExcelTemplate.ts`를 실행하여 템플릿을 생성할 수 있습니다:
   ```bash
   npm run create:excel
   ```
3. 데이터 빌드:
   ```bash
   npm run build:data
   ```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
npm start
```

빌드 시 자동으로 엑셀 파일을 읽어서 데이터를 생성합니다.

## 프로젝트 구조

```
.
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 메인 페이지
│   └── globals.css        # 전역 스타일
├── components/            # React 컴포넌트
│   ├── Navigation.tsx     # 네비게이션 바
│   ├── Hero.tsx           # 히어로 섹션
│   ├── About.tsx          # 소개 섹션
│   ├── Experience.tsx     # 경력 타임라인
│   ├── Skills.tsx         # 스킬 섹션
│   ├── Projects.tsx       # 프로젝트 포트폴리오
│   └── Contact.tsx        # 연락처 섹션
├── data/                  # 데이터 파일
│   ├── portfolio.xlsx     # 엑셀 파일 (직접 작성)
│   ├── portfolio.ts       # 데이터 로더 (자동)
│   └── portfolio-generated.ts  # 생성된 데이터 (자동 생성)
├── scripts/               # 스크립트
│   └── readExcel.ts       # 엑셀 파일 읽기 스크립트
└── public/                # 정적 파일
    └── resume.pdf         # 이력서 PDF (추가 필요)
```

## 데이터 수정하기

포트폴리오 내용을 수정하려면 **`data/portfolio.xlsx`** 파일을 엑셀로 열어서 수정하세요.

### 엑셀 파일 구조

**시트 구성:**
1. **개인정보**: 이름, 직책, 소개, 연락처 등
2. **경력**: 회사명, 직책, 기간, 설명, 기술스택
3. **프로젝트**: 제목, 설명, 문제, 해결책, 결과, 기술스택 등
4. **스킬**: 카테고리별 스킬과 레벨

### 업데이트 프로세스

1. `data/portfolio.xlsx` 파일을 엑셀로 열어서 수정
2. 저장
3. `npm run build:data` 실행 (또는 개발 서버 재시작)
4. 웹사이트에서 확인

## 커스터마이징

### 색상 변경

`tailwind.config.ts` 파일에서 색상 팔레트를 수정하세요:

```typescript
colors: {
  primary: {
    // 원하는 색상으로 변경
  },
}
```

### 다크 모드

다크 모드는 시스템 설정에 따라 자동으로 적용됩니다. 수동으로 제어하려면 `app/layout.tsx`를 수정하세요.

## 배포

Git을 통한 배포 방법은 `DEPLOYMENT_GUIDE.md` 파일을 참고하세요.

## 참고 자료

- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Framer Motion 문서](https://www.framer.com/motion/)
- [xlsx 라이브러리](https://docs.sheetjs.com/)

## 라이선스

MIT
