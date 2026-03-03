import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      alert("회원가입 성공!");
      navigate("/login"); // 로그인 페이지로 이동
    } catch (err) {
      console.error(err);
      setMessage("서버 오류 발생");
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleRegister} style={formStyle}>
        <h2>회원가입</h2>

        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          회원가입
        </button>

        {message && <p style={{ color: "red" }}>{message}</p>}
      </form>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "calc(100vh - 60px)",
  paddingTop: "20px",             
  background: "#f4f6f8",
};

const formStyle = {
  display: "flex",
  flexDirection: "column" as const,
  width: "320px",
  padding: "30px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};

const inputStyle = {
  marginBottom: "12px",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  background: "#2f80ed",
  color: "#fff",
  cursor: "pointer",
};