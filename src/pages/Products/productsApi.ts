

import axios from "axios";
import { Product } from "../../types";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>("http://localhost:3000/products");
  return response.data;
};
