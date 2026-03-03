import type { Product } from "../types/product";
import { useCart } from "../contexts/useCart";

type Props = {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  const { addToCart } = useCart();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}
    >
      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid #eee",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            transition: "0.2s",
            background: "white"
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              height: "160px",
              objectFit: "cover"
            }}
          />

          <div style={{ padding: "14px" }}>
            <h3 style={{ margin: "0 0 8px 0" }}>
              {product.title}
            </h3>

            <div style={{ fontSize: "14px", color: "#777" }}>
              {product.category} · {product.duration}
            </div>

            <p style={{ margin: "10px 0", fontSize: "14px" }}>
              {product.description}
            </p>

            <div
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "10px"
              }}
            >
              {product.price.toLocaleString()}원
            </div>

            <button
              onClick={() => addToCart(product)}
              style={{
                width: "100%",
                padding: "8px",
                backgroundColor: "#2f80ed",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1c5ed6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#2f80ed";
              }}
            >
              장바구니 담기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}