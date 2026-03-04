# 🌍 Travel Shop

React + Express + MongoDB 기반 여행 상품 판매 서비스

JWT 인증, 장바구니, 주문 생성, 결제 상태 관리까지 구현된 Full Stack 쇼핑몰 MVP 프로젝트입니다.

---

# 🏗 프로젝트 구조

```bash
travel-shop/
├─ client/ # React Frontend
├─ server/ # Express Backend
├─ postman.md
└─ README.md
```

---

# 📦 Tech Stack

## 🖥 Frontend
- React
- Vite
- TypeScript
- Context API
- React Router
- Axios

## 🗄 Backend
- Node.js
- Express
- TypeScript (strict)
- MongoDB (Mongoose)
- JWT
- bcrypt

---

# 🚀 실행 방법

## 1️⃣ MongoDB 실행

로컬 MongoDB:

```bash
mongodb://127.0.0.1:27017/travelshop
```

---

## 2️⃣ Backend 실행

```bash
cd server
npm install
npm run dev
```

기본 주소 :

```bash
http://localhost:5000
```

## 3️⃣ Frontend 실행

```bash
cd client
npm install
npm run dev
```

기본 주소:

```bash
http://localhost:5174
```

---

## 🔐 인증 흐름

1. 회원가입 (POST /api/auth/register)
2. 로그인 (POST /api/auth/login)
3. 서버에서 JWT 토큰 발급
4. 토큰을 localStorage에 저장
5. Axios Interceptor로 Authorization 헤더 자동 포함
6. 서버에서 JWT 인증 미들웨어로 요청 검증
7. PrivateRoute로 인증된 사용자만 보호 페이지 접근 가능

---

## 🛒 주요 기능

### ✅ 상품 목록

- 카테고리 필터
- 가격 범위 필터
- 검색 기능
- 카드형 UI

### ✅ 장바구니

- 상품 추가
- 수량 변경
- 삭제
- 총 금액 자동 계산
- 주문 완료 시 자동 비우기

### ✅ 주문 기능

- 주문 생성
- 내 주문 조회 (populate 적용)
- 결제 상태 변경 (pending → paid)

---

## 🧠 설계 특징

- 클라이언트 가격 신뢰하지 않음
- 서버에서 totalPrice 계산
- JWT 인증 미들웨어 보호
- Controller / Route / Model 분리 구조
- Context API 전역 상태 관리
- TypeScript strict 모드 적용
- any 타입 최소화

---

## 🌱 Seed 데이터

서버 실행 시 상품 데이터가 없으면 server/seed/products.json 기반으로 자동 삽입됩니다.

---

## 🧪 API 테스트

Postman 테스트 가이드는 아래 파일 참고:

```bash
postman.md
```

---

## 🔗 배포 주소

### Frontend:
https://travel-shop-full.vercel.app/

### Backend API:
https://travel-shop-rjza.onrender.com

※ Backend는 Render Free 플랜으로 배포되어 있어 첫 요청 시 지연이 발생할 수 있습니다.

---

## 📌 향후 개선 사항

- 관리자 페이지 추가
- 상품 CRUD 기능 확장
- 주문 취소 기능
- Docker 배포 구성
- Swagger API 문서화

---

## 🎯 프로젝트 목적

- Full Stack 웹 애플리케이션 구조 이해
- JWT 기반 인증 흐름 구현
- REST API 설계 경험
- Context API 상태 관리 학습
- MongoDB 관계형 데이터 처리 (populate)

---

# 👨‍💻 개발자

풀스택 20회차 ( 전성우 편대호 김영환 )

Full Stack Developer
