import type { Product } from "../types/product";
import { useCart } from "../contexts/useCart";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <div
      style={{
        border: "1px solid #ccc",
        margin: "10px",
        padding: "10px",
        borderRadius: "8px"
      }}
    >
      <h3>{product.title}</h3>

      <p>카테고리: {product.category}</p>
      <p>가격: {product.price.toLocaleString()}원</p>
      <p>기간: {product.duration}</p>
      <p>평점: ⭐ {product.rating}</p>

      <button
        style={{ marginTop: "8px" }}
        onClick={() => addToCart(product)}
      >
        장바구니 담기
      </button>
    </div>
  );
}