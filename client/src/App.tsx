import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartProvider";
import Home from "./pages/Home";
import OrderComplete from "./pages/orderComplete";
import Login from "./pages/Login";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/complete" element={<OrderComplete />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;