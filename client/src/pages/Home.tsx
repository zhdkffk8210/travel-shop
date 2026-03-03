import { useEffect, useState } from "react";
import { api } from "../api/axios";
import type { Product, ProductsResponse } from "../types/product";
import ProductList from "../components/ProductList";
import FilterBar from "../components/FilterBar";
import CartPanel from "../components/CartPanel";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<{
    category?: string;
    min?: string;
    max?: string;
    search?: string;
  }>({});

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await api.get<ProductsResponse>("/products", {
        params: filters
      });

      setProducts(res.data.items);
    }

    fetchProducts();
  }, [filters]);

  return (
    <div style={{ display: "flex", maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>여행 상품 목록</h1>

        <FilterBar onFilter={setFilters} />

        <ProductList products={products} />
      </div>

      <CartPanel />
    </div>
  );
}