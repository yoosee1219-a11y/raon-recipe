# 🔧 환경 변수 설정 가이드

이 문서는 한국 레시피 플랫폼의 환경 변수 설정 방법을 안내합니다.

## 📋 필수 설정

### 1. .env.local 파일 생성

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수들을 설정하세요:

```bash
# Next.js 기본 설정
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-32-character-string
```

### 2. 데이터베이스 설정 (MongoDB)

```bash
DATABASE_URL=mongodb://localhost:27017/korean-recipe-platform
MONGODB_URI=mongodb://localhost:27017/korean-recipe-platform
```

## 🔑 외부 서비스 API 키

### YouTube API (레시피 동영상용)

```bash
YOUTUBE_API_KEY=your-youtube-api-key-here
```

**설정 방법:**

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 프로젝트 생성 또는 선택
3. YouTube Data API v3 활성화
4. API 키 생성

### Google AdSense (광고 수익)

```bash
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxxx
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

**설정 방법:**

1. [Google AdSense](https://www.google.com/adsense/) 계정 생성
2. 사이트 추가 및 승인 대기
3. 광고 단위 생성

### 쿠팡 파트너스 (수익 창출)

```bash
COUPANG_ACCESS_KEY=your-coupang-access-key-here
COUPANG_SECRET_KEY=your-coupang-secret-key-here
NEXT_PUBLIC_COUPANG_AFFILIATE_ID=your-affiliate-id-here
```

**설정 방법:**

1. [쿠팡 파트너스](https://partners.coupang.com/) 계정 생성
2. API 신청 및 승인
3. API 키 발급

## 🤖 AI 서비스 (선택사항)

### OpenAI (레시피 분석용)

```bash
OPENAI_API_KEY=your-openai-api-key-here
```

**용도:** YouTube 동영상에서 레시피 자동 추출

## 📁 파일 저장소 (선택사항)

### Cloudinary

```bash
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

**용도:** 레시피 이미지 업로드 및 최적화

## 📧 이메일 서비스 (선택사항)

### SendGrid

```bash
SENDGRID_API_KEY=your-sendgrid-api-key-here
FROM_EMAIL=noreply@your-domain.com
```

**용도:** 회원가입, 비밀번호 재설정 등

## 🔐 보안 설정

### JWT 및 암호화 키

```bash
JWT_SECRET=generate-a-random-64-character-string
ENCRYPTION_KEY=generate-a-random-32-character-string
```

**키 생성 방법:**

```bash
# Node.js에서 랜덤 키 생성
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🔗 소셜 로그인 (선택사항)

### Google OAuth

```bash
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
```

### 네이버 OAuth

```bash
NAVER_CLIENT_ID=your-naver-oauth-client-id
NAVER_CLIENT_SECRET=your-naver-oauth-client-secret
```

### 카카오 OAuth

```bash
KAKAO_CLIENT_ID=your-kakao-oauth-client-id
KAKAO_CLIENT_SECRET=your-kakao-oauth-client-secret
```

## 🚀 개발 환경 설정

### 최소 필수 설정 (로컬 개발용)

현재 기본 기능만 사용하려면 다음만 설정하면 됩니다:

```bash
# .env.local 파일에 추가
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 캐싱 (선택사항)

```bash
REDIS_URL=redis://localhost:6379
```

## 📝 설정 완료 확인

1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 필요한 환경 변수가 모두 설정되었는지 확인
3. 개발 서버 재시작: `npm run dev`

## ⚠️ 주의사항

- `.env.local` 파일은 절대 Git에 커밋하지 마세요
- 프로덕션 환경에서는 환경 변수를 안전하게 관리하세요
- API 키는 정기적으로 갱신하세요
- 사용하지 않는 서비스의 환경 변수는 설정하지 않아도 됩니다

## 🆘 문제 해결

### 일반적인 문제들:

1. **환경 변수가 인식되지 않는 경우**

   - 개발 서버를 재시작하세요
   - 변수명이 `NEXT_PUBLIC_`로 시작하는지 확인하세요 (클라이언트에서 사용하는 경우)

2. **API 키 관련 오류**

   - 키 형식이 올바른지 확인하세요
   - API 사용 제한이나 권한을 확인하세요

3. **MongoDB 연결 오류**
   - MongoDB가 실행 중인지 확인하세요
   - 연결 문자열이 올바른지 확인하세요

현재 애플리케이션은 환경 변수 없이도 기본 기능이 작동하도록 구현되어 있습니다!
