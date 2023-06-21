import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu, Badge, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../store";

import "./Header.css";
import { Item } from "../types";
import { getCartRequest } from "../features/cart/userCartSlice";
import { useEffect } from "react";
const { Header } = Layout;
const { Search } = Input;

const AppHeader: React.FC = () => {
  console.log("AppHeader rendered");

  const cartId = Number(sessionStorage.getItem("cartId"));
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartId) {
      dispatch(getCartRequest({ cartId }));
    }
  }, [cartId, dispatch]);

  const cartItems = useSelector((state: RootState) =>
    cartId ? state.userCart.items : state.cart.items
  );
  const totalQuantity = cartItems.reduce(
    (acc: number, item: Item) => acc + item.quantity,
    0
  );
  console.log(totalQuantity);
  const handleLogout = () => {
    sessionStorage.clear();
  };

  return (
    <header className="header">
      <Header className="menu-primary">
        <div className="header-container">
          <div className="logo-container">
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              className="menu-primary"
            >
              <Menu.Item key="1">
                <Link to="/" className="menu-item-link">
                  SerMar
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/contact" className="menu-item-link">
                  Contact
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/about" className="menu-item-link">
                  About
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/products" className="menu-item-link">
                  Products
                </Link>
              </Menu.Item>
            </Menu>
          </div>
          <div>
            <Menu mode="horizontal" className="menu-secondary">
              <Menu.Item key="search">
                <Search placeholder="Search" className="search-input" />
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/cart" className="menu-item-link">
                  <Badge count={totalQuantity} className="count">
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className="cart-icon"
                    />
                  </Badge>
                </Link>
              </Menu.Item>
              <Menu.Item key="6">
                <FontAwesomeIcon icon={faHeart} className="heart-icon" />
              </Menu.Item>
              <Menu.SubMenu
                key="7"
                title={<FontAwesomeIcon icon={faUser} className="user-icon" />}
              >
                <Menu.Item key="8">Profile</Menu.Item>
                <Menu.Item key="login">
                  <Link to="/login">Login</Link>
                </Menu.Item>

                <Menu.Item key="10" onClick={handleLogout}>
                  Logout
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </div>
        </div>
      </Header>
    </header>
  );
};

export default AppHeader;
