import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "./authSlice";
import { useNavigate, Link } from "react-router-dom";

const { Title } = Typography;

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};
const registrationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  confirmPassword: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

function AuthRegistration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
      navigate("/login");
    },
  });

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = formik;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
        maxWidth: "400px",
        margin: "0 auto",
        // backgroundColor: "#B8860B",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Title level={2} style={{ color: "#FFFFFF", marginBottom: "20px" }}>
        Registration
      </Title>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Your name"
          required
          validateStatus={touched.username && errors.username ? "error" : ""}
          help={touched.username && errors.username}
        >
          <Input
            name="username"
            prefix={<UserOutlined style={{ color: "#B8860B" }} />}
            placeholder="First and last name"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          required
          validateStatus={touched.email && errors.email ? "error" : ""}
          help={touched.email && errors.email}
        >
          <Input
            name="email"
            prefix={<MailOutlined style={{ color: "#B8860B" }} />}
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          required
          validateStatus={touched.password && errors.password ? "error" : ""}
          help={touched.password && errors.password}
        >
          <Input.Password
            name="password"
            prefix={<LockOutlined style={{ color: "#B8860B" }} />}
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          required
          validateStatus={
            touched.confirmPassword && errors.confirmPassword ? "error" : ""
          }
          help={touched.confirmPassword && errors.confirmPassword}
        >
          <Input.Password
            name="confirmPassword"
            prefix={<LockOutlined style={{ color: "#B8860B" }} />}
            placeholder="Confirm your password"
            value={values.confirmPassword}
            onChange={(e) => {
              handleChange(e);
              setValues({ ...values, confirmPassword: e.target.value });
            }}
            onBlur={handleBlur}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#B8860B",
              borderColor: "#B8860B",
              color: "#FFFFFF",
            }}
          >
            Create Account
          </Button>
        </Form.Item>
        <Form.Item>
          Already have an account? <Link to="/login">Sign in</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AuthRegistration;
