import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Typography, Button } from "antd";
import {
  setCartItems,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "./guestCartSlice";
import {
  getCartRequest,
  removeItemFromCartRequest,
  updateItemQuantityRequest,
} from "./userCartSlice";
import { useNavigate } from "react-router-dom";
import { Item, Product } from "../../types";
import "./cart.css";
import { RootState } from "../../store";
import {
  AddItemToCartAction,
  GetCartAction,
  RemoveItemFromCartAction,
  UpdateItemQuantityAction,
} from "./cartSaga";

const { Text } = Typography;

const Cart = () => {
  const cartId = Number(sessionStorage.getItem("cartId"));
  const cartItems = useSelector((state: RootState) =>
    cartId ? state.userCart.items : state.cart.items
  );
  console.log(cartItems);
  const loading = useSelector((state: RootState) => state.cart.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartId) {
      dispatch(getCartRequest({ cartId }));
    } else {
      const guestCartItemsStr = localStorage.getItem("cart_items");
      if (guestCartItemsStr) {
        const storedGuestCartItems = JSON.parse(guestCartItemsStr) as Product[];
        dispatch(setCartItems(storedGuestCartItems));
      }
    }
  }, [cartId, dispatch]);

  const handleRemoveItem = (itemId: number) => {
    dispatchActionForUserOrGuest(
      removeItemFromCartRequest({ itemId }),
      removeFromCart(itemId)
    );
  };

  const handleIncrementQuantity = (itemId: number) => {
    const itemIndex = cartItems.findIndex(
      (item: { id: number }) => item.id === itemId
    );
    if (itemIndex !== -1) {
      // Optimistically update the quantity in the UI
      dispatch(incrementQuantity(itemId));

      dispatchActionForUserOrGuest(
        updateItemQuantityRequest({
          itemId,
          quantity: cartItems[itemIndex].quantity + 1,
        }),
        incrementQuantity(itemId)
      );
    }
  };

  const handleDecrementQuantity = (itemId: number) => {
    const item = cartItems.find((item: { id: number }) => item.id === itemId);
    if (item && item.quantity > 1) {
      dispatchActionForUserOrGuest(
        updateItemQuantityRequest({ itemId, quantity: item.quantity - 1 }),
        decrementQuantity(itemId)
      );
    }
  };

  const handleCheckout = () => {
    const guest_id = localStorage.getItem("guest_id");

    if (guest_id) {
      navigate("/guestCheckout");
    } else {
      navigate("/userCheckout");
    }
  };
  type UserAction =
    | GetCartAction
    | AddItemToCartAction
    | UpdateItemQuantityAction
    | RemoveItemFromCartAction;

  // Helper function to dispatch action for user or guest based on whether cartId is stored in sessionStorage
  const dispatchActionForUserOrGuest = (
    userAction: UserAction,
    guestAction: {
      payload: number;
      type:
        | "GuestCart/removeFromCart"
        | "GuestCart/incrementQuantity"
        | "GuestCart/decrementQuantity";
    }
  ) => {
    const cartId = sessionStorage.getItem("cartId");
    console.log(cartId);
    if (cartId) {
      // User is logged in, dispatch user action
      dispatch(userAction);
    } else {
      // User is a guest, dispatch guest action
      dispatch(guestAction);
    }
  };

  const columns = [
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
      render: (_text: string, record: Item) => (
        <>
          {" "}
          <Text strong>{record.name}</Text>
          <div>
            <img src={record.image} alt={record.name} width={80} height={80} />

            <br />
            <Text>
              {record.description ? record.description.substring(0, 50) : ""}
            </Text>
          </div>
        </>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_text: string, record: Item) => (
        <div className="quantity-controls">
          <Button
            type="primary"
            shape="circle"
            onClick={() => handleDecrementQuantity(record.id)}
            className="quantity-button"
          >
            -
          </Button>
          <span>{record.quantity}</span>
          <Button
            type="primary"
            shape="circle"
            onClick={() => handleIncrementQuantity(record.id)}
            className="quantity-button"
          >
            +
          </Button>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (_text: string, record: Item) => `$${record.price.toFixed(2)}`,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (_text: string, record: Item) =>
        `$${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_text: string, record: Item) => (
        <>
          <Button type="link" onClick={() => handleRemoveItem(record.id)}>
            Remove
          </Button>
          <Button type="link">Move to Wishlist</Button>
        </>
      ),
    },
  ];

  return (
    <div className="cart-container">
      {loading ? (
        <Text>Loading cart items...</Text>
      ) : (
        <>
          <Table
            dataSource={cartItems}
            columns={columns}
            rowKey={(record) => record.id}
          />
          <div className="cart-footer">
            <Button type="primary" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
