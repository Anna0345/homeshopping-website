// shoppingCartSaga.ts
import { takeLatest, put, call } from "redux-saga/effects";
import axiosInstance from "./cartInstance";
import {
  getCartRequest,
  getCartSuccess,
  getCartFailure,
  addItemToCartRequest,
  addItemToCartSuccess,
  addItemToCartFailure,
  updateItemQuantityRequest,
  updateItemQuantitySuccess,
  updateItemQuantityFailure,
  removeItemFromCartRequest,
  removeItemFromCartSuccess,
  removeItemFromCartFailure,
} from "./userCartSlice";
import { Cart, Item } from "../../types";
import { AnyAction } from "redux";

export interface GetCartAction {
  type: string;
  payload: {
    cartId: number;
  };
}

export interface AddItemToCartAction {
  type: string;
  payload: {
    cartId: number;
    productId: number;
    quantity: number;
    price: number;
    image: string;
  };
}

export interface UpdateItemQuantityAction {
  type: string;
  payload: {
    itemId: number;
    quantity: number;
  };
}

export interface RemoveItemFromCartAction {
  type: string;
  payload: {
    itemId: number;
    cartId?: number;
  };
}

function* getCart(action: GetCartAction): Generator<unknown, void, AnyAction> {
  try {
    const { cartId } = action.payload;
    const response = yield call(axiosInstance.get, `/cart/${cartId}`);
    console.log(response);
    yield put(getCartSuccess({ cart: response.data as Cart }));
  } catch (error) {
    yield put(getCartFailure({ error: (error as Error).message }));
  }
}

function* addItemToCart(
  action: AddItemToCartAction
): Generator<unknown, void, AnyAction> {
  try {
    const { cartId, productId, quantity, price, image } = action.payload;
    const response = yield call(axiosInstance.post, "/cart/item", {
      cartId,
      productId,
      quantity,
      price,
      image,
    });
    console.log(response.data);

    yield put(addItemToCartSuccess({ cart: response.data as Cart }));
  } catch (error) {
    yield put(addItemToCartFailure({ error: (error as Error).message }));
  }
}

function* updateItemQuantity(
  action: UpdateItemQuantityAction
): Generator<unknown, void, AnyAction> {
  try {
    const { itemId, quantity } = action.payload;
    const response = yield call(axiosInstance.put, `/cart/item/${itemId}`, {
      itemId,
      quantity,
    });
    yield put(updateItemQuantitySuccess({ item: response.data as Item }));
  } catch (error) {
    yield put(updateItemQuantityFailure({ error: (error as Error).message }));
  }
}

function* removeItemFromCart(
  action: RemoveItemFromCartAction
): Generator<unknown, void, AnyAction> {
  try {
    const { itemId, cartId } = action.payload;
    yield call(axiosInstance.delete, `/cart/${cartId}/item/${itemId}`);
    yield put(removeItemFromCartSuccess({ itemId }));
  } catch (error) {
    yield put(removeItemFromCartFailure({ error: (error as Error).message }));
  }
}

export function* watchShoppingCart() {
  yield takeLatest(getCartRequest.type, getCart);
  yield takeLatest(addItemToCartRequest.type, addItemToCart);
  yield takeLatest(updateItemQuantityRequest.type, updateItemQuantity);
  yield takeLatest(removeItemFromCartRequest.type, removeItemFromCart);
}
