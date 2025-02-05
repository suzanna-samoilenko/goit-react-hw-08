import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerThunk } from "../../redux/auth/operations";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./RegistrationForm.module.css";
import * as Yup from "yup";

const RegistrationForm = () => {
  const initialValues = {
    password: "",
    email: "",
    name: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values, options) => {
    console.log(values);
    dispatch(registerThunk(values))
      .unwrap()
      .then(() => navigate("/"));
    options.resetForm();
  };

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Username must be at least 3 characters long")
      .max(15, "Username must be less than 15 characters")
      .required("Username is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={RegisterSchema}
      >
        <Form className={styles.registerFormContainer}>
          <label className={styles.registerLabel}>
            <span>Name</span>
            <Field className={styles.registerFormInput} name="name" />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.errorRegister}
            />
          </label>
          <label className={styles.registerLabel}>
            <span>Email</span>
            <Field className={styles.registerFormInput} name="email" />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.errorRegister}
            />
          </label>
          <label className={styles.registerLabel}>
            <span>Password</span>
            <Field
              className={styles.registerFormInput}
              name="password"
              type="password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.errorRegister}
            />
          </label>
          <button type="submit" className={styles.registerBtn}>
            Register
          </button>
          <p>
            You already have account?
            <Link to="/login" className={styles.registerLink}>
              {" "}
              Login!
            </Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
