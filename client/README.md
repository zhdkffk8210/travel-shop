# 📁 `client/README.md`

# ✈️ Travel Shop - Frontend

React + TypeScript 기반 여행 상품 판매 서비스 프론트엔드

JWT 인증, 장바구니, 주문 생성, 결제 상태 관리까지 포함된
실제 서비스형 구조의 쇼핑몰 MVP 프로젝트입니다.

---

## 📦 Tech Stack

- React
- Vite
- TypeScript
- Context API (전역 장바구니 상태 관리)
- Axios (API 통신)
- React Router (페이지 라우팅)
- JWT Authentication

---

## 📂 폴더 구조

```bash
src/
├─ api/
│ └─ axios.ts # Axios 인스턴스 설정
│
├─ components/
│ ├─ Header.tsx # 전역 네비게이션
│ ├─ ProductCard.tsx # 상품 카드 컴포넌트
│ ├─ ProductList.tsx # 상품 리스트 Grid
│ ├─ CartPanel.tsx # 장바구니 패널
│ ├─ FilterBar.tsx # 상품 필터 UI
│ └─ PrivateRoute.tsx # 인증 보호 라우트
│
├─ contexts/
│ ├─ CartProvider.tsx # 장바구니 Context Provider
│ ├─ cart.context.ts # Context 생성
│ ├─ cart.types.ts # 장바구니 타입 정의
│ └─ useCart.ts # 커스텀 훅
│
├─ pages/
│ ├─ Home.tsx # 상품 목록 페이지
│ ├─ Login.tsx # 로그인 페이지
│ ├─ Register.tsx # 회원가입 페이지
│ ├─ MyOrders.tsx # 내 주문 조회 페이지
│ └─ OrderComplete.tsx # 주문 완료 페이지
│
└─ App.tsx # 라우팅 및 전역 Provider 설정
```

---

## 🚀 실행 방법

```bash
npm install
npm run dev
```

기본 실행 주소:

```bash
http://localhost:5174
```

---

🔐 인증 흐름

1. 로그인 성공 시 JWT 토큰 발급
2. localStorage에 토큰 저장
3. 주문 생성 시 Authorization 헤더에 자동 포함
4. PrivateRoute를 통해 보호 페이지 접근 제어
5. 로그아웃 시 토큰 제거 및 자동 리다이렉트

---

## 🛒 주요 기능

### 1️⃣ 상품 목록 조회

- FilterBar를 통한 카테고리 필터링
- 키워드 검색 기능
-  이미지 기반 카드 UI
- Grid 레이아웃 표시
- 이미지 기반 카드 UI

### 2️⃣ 장바구니

- 상품 추가
- 수량 증가/감소
- 상품 삭제
- 총 금액 자동 계산
- 주문 완료 시 자동 비우기 (clearCart)

### 3️⃣ 주문 기능

- 주문 생성 API 연동
- 주문 완료 페이지 이동
- 내 주문 조회 가능
- 결제 상태 변경 (pending → paid)

### 4️⃣ 내 주문 페이지

- populate된 상품 정보 표시
- 결제 완료 버튼
- 상태에 따른 버튼 UI 변경

---

## 🧠 설계 특징

- Context API 기반 전역 상태 관리
- 타입 안정성을 고려한 TypeScript 설계
- 서버 기준 가격 계산 (클라이언트 조작 방지)
- REST API 구조 기반 설계
- 인증 보호 라우트 구현
- 컴포넌트 역할 분리 (Header / Content / Panel)

---

## 📌 개선 가능 사항

- 관리자 전용 페이지
- 주문 상태 관리자 변경 기능
- 새로고침 시 장바구니 유지 (localStorage 연동)
- UI 컴포넌트 스타일 통합 (CSS Module / Styled Components)
- 반응형 모바일 최적화


참고내용

1. npm install
2. .env 파일 생성
3. VITE_API_URL=https://travel-shop-rjza.onrender.com/api
4. npm run dev


