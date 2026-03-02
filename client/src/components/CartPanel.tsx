import { useCart } from "../contexts/useCart";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CartPanel() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  async function handleCheckout() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const orderItems = items.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity
      }));

      await api.post(
        "/orders",
        { items: orderItems },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("주문이 완료되었습니다!");
      navigate("/complete");
    } catch (error) {
      console.error(error);
      alert("주문 실패");
    }
  }

  return (
    <div
      style={{
        width: "300px",
        borderLeft: "1px solid #ddd",
        padding: "15px",
        backgroundColor: "#f9f9f9"
      }}
    >
      <h2>🛒 장바구니</h2>

      {items.length === 0 && <p>담긴 상품이 없습니다.</p>}

      {items.map((item) => (
        <div
          key={item.product._id}
          style={{
            borderBottom: "1px solid #ccc",
            marginBottom: "10px",
            paddingBottom: "10px"
          }}
        >
          <h4>{item.product.title}</h4>

          <p>{item.product.price.toLocaleString()}원</p>

          <div>
            <button
              onClick={() =>
                updateQuantity(item.product._id, item.quantity - 1)
              }
            >
              -
            </button>

            <span style={{ margin: "0 10px" }}>
              {item.quantity}
            </span>

            <button
              onClick={() =>
                updateQuantity(item.product._id, item.quantity + 1)
              }
            >
              +
            </button>
          </div>

          <button
            style={{ marginTop: "5px", color: "red" }}
            onClick={() => removeFromCart(item.product._id)}
          >
            삭제
          </button>
        </div>
      ))}

      <hr />

      <h3>총 금액: {totalPrice.toLocaleString()}원</h3>

      <button
        style={{ marginTop: "15px", width: "100%" }}
        onClick={handleCheckout}
        disabled={items.length === 0}
      >
        주문하기
      </button>
    </div>
  );
}