import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartProvider";
import Header from "./components/Header";
import Home from "./pages/Home";
import OrderComplete from "./pages/OrderComplete";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/complete" element={<OrderComplete />} />
          <Route path="/my-orders"element={<PrivateRoute><MyOrders /></PrivateRoute>}/>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;