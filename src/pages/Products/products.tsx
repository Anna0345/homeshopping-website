import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Col, Row } from "antd";
import { motion } from "framer-motion";
import { RootState } from "./../../store";
import { addToCart as addToGuestCart } from "../../features/cart/guestCartSlice";
import { addItemToCartRequest as addToUserCart } from "../../features/cart/userCartSlice";
import { Product } from "../../types";
import { nanoid } from "nanoid";
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
import "./products.css";
import {
  checkAllProducts,
  uncheckAllProducts,
  checkProduct,
  uncheckProduct,
} from "./productsSlice";

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const buttonVariants = {
  initial: { scale: 0 },
  animate: { scale: 1 },
};

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const checked = useSelector((state: RootState) => state.products.checked);
  const [added, setAdded] = useState<number | null>(null);

  // object
  let guestId = localStorage.getItem("guest_id");

  useEffect(() => {
    dispatch({ type: "products/fetchProducts" });
  }, [dispatch]);

  const handleAddToCart = async (product: Product) => {
    console.log("handleAddToCart called with product:", product);

    const userId = await storageSession.getItem("userId");
    if (!userId) {
      if (!guestId) {
        guestId = nanoid();
        localStorage.setItem("guest_id", guestId);
      }
      dispatch(addToGuestCart({ item: { ...product, quantity: 1 } }));
      setAdded(product.id);
      setTimeout(() => setAdded(null), 3000);
    } else {
      const cartId = await storageSession.getItem("cartId");
      if (cartId && userId) {
        console.log("dispatching addToUserCart action");

        dispatch(
          addToUserCart({
            cartId: Number(cartId),
            productId: product.id,
            quantity: 1,
            price: product.price,
            image: product.image,
          })
        );
        setAdded(product.id);
        setTimeout(() => setAdded(null), 2000);
      } else {
        console.log("CartId not found");
      }
    }
  };
  const handleCheckboxChange = (e: any) => {
    const { checked, value } = e.target;
    if (value === "All") {
      if (checked) {
        dispatch(checkAllProducts());
      } else {
        dispatch(uncheckAllProducts());
      }
    } else {
      if (checked) {
        dispatch(checkProduct(value));
      } else {
        dispatch(uncheckProduct(value));
      }
    }
  };

  const filteredProducts =
    checked.length > 0
      ? products.filter((product: Product) => checked.includes(product.name))
      : products;

  return (
    <div className="container">
      <div className="sidebar">
        <Checkbox.Group>
          <Checkbox
            value="All"
            onChange={handleCheckboxChange}
            checked={checked.length === products.length}
          >
            All
          </Checkbox>
          {products.map((product: Product) => (
            <Checkbox
              key={product.id}
              value={product.name}
              onChange={handleCheckboxChange}
            >
              {product.name}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </div>

      <Row className="row" gutter={[24, 24]} justify="center">
        {products?.map((product: Product) => (
          <Col
            key={product.id}
            className={`col ${
              filteredProducts.includes(product)
                ? "product-col"
                : "hidden-product"
            }`}
          >
            <motion.div
              className="card"
              initial="initial"
              animate="animate"
              variants={cardVariants}
              transition={{ duration: 0.3 }}
            >
              <div>
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="image"
                  initial="initial"
                  animate="animate"
                  variants={buttonVariants}
                  transition={{ duration: 0.7 }}
                />
                <h3>{product.name}</h3>
                <p className="price">Price: ${product.price}</p>
                <p className="inventory">Inventory: {product.inventory}</p>
              </div>
              <motion.button
                onClick={() => handleAddToCart(product)}
                style={{ marginTop: 8 }}
                initial="initial"
                animate="animate"
                variants={buttonVariants}
                transition={{ duration: 0.3 }}
              >
                {added === product.id ? "Added" : "Add to Cart"}
              </motion.button>
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default Products;
