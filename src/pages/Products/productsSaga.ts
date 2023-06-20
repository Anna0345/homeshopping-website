import { call, put, takeEvery } from "redux-saga/effects";
import { fetchProducts } from "./productsApi";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "./productsSlice";
import { Product } from "../../types";

function* fetchProductsSaga(): Generator<unknown, void, Product[]> {
  try {
    yield put(fetchProductsStart());
    const products = yield call(fetchProducts);
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    const errorMessage = "Failed to fetch products. Please try again."; // Customize the error message here
    yield put(fetchProductsFailure(errorMessage));
  }
}

export function* watchProductsSaga() {
  yield takeEvery("products/fetchProducts", fetchProductsSaga);
}
