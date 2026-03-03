import { useEffect, useState } from "react";
import { api } from "../api/axios";

type ProductInfo = {
  _id: string;
  title: string;
  category: string;
  duration: string;
  price: number;
  image: string;
};

type OrderItem = {
  productId: ProductInfo;
  quantity: number;
  price: number;
};

type Order = {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
  status: "pending" | "paid";
  createdAt: string;
};

function getStatusLabel(status: Order["status"]) {
  if (status === "paid") return "결제 완료";
  return "결제 대기";
}

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  async function fetchOrders() {
    try {
      const res = await api.get<Order[]>("/orders/my");
      setOrders(res.data);
    } catch (error) {
      console.error(error);
      alert("주문 조회 실패");
    }
  }

  useEffect(() => {
    (async () => {
      await fetchOrders();
    })();
  }, []);

  async function handlePay(orderId: string) {
    try {
      await api.patch(`/orders/${orderId}/pay`);
      alert("결제 완료 처리되었습니다.");
      fetchOrders();
    } catch (error) {
      console.error(error);
      alert("결제 처리 실패");
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>내 주문 목록</h2>

      {orders.length === 0 && <p>주문 내역이 없습니다.</p>}

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ddd",
            padding: "16px",
            marginBottom: "16px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <p><strong>주문번호:</strong> {order._id}</p>
              <p><strong>주문일:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p>
                <strong>상태:</strong>{" "}
                <span
                  style={{
                    color: order.status === "paid" ? "green" : "orange",
                    fontWeight: "bold"
                  }}
                >
                  {getStatusLabel(order.status)}
                </span>
              </p>
            </div>

            {order.status === "pending" ? (
              <button
                onClick={() => handlePay(order._id)}
                style={{
                  padding: "8px 14px",
                  backgroundColor: "#2f80ed",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                결제 완료
              </button>
            ) : (
              <button
                disabled
                style={{
                  padding: "8px 14px",
                  backgroundColor: "#ccc",
                  color: "white",
                  border: "none",
                  borderRadius: "6px"
                }}
              >
                결제 완료됨
              </button>
            )}
          </div>

          <div style={{ marginTop: "10px" }}>
            {order.items.map((item, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #eee",
                  padding: "10px",
                  marginBottom: "8px",
                  borderRadius: "6px"
                }}
              >
                <div style={{ fontWeight: "bold" }}>
                  {item.productId.title}
                </div>
                <div>카테고리: {item.productId.category}</div>
                <div>기간: {item.productId.duration}</div>
                <div>수량: {item.quantity}</div>
                <div>단가: {item.price.toLocaleString()}원</div>
              </div>
            ))}
          </div>

          <p style={{ marginTop: "10px", fontWeight: "bold" }}>
            총 금액: {order.totalPrice.toLocaleString()}원
          </p>
        </div>
      ))}
    </div>
  );
}