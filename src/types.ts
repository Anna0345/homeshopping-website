import { AnyAction } from "redux";

export interface Product {
  id: number;
  name: string;
  description?: string;
  image: string;
  price: number;
  quantity: number;
  inventory: number;
  categoryId: number;
}
export interface RegistrationData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  addresses?: Address[];
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}
export interface Cart {
  id: number;
  userId: number;
  user: User;
  items: Item[];
  subTotal: number;
  image: string | null;
}

export interface Item {
  id: number;
  cartId?: number;
  cart?: Cart;
  productId?: number;
  product?: Product;
  quantity: number;
  description: string;
  name: string;
  price: number;
  image: string;
  total?: number;
  order?: Order;
  orderId?: number;
}

export interface CartState {
  items: Product[];
  userId: number | null;
}

export interface RootState {
  products: Product[];
  cart: CartState;
}
export interface User {
  id?: number | null;
  username?: string;
  email: string;
  password: string;
  role?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  addresses?: Address[];
  payments?: Payment[];
  shoppingCart?: ShoppingCart[];
  orders?: Order[];
  cartId?: number;
}

export interface Address {
  id: number;
  userId: number;
  user: User;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: number;
  userId: number;
  user: User;
  cardNumber: string;
  cardHolder: string;
  expMonth: string;
  expYear: string;
  cvv: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ShoppingCart {
  id: number;
  userId: number;
  user: User;
  items: ShoppingCartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ShoppingCartItem {
  id: number;
  quantity: number;
  productId: number;
  product: Product;
  shoppingCartId: number;
  shoppingCart: ShoppingCart;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: number;
  userId: number;
  user: User;
  items: OrderItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface ShoppingCartItemInput {
  quantity: number;
  product: {
    id: number;
  };
  item: string;
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  productId: number;
  product: Product;
  orderId: number;
  order: Order;
  createdAt: Date;
  updatedAt: Date;
}

// Action types for product-related actions
export interface ProductActionTypes extends AnyAction {
  payload?: Product[]; // Modify the payload type according to your API response
}
