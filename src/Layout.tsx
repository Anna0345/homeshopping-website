import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AppHeader from "./components/Header";
import Cart from "./features/cart/cart";
import AuthLogin from "./features/auth/authLogin";
import AuthRegister from "./features/auth/authRegister";
import Checkout from "./features/auth/Checkout";
import GuestCheckout from "./features/auth/GuestCheckout";

const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Products = React.lazy(() => import("./pages/Products/products"));
const NoPage = React.lazy(() => import("./pages/NotFound"));

const Layout: React.FC = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
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
