# Git 배포 가이드

이 가이드는 GitHub를 통해 포트폴리오를 배포하는 방법을 단계별로 안내합니다.

## 📋 준비사항

- ✅ Git 저장소 초기화 완료
- ✅ 첫 커밋 완료
- GitHub 계정 (uuboogie0911@gmail.com)

## 🚀 배포 방법 1: GitHub + Vercel (추천)

Vercel은 Next.js 프로젝트를 무료로 빠르게 배포할 수 있는 서비스입니다.

### 1단계: GitHub 저장소 생성

1. [GitHub](https://github.com)에 로그인합니다.
2. 우측 상단의 **+** 버튼을 클릭하고 **New repository**를 선택합니다.
3. 저장소 설정:
   - **Repository name**: `portfolio` (또는 원하는 이름)
   - **Description**: "My Portfolio Website" (선택사항)
   - **Public** 또는 **Private** 선택
   - **⚠️ 중요**: "Initialize this repository with a README" 체크박스는 **체크하지 마세요!**
4. **Create repository** 버튼을 클릭합니다.

### 2단계: 로컬 저장소를 GitHub에 연결

GitHub에서 저장소를 생성하면 나오는 화면에서 다음 명령어를 복사하거나, 아래 명령어를 사용하세요:

```bash
# GitHub 저장소 URL을 YOUR_USERNAME과 YOUR_REPO_NAME으로 변경하세요
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

**예시:**
```bash
git remote add origin https://github.com/uuboogie0911/portfolio.git
git branch -M main
git push -u origin main
```

> **참고**: GitHub에서 기본 브랜치 이름이 `main`인 경우, 위 명령어를 사용하세요. 
> 만약 `master`를 사용한다면 `git branch -M main` 명령어는 생략하세요.

### 3단계: Vercel에 배포

1. [Vercel](https://vercel.com)에 접속합니다.
2. **Sign Up** 또는 **Log In**을 클릭합니다.
3. **Continue with GitHub**를 선택하여 GitHub 계정으로 로그인합니다.
4. 대시보드에서 **Add New...** → **Project**를 클릭합니다.
5. 방금 만든 GitHub 저장소를 선택합니다.
6. 프로젝트 설정:
   - **Framework Preset**: Next.js (자동 감지됨)
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` (기본값)
   - **Output Directory**: `.next` (기본값)
7. **Deploy** 버튼을 클릭합니다.
8. 배포가 완료되면 (약 1-2분) 자동으로 생성된 URL이 표시됩니다!

### 4단계: 자동 배포 설정 (이미 완료됨)

Vercel은 GitHub 저장소와 연결되면 자동으로:
- ✅ 코드를 푸시할 때마다 자동 배포
- ✅ Pull Request마다 미리보기 배포
- ✅ 무료 HTTPS 인증서 제공
- ✅ 전 세계 CDN으로 빠른 로딩

## 🔄 업데이트 배포하기

코드를 수정한 후 배포하려면:

```bash
# 1. 변경사항 확인
git status

# 2. 변경된 파일 추가
git add .

# 3. 커밋
git commit -m "Update portfolio content"

# 4. GitHub에 푸시
git push

# 5. Vercel이 자동으로 배포를 시작합니다!
```

## 🌐 커스텀 도메인 설정 (선택사항)

1. Vercel 대시보드에서 프로젝트 선택
2. **Settings** → **Domains**로 이동
3. 원하는 도메인을 입력하고 **Add** 클릭
4. DNS 설정 안내를 따르세요

## 📝 배포 방법 2: GitHub Pages (대안)

GitHub Pages를 사용하려면 Next.js를 정적 사이트로 빌드해야 합니다.

### Next.js 설정 변경

`next.config.mjs` 파일을 다음과 같이 수정:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
```

### package.json에 배포 스크립트 추가

```json
{
  "scripts": {
    "deploy": "npm run build && touch out/.nojekyll && git add out && git commit -m 'Deploy' && git subtree push --prefix out origin gh-pages"
  }
}
```

### 배포

```bash
npm run deploy
```

## ❓ 문제 해결

### Git 푸시 오류

**오류**: `remote: Support for password authentication was removed`
**해결**: GitHub Personal Access Token을 사용하거나 SSH 키를 설정하세요.

1. [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. **Generate new token** 클릭
3. 권한 선택: `repo` 체크
4. 토큰 생성 후 복사
5. 푸시할 때 비밀번호 대신 토큰 사용

### Vercel 빌드 오류

- `package.json`의 `build` 스크립트 확인
- 환경 변수가 필요한 경우 Vercel 대시보드에서 설정
- 빌드 로그 확인하여 구체적인 오류 메시지 확인

## 📚 유용한 링크

- [GitHub Docs](https://docs.github.com)
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**도움이 필요하시면 언제든지 물어보세요!** 🚀




