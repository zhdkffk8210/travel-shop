📁 3️⃣ postman.md
# Travel Shop API Test Guide (Postman)

---

## 1️⃣ 회원가입

POST

http://localhost:5000/api/auth/register


---

## 2️⃣ 로그인

POST

http://localhost:5000/api/auth/login


토큰 복사

---

## 3️⃣ 상품 조회

GET

http://localhost:5000/api/products


상품 _id 복사
"_id": "69a5c85f03aee1c033733da7",

---

## 4️⃣ 주문 생성

POST

http://localhost:5000/api/orders


Headers:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTVkYzFiZWI2ZTViZjNjM2M0ZGMzOSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTc3MjQ3NzU1MiwiZXhwIjoxNzcyNDgxMTUyfQ.UQbbr8_C_xG44adirhq54fxs82oRxo6wo6C5Kf3foXg
Content-Type: application/json


Body:
```json
{
  "items": [
    {
      "productId": "69a5c85f03aee1c033733da7",
      "quantity": 2
    }
  ]
}
기대 결과

{ "userId": "69a5dc1beb6e5bf3c3c4dc39", 
  "items": [ 
    {  
      "productId": "69a5c85f03aee1c033733da7", 
      "quantity": 2, 
      "price": 349000, 
      "_id": "69a5dff8eb6e5bf3c3c4dc3f" 
    } ], 
    
    "totalPrice": 698000, 
    "status": "pending", 
    "_id": "69a5dff8eb6e5bf3c3c4dc3e", 
    "createdAt": "2026-03-02T19:07:36.175Z", 
    "updatedAt": "2026-03-02T19:07:36.175Z", 
    "__v": 0 
}

---