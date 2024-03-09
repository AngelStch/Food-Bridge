import React from "react";
import "../../../public/css/styleLoginFirm.css";
import { createOffer } from "../../service/ApiService.jsx";
import { useNavigate } from "react-router-dom/dist/index.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
//for the message
export default function CreateOffer() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      mealName: "",
      price: "",
      quantity: null,
      description: "",
      ingrediants: "",
      offerImage: "",
    },
    validationSchema: Yup.object({
      mealName: Yup.string().required("Задължително"),
      price: Yup.number().required("Задължително"),
      quantity: Yup.number().required("Задължително"),
      description: Yup.string().required("Задължително"),
      ingrediants: Yup.string().required("Required"),
      offerImage: Yup.mixed().required("Задължително"),
    }),
    onSubmit: async (values) => {
      try {
        values.resturantId = localStorage.getItem("id");
        console.log(values);
        const { data } = await createOffer(values);
        console.log(data);
        if (data.success) {
          notifySuccess(data.messsage);
          navigate("/my-offers");
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
      <header>Създайте оферта за ресторант</header>
      <form onSubmit={formik.handleSubmit} className="form-inputs">
        <div className="input-section">
          <label>Име на ястието</label>
          <input
            type="text"
            name="mealName"
            placeholder="Въведете име на ястието"
            onChange={formik.handleChange}
            value={formik.values.mealName}
            onBlur={formik.handleBlur}
          />
          {formik.touched.mealName && formik.errors.mealName ? (
            <div className="error-message">{formik.errors.mealName}</div>
          ) : null}
        </div>
        <div className="columns">
          <div className="input-section">
            <label>Цена</label>
            <input
              type="number"
              name="price"
              placeholder="Въведете цена"
              onChange={formik.handleChange}
              value={formik.values.price}
              onBlur={formik.handleBlur}
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="error-message">{formik.errors.price}</div>
            ) : null}
          </div>
        </div>

        <div className="columns">
          <div className="input-section">
            <label>Количество</label>
            <input
              type="number"
              name="quantity"
              placeholder="Въведете количество"
              onChange={formik.handleChange}
              value={formik.values.quantity}
              onBlur={formik.handleBlur}
            />
            {formik.touched.quantity && formik.errors.quantity ? (
              <div className="error-message">{formik.errors.quantity}</div>
            ) : null}
          </div>
        </div>

        <div className="input-section">
          <label>Описание</label>
          <input
            type="text"
            name="description"
            placeholder="Въведете описание"
            onChange={formik.handleChange}
            value={formik.values.description}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="error-message">{formik.errors.description}</div>
          ) : null}
        </div>
        <div className="input-section">
          <label>Съставки</label>
          <input
            type="text"
            name="ingrediants"
            placeholder="Въведете съставки"
            onChange={formik.handleChange}
            value={formik.values.ingrediants}
            onBlur={formik.handleBlur}
          />
          {formik.touched.ingrediants && formik.errors.ingrediants ? (
            <div className="error-message">{formik.errors.ingrediants}</div>
          ) : null}
        </div>
        <div className="input-section address-section">
          <label className="file">Изображение на ястието</label>
          <input
            type="text"
            id="myFile"
            placeholder="Въведете връзка към изображението:"
            name="offerImage"
            onChange={formik.handleChange}
            value={formik.values.offerImage}
            onBlur={formik.handleBlur}
          />
          {formik.touched.offerImage && formik.errors.offerImage ? (
            <div className="error-message">{formik.errors.offerImage}</div>
          ) : null}
        </div>
        <button type="submit">Създай оферта</button>
      </form>
    </section>
  );
}
