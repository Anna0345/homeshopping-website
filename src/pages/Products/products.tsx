import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { RootState } from "./../../store";
import { addToCart as addToGuestCart } from "../../features/cart/guestCartSlice";
import { addItemToCartRequest as addToUserCart } from "../../features/cart/userCartSlice";
import { Product } from "../../types";
import { nanoid } from "nanoid";
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";

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
      } else {
        console.log("CartId not found");
      }
    }
  };

  return (
    <Row gutter={[24, 24]} justify="center">
      {products?.map((product: Product) => (
        <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
          <motion.div
            style={{
              border: "1px solid #f0f0f0",
              borderRadius: 8,
              padding: 16,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
            initial="initial"
            animate="animate"
            variants={cardVariants}
            transition={{ duration: 0.3 }}
          >
            <div>
              <motion.img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  marginBottom: 16,
                  borderRadius: 4,
                }}
                initial="initial"
                animate="animate"
                variants={buttonVariants}
                transition={{ duration: 0.7 }}
              />
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 8,
                  color: "#333",
                }}
              >
                {product.name}
              </h3>
              <p
                style={{
                  marginBottom: 8,
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#555",
                }}
              >
                Price: ${product.price}
              </p>
              <p style={{ marginBottom: 8, color: "#888" }}>
                Inventory: {product.inventory}
              </p>
            </div>
            <motion.button
              onClick={() => handleAddToCart(product)}
              style={{ marginTop: 8 }}
              initial="initial"
              animate="animate"
              variants={buttonVariants}
              transition={{ duration: 0.3 }}
            >
              <PlusOutlined />
              Add to Cart
            </motion.button>
          </motion.div>
        </Col>
      ))}
    </Row>
  );
};

export default Products;
