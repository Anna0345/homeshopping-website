import axios from "axios";
import { Cart, User, LoginData, RegistrationData } from "../../types";
import jwtDecode, { JwtPayload } from "jwt-decode";
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";

interface DecodedToken extends JwtPayload {
  cartId: number;
  userId: number;
}

const BASE_URL = "http://localhost:3000";

export async function registerUser(data: RegistrationData): Promise<void> {
  const response = await axios.post(`${BASE_URL}/auth/register`, data);
  console.log(response.data);
  return response.data;
}

export const loginUser = async (
  data: LoginData
): Promise<{
  user: User;
  token: string;
  cart: Cart[];
}> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, data);
    const { user, token } = response.data;

    if (!token) {
      throw new Error("Token not found in response");
    }

    // Set the token in the headers for future requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Retrieve the cartId for the logged-in user from the decoded token
    const decodedToken = jwtDecode<DecodedToken>(token);
    const cartId = decodedToken.cartId;
    const userId = decodedToken.userId;

    // Retrieve the cart items for the logged-in user here
    const cartResponse = await axios.get(`${BASE_URL}/cart/${cartId}`);
    const cart = cartResponse.data;

    // Store the token in session storage
    storageSession.setItem("token", token);
    storageSession.setItem("cartId", cartId);
    storageSession.setItem("userId", userId);

    return { user, token, cart };
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Login failed");
  }
};

export async function getUserProfile(): Promise<User> {
  const token = storageSession.getItem("token");
  const response = await axios.get(`${BASE_URL}/auth/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
