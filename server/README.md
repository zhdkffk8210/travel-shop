# Travel Shop - Backend

Express + TypeScript + MongoDB 기반 여행 상품 판매 서비스 백엔드

---

## 📦 Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- JWT 인증
- bcrypt 암호화

---

## 📂 폴더 구조

```bash
src/
├─ config/
│ ├─ db.ts
│ └─ env.ts
├─ controllers/
│ ├─ auth.controller.ts
│ ├─ products.controller.ts
│ └─ orders.controller.ts
├─ middlewares/
│ ├─ auth.ts
│ └─ errorHandler.ts
├─ models/
│ ├─ user.model.ts
│ ├─ product.model.ts
│ └─ order.model.ts
├─ routes/
│ ├─ auth.routes.ts
│ ├─ products.routes.ts
│ ├─ orders.routes.ts
│ └─ index.ts
├─ seed/
│ └─ products.seed.ts
└─ server.ts
```

---

## 🚀 실행 방법

### 1️⃣ 의존성 설치


npm install


### 2️⃣ 환경변수 설정 (.env)


PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/travelshop
JWT_SECRET=supersecretkey123


### 3️⃣ 서버 실행


npm run dev


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

로그인
```bash
POST /api/auth/login
```

Response:

```bash
{
  "token": "JWT_TOKEN"
}
```

🧳 상품 API

전체 상품 조회

GET /api/products

🛒 주문 API

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

🧠 설계 특징

클라이언트 가격 신뢰하지 않음

서버에서 상품 가격 재조회 후 totalPrice 계산

JWT 미들웨어 보호

TypeScript strict 모드

any 사용하지 않음

📌 향후 개선

주문 상태 변경 API

내 주문 조회

결제 시뮬레이션

테스트 코드 추가