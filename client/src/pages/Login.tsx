import { useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      // 🔥 여기서 토큰 저장
      localStorage.setItem("token", res.data.token);

      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("로그인 실패");
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>로그인</h2>

      <input
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        로그인
      </button>
    </div>
  );
}