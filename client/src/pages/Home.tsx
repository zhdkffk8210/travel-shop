import { useEffect, useState } from "react";
import { api } from "../api/axios";
import type { Product, ProductsResponse } from "../types/product";
import ProductList from "../components/ProductList";
import FilterBar from "../components/FilterBar";
import CartPanel from "../components/CartPanel";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<{
    category?: string;
    min?: string;
    max?: string;
    search?: string;
  }>({});

  useEffect(() => {
    async function fetchProducts() {
      const res = await api.get<ProductsResponse>("/products", {
        params: filters
      });

      setProducts(res.data.items);
    }

    fetchProducts();
  }, [filters]); // 🔥 filters가 바뀔 때만 실행

  return (
  <div style={{ display: "flex" }}>
    <div style={{ flex: 1, padding: "20px" }}>
      <h1>여행 상품 목록</h1>

      <FilterBar onFilter={setFilters} />

      <ProductList products={products} />
    </div>

    <CartPanel />
    </div>
);
}