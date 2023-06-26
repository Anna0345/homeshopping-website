import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";

interface ProductsState {
  loading: boolean;
  error: string | null;
  products: Product[];
  checked: string[];
  indeterminate: boolean;
  checkAll: boolean;
}

const initialState: ProductsState = {
  loading: false,
  error: null,
  products: [],
  checked: [],
  indeterminate: false,
  checkAll: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.loading = false;
      state.error = null;
      state.products = action.payload;
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addToCart(state, action: PayloadAction<number>) {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.added = true;
      }
    },

    checkProduct(state, action: PayloadAction<string>) {
      state.checked.push(action.payload);
      state.indeterminate =
        !!state.checked.length && state.checked.length < state.products.length;
      state.checkAll = state.checked.length === state.products.length;
    },
    uncheckProduct(state, action: PayloadAction<string>) {
      state.checked = state.checked.filter((name) => name !== action.payload);
      state.indeterminate =
        !!state.checked.length && state.checked.length < state.products.length;
      state.checkAll = false;
    },
    checkAllProducts(state) {
      state.checked = state.products.map((product) => product.name);
      state.indeterminate = false;
      state.checkAll = true;
    },
    uncheckAllProducts(state) {
      state.checked = [];
      state.indeterminate = false;
      state.checkAll = false;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  checkAllProducts,
  checkProduct,
  uncheckProduct,
  uncheckAllProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
