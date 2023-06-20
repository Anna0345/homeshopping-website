import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products/products";
import NoPage from "./pages/NotFound";
import AppHeader from "./components/Header";
import Cart from "./features/cart/cart";
import AuthLogin from "./features/auth/authLogin";
import AuthRegister from "./features/auth/authRegister";
import Checkout from "./features/auth/Checkout";
import GuestCheckout from "./features/auth/GuestCheckout";

const Layout: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/:userId" element={<Cart />} />
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/register" element={<AuthRegister />} />
        <Route path="/userCheckout" element={<Checkout />} />
        <Route path="/guestCheckout" element={<GuestCheckout />} />

        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
};

const Header: React.FC = () => {
  const location = useLocation();
  if (location.pathname === "/login") {
    return null;
  }
  return <AppHeader />;
};

export default Layout;
