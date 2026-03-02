import { useState } from "react";

interface Props {
  onFilter: (params: {
    category?: string;
    min?: string;
    max?: string;
    search?: string;
  }) => void;
}

export default function FilterBar({ onFilter }: Props) {
  const [category, setCategory] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [search, setSearch] = useState("");

  function handleSubmit() {
    onFilter({ category, min, max, search });
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">전체</option>
        <option value="국내">국내</option>
        <option value="해외">해외</option>
      </select>

      <input
        placeholder="최소 가격"
        value={min}
        onChange={(e) => setMin(e.target.value)}
      />

      <input
        placeholder="최대 가격"
        value={max}
        onChange={(e) => setMax(e.target.value)}
      />

      <input
        placeholder="검색어"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={handleSubmit}>검색</button>
    </div>
  );
}