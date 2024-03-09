import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Path from "../../../path.js";
import { loginUser, userSignUp } from "../../../service/ApiService.jsx";
import { toast } from "react-toastify";

const RegisterUser = () => {
  const navigation = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "",
      userPhone: "",
      userAddress: "",
      userPassword: "",
      repeatPassword: "",
      userCountry: "",
      userCity: "",
      userRegion: "",
      userPostalCode: "",
      userRole: "user",
      file: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Името на потребителя е задължително"),
      userPhone: Yup.string().required("Телефонният номер е задължителен"),
      userAddress: Yup.string().required("Адресът е задължителен"),
      userPassword: Yup.string().required("Задължително"),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("userPassword"), null], "Паролите трябва да съвпадат")
        .required("Задължително"),
      userCountry: Yup.string().required("Страната е задължителна"),
      userCity: Yup.string().required("Градът е задължителен"),
      userRegion: Yup.string().required("Регионът е задължителен"),
      userPostalCode: Yup.number().required("Пощенският код е задължителен"),
      file: Yup.mixed().notRequired("Файлът за верификация е задължителен"),
    }),
    onSubmit: async (values) => {
      try {
        const data = await userSignUp(values);
        if (data?.data?.success) {
          notifySuccess("Потрбителя е регистриран успешно!");
          const formData = {
            userName: values.userName,
            userPassword: values.userPassword,
          };
          const { data } = await loginUser(formData);
          if (data?.success) {
            localStorage.setItem("userRole", data.data.userRole);
            localStorage.setItem("userName", data.data.userName);
            localStorage.setItem("id", data.data._id);
            localStorage.setItem("token", data.token);
            navigation("/");
          }
        } else {
          notifyError(data?.response?.data?.messsage);
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
      <header>Регистрация на потребителя</header>
      <form onSubmit={formik.handleSubmit} className="form-inputs">
        <div className="input-section">
          <label>Име</label>
          <input
            type="text"
            name="userName"
            placeholder="Въведете пълно име "
            onChange={formik.handleChange}
            value={formik.values.userName}
            onBlur={formik.handleBlur}
          />
          {formik.touched.userName && formik.errors.userName ? (
            <div className="error-message">{formik.errors.userName}</div>
          ) : null}
        </div>
        <div className="columns">
          <div className="input-section">
            <label>Телефонен номер</label>
            <input
              type="text"
              name="userPhone"
              placeholder="Въведете телефонен номер"
              onChange={formik.handleChange}
              value={formik.values.userPhone}
              onBlur={formik.handleBlur}
            />
            {formik.touched.userPhone && formik.errors.userPhone ? (
              <div className="error-message">{formik.errors.userPhone}</div>
            ) : null}
          </div>
        </div>
        <div className="input-section">
          <label>Адрес</label>
          <input
            type="text"
            name="userAddress"
            placeholder="Въведете адрес не ресторанта"
            onChange={formik.handleChange}
            value={formik.values.userAddress}
            onBlur={formik.handleBlur}
          />
          {formik.touched.userAddress && formik.errors.userAddress ? (
            <div className="error-message">{formik.errors.userAddress}</div>
          ) : null}
        </div>
        <div className="input-section">
          <label>Парола</label>
          <input
            type="password"
            name="userPassword"
            placeholder="Въведете парола"
            onChange={formik.handleChange}
            value={formik.values.userPassword}
            onBlur={formik.handleBlur}
          />
          {formik.touched.userPassword && formik.errors.userPassword ? (
            <div className="error-message">{formik.errors.userPassword}</div>
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
          <div className="columns">
            <div className="input-section">
              <label>Държава</label>
              <div className="select-section">
                <select
                  name="userCountry"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userCountry}
                >
                  <option value="" label="Select a country" />
                  <option value="Bulgaria" label="България" />
                <option value="Serbia" label="Сърбия" />
                <option value="Greece" label="Гърция" />
                </select>
                {formik.touched.userCountry && formik.errors.userCountry ? (
                  <div className="error-message">
                    {formik.errors.userCountry}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="input-section">
              <label>Град</label>
              <input
                type="text"
                name="userCity"
                placeholder="Въведете град"
                onChange={formik.handleChange}
                value={formik.values.userCity}
                onBlur={formik.handleBlur}
              />
              {formik.touched.userCity && formik.errors.userCity ? (
                <div className="error-message">{formik.errors.userCity}</div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="input-section ">
            <label>Регион</label>
            <input
              type="text"
              name="userRegion"
              placeholder="Въведете регион"
              onChange={formik.handleChange}
              value={formik.values.userRegion}
              onBlur={formik.handleBlur}
            />
            {formik.touched.userRegion && formik.errors.userRegion ? (
              <div className="error-message">{formik.errors.userRegion}</div>
            ) : null}
          </div>
          {/* <div className="columns"> */}
          <div className="input-section ">
            <label>Пощенски код</label>
            <input
              type="number"
              name="userPostalCode"
              placeholder="Въведете пощенски код"
              onChange={formik.handleChange}
              value={formik.values.userPostalCode}
              onBlur={formik.handleBlur}
            />
            {formik.touched.userPostalCode && formik.errors.userPostalCode ? (
              <div className="error-message">
                {formik.errors.userPostalCode}
              </div>
            ) : null}
            {/* </div> */}
          </div>
        </div>
        <div className="input-section ">
          <label className="file">Файл за верификация</label>
          <input type="file" id="myFile" name="userImage" />
          {formik.touched.file && formik.errors.file ? (
            <div className="error-message">{formik.errors.file}</div>
          ) : null}
        </div>

        <button type="submit">Регистрация</button>
        <Link to={Path.LoginUser} className="loginResturant">
        Вече сте регистрирани? Кликнете тук!
        </Link>
      </form>
    </section>
  );
};

export default RegisterUser;
