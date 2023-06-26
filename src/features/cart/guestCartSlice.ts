import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Product } from "../../types";

interface CartState {
  items: Product[];
  quantity: number;
  added: number | null;
}

const initialState: CartState = {
  items: [],
  quantity: 1,
  added: null,
};

const CART_STORAGE_KEY = "cart_items";

const cartSlice = createSlice({
  name: "GuestCart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ item: Product }>) => {
      const { item } = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        item.quantity = 1;
        state.items.push(item);
      }

      if (state.items.length === 1) {
        state.quantity = 1;
      }
      console.log((state.added = item.id));
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    },
    setAdded: (state, action: PayloadAction<number | null>) => {
      state.added = action.payload;
    },
    setCartItems: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);

      // Save updated cart items to local storage
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        state.quantity += quantity - item.quantity;
        item.quantity = quantity;
      }

      // Save updated cart items to local storage
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;

      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        item.quantity += 1;
      }

      // Save updated cart items to local storage
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    },

    decrementQuantity: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      // Save updated cart items to local storage
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];

      // Clear cart items from local storage
      localStorage.removeItem(CART_STORAGE_KEY);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  setCartItems,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  setAdded,
} = cartSlice.actions;

export const selectGuestCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
