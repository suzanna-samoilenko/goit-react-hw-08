import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginThunk } from "../../redux/auth/operations";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./LoginForm.module.css";
import * as Yup from "yup";

const LoginForm = () => {
  const initialValues = {
    password: "",
    email: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values, options) => {
    console.log(values);
    dispatch(loginThunk(values))
      .unwrap()
      .then(() => navigate("/"));
    options.resetForm();
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={LoginSchema}
    >
      <Form className={styles.loginFormContainer}>
        <label className={styles.loginLabel}>
          <span>Email</span>
          <Field name="email" className={styles.loginFormInput} />
          <ErrorMessage
            name="email"
            component="div"
            className={styles.errorLogin}
          />
        </label>
        <label className={styles.loginLabel}>
          <span>Password</span>
          <Field
            name="password"
            type="password"
            className={styles.loginFormInput}
          />
          <ErrorMessage
            name="password"
            component="div"
            className={styles.errorLogin}
          />
        </label>
        <button type="submit" className={styles.loginBtn}>
          Login
        </button>
        <p>
          Do you have an account?{" "}
          <Link to="/register" className={styles.loginLink}>
            Sign up
          </Link>
        </p>
      </Form>
    </Formik>
  );
};

export default LoginForm;
