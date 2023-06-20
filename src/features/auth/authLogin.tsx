import { Form, Input, Button, Spin, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login, setError, setUser } from "./authSlice";
import { RootState } from "../../store";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "./authApi";
import { LoginData } from "../../types";
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
import "./Login.css";

const { Item } = Form;

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);
  const navigate = useNavigate();
  const persistedEmail = storageSession.getItem("loginEmail") || "";

  const onFinish = async (values: LoginData) => {
    try {
      dispatch(login()); // Update the loading state
      const { user } = await loginUser(values); // Call the loginUser API

      // Update the user state with the retrieved user data
      dispatch(setUser(user));

      navigate("/");
      return;
    } catch (error: unknown) {
      let errorMessage = "An error occurred.";
      if (error instanceof Error) {
        if (error.message === "Login failed") {
          errorMessage = "Invalid credentials. Please try again.";
        }
      }

      dispatch(setError(errorMessage));
    }
  };

  const onValuesChange = (changedValues: LoginData) => {
    if (changedValues.email) {
      storageSession.setItem("loginEmail", changedValues.email);
    }
    dispatch(setError(null));
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <Spin spinning={loading}>
          <Form
            className="login-form"
            onFinish={onFinish}
            onValuesChange={onValuesChange}
            initialValues={{
              email: persistedEmail instanceof Promise ? "" : persistedEmail,
            }}
            validateTrigger="onChange"
          >
            {" "}
            <Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
              ]}
            >
              <Input />
            </Item>
            <Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input.Password />
            </Item>
            <Item>
              {error && <Alert message={error as string} type="error" />}
              <Button type="primary" htmlType="submit">
                Login
              </Button>
              <span style={{ marginLeft: "8px" }}>
                Don't have an account? <Link to="/register">Register</Link>
              </span>
            </Item>
          </Form>
        </Spin>
        <img
          className="background-image"
          src="https://img.freepik.com/free-photo/picture-frame-by-velvet-armchair_53876-132788.jpg?size=626&ext=jpg&ga=GA1.2.1226383302.1686331193&semt=ais"
          alt="background"
        />
      </div>
    </div>
  );
};

export default Login;
