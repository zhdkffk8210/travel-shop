import { useState } from "react";
import type { CSSProperties } from "react";
import { api } from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      setError("");
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  }

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>로그인</h2>

        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

        <button onClick={handleLogin} style={buttonStyle}>
          로그인
        </button>

        <p style={{ marginTop: "15px", fontSize: "14px", textAlign: "center" }}>
          계정이 없으신가요? <Link to="/register">회원가입</Link>
        </p>
      </div>
    </div>
  );
}

// 회원가입(Register.tsx) 스타일과 동일하게 정렬
const containerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "#f4f6f8",
};

const formStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column" as const,
  width: "320px",        // 회원가입과 동일하게 320px로 수정
  padding: "30px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};

const inputStyle: CSSProperties = {
  width: "100%",         // 꽉 차게
  boxSizing: "border-box", // 튀어나옴 방지
  marginBottom: "12px",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle: CSSProperties = {
  width: "100%",         // 꽉 차게
  boxSizing: "border-box", // 튀어나옴 방지
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  background: "#2f80ed",
  color: "#fff",
  cursor: "pointer",
};