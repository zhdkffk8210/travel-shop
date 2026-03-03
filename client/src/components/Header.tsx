import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    navigate("/login");
  }

  return (
    <div
      style={{
        padding: "16px 40px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#f8f9fa",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: "bold", fontSize: "24px", letterSpacing: "-1px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "blue" }}> 
          ✈️ Travel Shop
        </Link>
      </div>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/">홈</Link>
        <Link to="/my-orders">내 주문</Link>

        {!token ? (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/register">회원가입</Link>
          </>
        ) : (
          <button onClick={handleLogout}>
            로그아웃
          </button>
        )}
      </div>
    </div>
  );
}