import React, { useEffect, useState } from "react";
import "../../../public/css/styleLoginFirm.css";
import { getOffer, updateOffer } from "../../service/ApiService.jsx";
import { useNavigate, useParams } from "react-router-dom/dist/index.js";

export default function EditOffer() {
  const navigate = useNavigate();

  const { offer_id } = useParams();

  const [formData, setFormData] = useState({
    mealName: "",
    price: 0,
    quantity: null,
    description: "",
    ingrediants: "",
    resturantId: localStorage.getItem("id"),
    offerImage: "",
  });

  const getSingleOffer = async () => {
    const { data } = await getOffer(offer_id);
    setFormData(data.data);
  };

  useEffect(() => {
    getSingleOffer();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const { data } = await updateOffer(offer_id, formData);
    console.log(data);
    if (data.success) navigate("/my-offers");
  };

  return (
    <section className="container-form">
      <header>Редактиране на оферта</header>
      <form onSubmit={handleSubmit} className="form-inputs">
        <div className="input-section">
          <label>Име на ястието</label>
          <input
            type="text"
            name="mealName"
            placeholder="Въведете име на ястието"
            value={formData.mealName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="columns">
          <div className="input-section">
            <label>Цена</label>
            <input
              type="number"
              name="price"
              placeholder="Въведете цена"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="columns">
          <div className="input-section">
            <label>Количество</label>
            <input
              type="number"
              name="quantity"
              placeholder="Въведете количество"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="input-section">
          <label>Описание</label>
          <input
            type="text"
            name="description"
            placeholder="Въведете описание"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-section">
          <label>Съставките</label>
          <input
            type="text"
            name="ingrediants"
            placeholder="Въведете съставките"
            value={formData.ingrediants}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-section address-section">
          <label className="file">Изображение на ястието</label>
          <input
            type="text"
            id="myFile"
            placeholder="въведете връзка към изображението"
            name="offerImage"
            value={formData.offerImage}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Редактиране</button>
      </form>
    </section>
  );
}
