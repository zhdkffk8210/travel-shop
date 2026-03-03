# 📁 `client/README.md`

# Travel Shop - Frontend

React + TypeScript 기반 여행 상품 판매 서비스 프론트엔드

---

## 📦 Tech Stack

- React
- Vite
- TypeScript
- Context API
- Axios
- React Router

---

## 📂 폴더 구조

```bash
src/
├─ api/
│ └─ axios.ts
├─ components/
│ ├─ ProductCard.tsx
│ ├─ ProductList.tsx
│ └─ CartPanel.tsx
├─ contexts/
│ ├─ CartProvider.tsx
│ └─ useCart.ts
├─ pages/
│ ├─ Home.tsx
│ ├─ Login.tsx
│ └─ OrderComplete.tsx
└─ App.tsx
```

---

## 🚀 실행 방법

```bash
npm install
npm run dev
```

---

## 🔐 인증 흐름

1. 로그인 성공
2. JWT 토큰 localStorage 저장
3. 주문 시 Authorization 헤더 자동 추가

---

## 🛒 장바구니

- 상품 추가
- 수량 변경
- 삭제
- 총 금액 자동 계산
- 주문 버튼 연결

---

## 🧠 설계 특징

- Context API 전역 상태 관리
- 서버 가격 기준 계산
- 토큰 기반 인증 처리
- 컴포넌트 분리 설계

---

## 📌 향후 개선

- 내 주문 페이지
- 결제 상태 UI
- 관리자 상품 관리
- UI 개선
