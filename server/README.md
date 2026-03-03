# 📁 `server/README.md`

# 🌍 Travel Shop - Backend

Express + TypeScript + MongoDB 기반 여행 상품 판매 서비스 백엔드

JWT 인증, 주문 생성, 결제 상태 변경, 상품 seed 데이터까지 포함된 REST API 서버 구조 프로젝트입니다

---

## 📦 Tech Stack

- Node.js
- Express
- TypeScript (strict mode)
- MongoDB (Mongoose ODM)
- JWT (토큰 인증)
- bcrypt (비밀번호 암호화)
- dotenv (환경 변수 관리)

---

## 📂 폴더 구조

```bash
src/
├─ config/
│ ├─ db.ts # MongoDB 연결 설정
│ └─ env.ts # 환경 변수 로드
│
├─ controllers/
│ ├─ auth.controller.ts # 회원가입 / 로그인
│ ├─ products.controller.ts# 상품 조회
│ └─ orders.controller.ts # 주문 생성 / 조회 / 결제
│
├─ middlewares/
│ ├─ auth.ts # JWT 인증 미들웨어
│ └─ errorHandler.ts # 전역 에러 핸들러
│
├─ models/
│ ├─ user.model.ts
│ ├─ product.model.ts
│ └─ order.model.ts
│
├─ routes/
│ ├─ auth.routes.ts
│ ├─ products.routes.ts
│ ├─ orders.routes.ts
│ └─ index.ts
│
├─ seed/
│ ├─ products.json # 초기 상품 데이터
│ └─ products.seed.ts # DB 초기화 로직
│
├─ app.ts # Express 앱 설정
└─ server.ts # 서버 실행 진입점
```

---

## 🚀 실행 방법

### 1️⃣ 의존성 설치

```bash
npm install
```

### 2️⃣ 환경변수 설정 (.env)

```bash
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/travelshop
JWT_SECRET=supersecretkey123
```

### 3️⃣ 서버 실행

```bash
npm run dev
```

기본 서버 주소:

```bash
http://localhost:5000
```

---

## 🔐 인증 API

### 회원가입

```bash
POST /api/auth/register
```

Body:

```json
{
  "email": "test@test.com",
  "password": "1234"
}
```

### 로그인

```bash
POST /api/auth/login
```

Response:

```bash
{
  "token": "JWT_TOKEN"
}
```

---

## 🧳 상품 API

### 전체 상품 조회

```bash
GET /api/products
```

지원 기능

- 카테고리 필터
- 최소/최대 가격 필터
- 키워드 검색

### 🛒 주문 API

주문 생성 (JWT 필요)

```bash
POST /api/orders
```

Headers:

```bash
Authorization: Bearer TOKEN
```

Body:

```json
{
  "items": [
    {
      "productId": "PRODUCT_ID",
      "quantity": 2
    }
  ]
}
```

서버 동작

- 상품 가격 재조회
- 총 금액 서버에서 계산
- status 기본값: pending

내 주문 조회 (JWT 필요)

```bash
GET /api/orders/my
```

특징

- populate("items.productId") 적용
- 최신순 정렬

결제 완료 처리 (JWT 필요)

```bash
PATCH /api/orders/:orderId/pay
```

동작

- 주문 상태 pending → paid 변경

---

## 🗄 데이터 모델 구조

### User

- email
- password (bcrypt 해시)
- createdAt
- updatedAt

### Product

- title
- category
- price
- duration
- description
- image
- rating
- createdAt
- updatedAt

### Order

- userId
- items[]
- - productId (ref: Product)
- - quantity
- price
- totalPrice
- status (pending | paid)
- timestamps

---

## 📌 향후 개선 사항

- 관리자 전체 주문 조회 기능
- 관리자 상품 CRUD
- 주문 취소 기능
- 테스트 코드 (Jest)
- Docker 배포 환경 구성
- Swagger API 문서화

---

## 🧠 설계 특징

- 클라이언트 가격 신뢰하지 않음
- 서버에서 상품 가격 재조회 후 totalPrice 계산
- JWT 인증 미들웨어 보호
- TypeScript strict 모드
- any 타입 사용 지양
- RESTful 구조
- Controller / Route / Model 분리
- 전역 에러 핸들러 적용
- Seed 데이터 자동 삽입

---

📌 향후 개선 사항

- 관리자 전용 전체 주문 조회 기능
- 관리자 상품 CRUD
- 주문 취소 기능
- 테스트 코드 (Jest)
- Docker 배포 환경 구성
- Swagger API 문서화