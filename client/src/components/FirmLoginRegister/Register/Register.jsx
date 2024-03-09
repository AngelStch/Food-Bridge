import "../../../../public/css/styleRegisterFirm.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Path from "../../../path.js";
import {
  loginResturant,
  resturantSignUp,
} from "../../../service/ApiService.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterFirm = () => {
  const navigation = useNavigate();

  const formik = useFormik({
    initialValues: {
      resturantName: "",
      resturantPhone: "",
      resturantAddress: "",
      resturantPassword: "",
      repeatPassword: "",
      resturantCountry: "",
      resturantCity: "",
      resturantRegion: "",
      resturantPostalCode: "",
      userRole: "resturant",
      restaurantImage: "",
    },
    validationSchema: Yup.object({
      resturantName: Yup.string().required("Името на ресторанта е задължително"),
      resturantPhone: Yup.string().required("Телефонният номер е задължителен"),
      resturantAddress: Yup.string().required("Адресът е задължителен"),
      resturantPassword: Yup.string().required("Задължително"),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("resturantPassword"), null], "Паролите трябва да съвпадат")
        .required("Задължително"),
      resturantCountry: Yup.string().required("Страната е задължителна"),
      resturantCity: Yup.string().required("Градът е задължителен"),
      resturantRegion: Yup.string().required("Регионът е задължителен"),
      resturantPostalCode: Yup.number().required("Пощенският код е задължителен"),
      restaurantImage: Yup.string().required("Изображението на ресторанта е задължително"),
    }),
    onSubmit: async (values) => {
      try {
        const data = await resturantSignUp(values);
        console.log(data.data);
        if (data?.data?.success) {
          notifySuccess("Ресторанта е регистриран успешно!");
          const formData = {
            resturantName: values.resturantName,
            resturantPassword: values.resturantPassword,
          };
          const { data } = await loginResturant(formData);
          if (data.success) {
            localStorage.setItem("userRole", data.data.userRole);
            localStorage.setItem("token", data.token);
            localStorage.setItem("resturantName", data.data.resturantName);
            localStorage.setItem("id", data.data._id);
            navigation("/");
          }
        } else {
          notifyError(data.response.data.messsage);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);
  return (
    <section className="container-form">
      <header>Регистрация на ресторант</header>
      <form onSubmit={formik.handleSubmit} className="form-inputs">
        <div className="input-section">
          <label>Име на ресторанта</label>
          <input
            type="text"
            name="resturantName"
            placeholder="Въведете име на ресторанта"
            onChange={formik.handleChange}
            value={formik.values.resturantName}
            onBlur={formik.handleBlur}
          />
          {formik.touched.resturantName && formik.errors.resturantName ? (
            <div className="error-message">{formik.errors.resturantName}</div>
          ) : null}
        </div>
        <div className="input-section">
          <label>Телефонен номер</label>
          <input
            type="text"
            name="resturantPhone"
            placeholder="Въведете телефонен номер"
            onChange={formik.handleChange}
            value={formik.values.resturantPhone}
            onBlur={formik.handleBlur}
          />
          {formik.touched.resturantPhone && formik.errors.resturantPhone ? (
            <div className="error-message">{formik.errors.resturantPhone}</div>
          ) : null}
        </div>
        <div className="input-section">
          <label>Адрес</label>
          <input
            type="text"
            name="resturantAddress"
            placeholder="Въведете адрес не ресторанта"
            onChange={formik.handleChange}
            value={formik.values.resturantAddress}
            onBlur={formik.handleBlur}
          />
          {formik.touched.resturantAddress && formik.errors.resturantAddress ? (
            <div className="error-message">
              {formik.errors.resturantAddress}
            </div>
          ) : null}
        </div>
        <div className="input-section">
          <label>Парола</label>
          <input
            type="password"
            name="resturantPassword"
            placeholder="Въведете парола"
            onChange={formik.handleChange}
            value={formik.values.resturantPassword}
            onBlur={formik.handleBlur}
          />
          {formik.touched.resturantPassword &&
            formik.errors.resturantPassword ? (
            <div className="error-message">
              {formik.errors.resturantPassword}
            </div>
          ) : null}
        </div>
        <div className="input-section">
          <label>Повторете паролата</label>
          <input
            type="password"
            name="repeatPassword"
            placeholder="Повторете паролата"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            onBlur={formik.handleBlur}
          />
          {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
            <div className="error-message">{formik.errors.repeatPassword}</div>
          ) : null}
        </div>
        <div className="columns">
          <div className="input-section">
            <label>Държава</label>
            <div className="select-section">
              <select
                name="resturantCountry"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.resturantCountry}
              >
                <option value="" label="Изберете държава" />
                <option value="Bulgaria" label="България" />
                <option value="Serbia" label="Сърбия" />
                <option value="Greece" label="Гърция" />
              </select>
            </div>
            {formik.touched.resturantCountry &&
              formik.errors.resturantCountry ? (
              <div className="error-message">
                {formik.errors.resturantCountry}
              </div>
            ) : null}
          </div>

          <div className="input-section">
            <label>Град</label>
            <input
              type="text"
              name="resturantCity"
              placeholder="Въведете град"
              onChange={formik.handleChange}
              value={formik.values.resturantCity}
              onBlur={formik.handleBlur}
            />
            {formik.touched.resturantCity && formik.errors.resturantCity ? (
              <div className="error-message">{formik.errors.resturantCity}</div>
            ) : null}
          </div>
        </div>
        <div className="columns">
          <div className="input-section">
            <label>Регион</label>
            <input
              type="text"
              name="resturantRegion"
              placeholder="Въведете регион"
              onChange={formik.handleChange}
              value={formik.values.resturantRegion}
              onBlur={formik.handleBlur}
            />
            {formik.touched.resturantRegion && formik.errors.resturantRegion ? (
              <div className="error-message">
                {formik.errors.resturantRegion}
              </div>
            ) : null}
          </div>
          <div className="input-section">
            <label>Пощенски код</label>
            <input
              type="number"
              name="resturantPostalCode"
              placeholder="Въведете пощенски код"
              onChange={formik.handleChange}
              value={formik.values.resturantPostalCode}
              onBlur={formik.handleBlur}
            />
            {formik.touched.resturantPostalCode &&
              formik.errors.resturantPostalCode ? (
              <div className="error-message">
                {formik.errors.resturantPostalCode}
              </div>
            ) : null}
          </div>
        </div>

        <div className="input-section">
          <label>Изображение на ресторанта</label>
          <input
            type="text"
            name="restaurantImage"
            placeholder="Въведете връзка към изображението на ресторанта"
            onChange={formik.handleChange}
            value={formik.values.restaurantImage}
            onBlur={formik.handleBlur}
          />
          {formik.touched.restaurantImage && formik.errors.restaurantImage ? (
            <div className="error-message">{formik.errors.restaurantImage}</div>
          ) : null}
        </div>

        <button type="submit">Регистрирай се</button>
        <Link to={Path.LoginFirm} className="loginResturant">
           Вече сте регистрирани? Кликнете тук!
        </Link>
      </form>
    </section>
  );
};

export default RegisterFirm;
