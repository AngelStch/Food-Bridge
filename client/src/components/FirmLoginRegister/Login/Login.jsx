import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Path from "../../../path.js";
import { loginResturant } from "../../../service/ApiService.jsx";
import { toast } from "react-toastify";

const LoginFirm = () => {
  const navigation = useNavigate();

  const formik = useFormik({
    initialValues: {
      resturantName: "",
      resturantPassword: "",
    },
    validationSchema: Yup.object({
      resturantName: Yup.string().required("Задължително"),
      resturantPassword: Yup.string().required("Задължително"),
    }),
    onSubmit: async (values) => {
      try {
        const data = await loginResturant(values);
        if (data?.data?.success) {
          localStorage.setItem("userRole", data.data.data.userRole);
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("resturantName", data.data.data.resturantName);
          localStorage.setItem("id", data.data.data._id);
          notifySuccess(data.data.message);
          navigation("/");
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
      <header className="header">Влизане за Ресторанти</header>
      <form onSubmit={formik.handleSubmit} className="form-inputs">
        <div className="input-section">
          <label>Име на ресторант:</label>
          <input
            type="text"
            name="resturantName"
            value={formik.values.resturantName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.resturantName && formik.errors.resturantName ? (
            <div className="error-message">{formik.errors.resturantName}</div>
          ) : null}
        </div>
        <div className="input-section">
          <label>Парола:</label>
          <input
            type="password"
            name="resturantPassword"
            value={formik.values.resturantPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.resturantPassword &&
          formik.errors.resturantPassword ? (
            <div className="error-message">
              {formik.errors.resturantPassword}
            </div>
          ) : null}
        </div>
        <button type="submit">Влизане</button>
        <Link to={Path.RegisterFirm} className="registerResturant">
            Нямате акаунт? Кликнете се тук.
        </Link>
      </form>
    </div>
  );
};

export default LoginFirm;
