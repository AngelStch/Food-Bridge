import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Path from "../../../path.js";
import { loginUser } from "../../../service/ApiService.jsx";
import { toast } from "react-toastify";

const LoginUser = () => {
  const navigation = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: "",
      userPassword: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("This field is Required"),
      userPassword: Yup.string().required("This field is Required"),
    }),
    onSubmit: async (values) => {
      try {
        const data = await loginUser(values);
        if (data?.data?.success) {
          localStorage.setItem("userRole", data.data.data.userRole);
          localStorage.setItem("userName", data.data.data.userName);
          localStorage.setItem("id", data.data.data._id);
          localStorage.setItem("token", data.data.token);
          notifySuccess(data.data.message);
          navigation('/');
        } else {
          notifyError(data.response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  return (
    <div className="containerL-form">
      <header className="header">Влизане, Протебител</header>
      <form onSubmit={formik.handleSubmit} className="form-inputs">
        <div className="input-section">
          <label>Име:</label>
          <input
            type="text"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.userName && formik.errors.userName ? (
            <div className="error-message">{formik.errors.userName}</div>
          ) : null}
        </div>
        <div className="input-section">
          <label>Парола:</label>
          <input
            type="password"
            name="userPassword"
            value={formik.values.userPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.userPassword && formik.errors.userPassword ? (
            <div className="error-message">{formik.errors.userPassword}</div>
          ) : null}
        </div>
        <button type="submit">Влизане</button>
        <Link to={Path.RegisterUser} className="registerResturant">
           Нямате акаунт? Кликнете се тук.
        </Link>
      </form>
    </div>
  );
};

export default LoginUser;
