# 📁 `POSTMAN.md`

# 🌍 Travel Shop API Test Guide (Postman)

이 문서는 Travel Shop Backend API를 Postman으로 테스트하는 가이드입니다.

---

## 1️⃣ 회원가입

### POST

```bash
http://localhost:5000/api/auth/register
```
Body (JSON):

```json
{
  "email": "test@test.com",
  "password": "1234"
}
```

응답:

```json
{
  "message": "회원가입 성공"
}
```

---

## 2️⃣ 로그인

### POST

```bash
http://localhost:5000/api/auth/login
```
Body:

```json
{
  "email": "test@test.com",
  "password": "1234"
}
```

응답:

```json
{
  "token": "JWT_TOKEN"
}
```

토큰 복사(이후 요청에서 사용)

### 에러 응답 예시

로그인실패 :

```json 
{
  "message": "이메일 또는 비밀번호가 올바르지 않습니다."
}
```

토큰 없이 주문 요청 :

```json
{
  "message": "로그인이 필요합니다."
}
```

---

## 3️⃣ 상품 조회

### GET

```bash
http://localhost:5000/api/products
```
필터 테스트 예시

```bash
http://localhost:5000/api/products?category=국내
http://localhost:5000/api/products?min=100000&max=500000
```

응답:

```json
{
  "items": [
    {
      "_id": "PRODUCT_ID",
      "title": "제주 2박 3일 힐링 패키지",
      "price": 349000
    }
  ]
}
```

상품 _id 복사 

---

## 4️⃣ 주문 생성

### POST

```bash
http://localhost:5000/api/orders
```

Headers:

```bash
Authorization: Bearer JWT_TOKEN
Content-Type: application/json
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

응답 예시 :

```json
{
  "_id": "ORDER_ID",
  "userId": "USER_ID",
  "items": [
    {
      "productId": "PRODUCT_ID",
      "quantity": 2,
      "price": 349000
    }
  ],
  "totalPrice": 698000,
  "status": "pending",
  "createdAt": "2026-03-02T19:07:36.175Z"
}
```

ORDER_ID 복사

## 5️⃣ 내 주문 조회

### GET

```bash
http://localhost:5000/api/orders/my
```

Headers:

```bash
Authorization: Bearer JWT_TOKEN
```

특징

-populate 적용
-최신순 정렬

## 6️⃣ 결제 완료 처리

### PATCH

```bash
http://localhost:5000/api/orders/ORDER_ID/pay
```
Headers:

```bash
Authorization: Bearer JWT_TOKEN
```

응답 :

```json
{
  "message": "결제 완료 처리되었습니다."
}
```

---

## 🧪 전체 테스트 순서 요약

1. 회원가입
2. 로그인 (토큰 획득)
3. 상품 조회 (상품 ID 복사)
4. 주문 생성
5. 내 주문 조회
6. 결제 완료 처리

## ⚠️ 테스트 시 주의사항

- JWT 토큰은 반드시 Authorization 헤더에 포함
- 가격은 클라이언트에서 보내지 않음 (서버에서 재계산)
- DB에 상품이 없으면 seed 데이터 자동 삽입됨
- 주문 생성 후 상태는 기본적으로 pending

## 📌 추천 Postman 설정

- Environment 변수에 JWT_TOKEN 저장
- Authorization → Bearer Token 방식 사용
- Base URL을 변수로 설정

예:

```bash
{{baseUrl}}/api/orders
```

## 🎯 이 문서의 목적

- API 동작 검증
- 인증 흐름 테스트
- 가격 위변조 방지 검증
- 주문 상태 변경 테스트