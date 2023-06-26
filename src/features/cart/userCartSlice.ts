import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, Item } from "../../types";

interface ShoppingCartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  userId: number | null;
  items: Item[];
}

export interface GetCartRequestPayload {
  cartId: number;
}

interface GetCartSuccessPayload {
  cart: Cart | null;
}

interface GetCartFailurePayload {
  error: string;
}

interface AddItemToCartRequestPayload {
  cartId: number | string;
  productId: number;
  quantity: number;
  price: number;
  image: string | null;
}

interface AddItemToCartSuccessPayload {
  cart: Cart;
}

interface AddItemToCartFailurePayload {
  error: string;
}

interface UpdateItemQuantityRequestPayload {
  itemId: number;
  quantity: number;
}

interface UpdateItemQuantitySuccessPayload {
  item: Item;
}

interface UpdateItemQuantityFailurePayload {
  error: string;
}

interface RemoveItemFromCartRequestPayload {
  itemId: number;
}

interface RemoveItemFromCartSuccessPayload {
  itemId: number;
}

interface RemoveItemFromCartFailurePayload {
  error: string;
}

const initialState: ShoppingCartState = {
  cart: null,
  loading: false,
  error: null,
  userId: null,
  items: [],
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    getCartRequest: (state, _action: PayloadAction<GetCartRequestPayload>) => {
      state.loading = true;
      state.error = null;
    },
    getCartSuccess: (state, action: PayloadAction<GetCartSuccessPayload>) => {
      if (action.payload.cart) {
        state.items = action.payload.cart.items;
      }
      state.loading = false;
    },

    getCartFailure: (state, action: PayloadAction<GetCartFailurePayload>) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    addItemToCartRequest: (
      state,
      _action: PayloadAction<AddItemToCartRequestPayload>
    ) => {
      state.loading = true;
      state.error = null;
    },
    addItemToCartSuccess: (
      state,
      action: PayloadAction<AddItemToCartSuccessPayload>
    ) => {
      console.log(action.payload.cart);
      console.log((state.items = action.payload.cart.items));

      state.loading = false;
    },
    addItemToCartFailure: (
      state,
      action: PayloadAction<AddItemToCartFailurePayload>
    ) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    updateItemQuantityRequest: (
      state,
      _action: PayloadAction<UpdateItemQuantityRequestPayload>
    ) => {
      state.loading = true;
      state.error = null;
    },
    updateItemQuantitySuccess: (
      state,
      action: PayloadAction<UpdateItemQuantitySuccessPayload>
    ) => {
      const updatedItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.item.id
      );
      if (updatedItemIndex !== -1) {
        state.items[updatedItemIndex] = action.payload.item;
      }
      state.loading = false;
    },
    updateItemQuantityFailure: (
      state,
      action: PayloadAction<UpdateItemQuantityFailurePayload>
    ) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    removeItemFromCartRequest: (
      state,
      _action: PayloadAction<RemoveItemFromCartRequestPayload>
    ) => {
      state.loading = true;
      state.error = null;
    },
    removeItemFromCartSuccess: (
      state,
      _action: PayloadAction<RemoveItemFromCartSuccessPayload>
    ) => {
      const itemIdToRemove = _action.payload.itemId;
      const updatedItemsList = state.items.filter(
        (item) => item.id !== itemIdToRemove
      );
      state.items = updatedItemsList;
      state.loading = false;
    },
    removeItemFromCartFailure: (
      state,
      action: PayloadAction<RemoveItemFromCartFailurePayload>
    ) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  getCartRequest,
  getCartSuccess,
  getCartFailure,
  addItemToCartRequest,
  addItemToCartSuccess,
  addItemToCartFailure,
  updateItemQuantityFailure,
  updateItemQuantitySuccess,
  updateItemQuantityRequest,
  removeItemFromCartFailure,
  removeItemFromCartRequest,
  removeItemFromCartSuccess,
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
