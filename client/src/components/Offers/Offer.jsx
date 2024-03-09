// import "../../../public/css/offers.css"
import "../../../public/css/animate.css";
import "../../../public/css/baguetteBox.min.css";
import "../../../public/css/bootstrap.min.css";
import "../../../public/css/style.css";
import "../../../public/css/responsive.css";
import "../../../public/css/superslides.css";
import "../../../public/css/font-awesome.min.css";
import "../../../public/css/classic.time.css";
import "../../../public/css/classic.date.css";
import "../../../public/css/classic.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  offerDeleteRest,
  offerListByRest,
  addToCart,
} from "../../service/ApiService";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { Link, useLocation } from "react-router-dom/dist";

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [restaurant, setRestaurant] = useState({});
  const [randerFlag, setRanderFlag] = useState(false);
  const location = useLocation();

  const [currentItem, setCurrentItem] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const restid = queryParams.get("id");
  const id = localStorage.getItem("id");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // console.log("rest ID:   ", restid);

  const getOffer = async () => {
    const { data } = await offerListByRest(restid || id);
    setOffers(data.data.offerList);
    setRestaurant(data.data.restaurant);
  };

  const deleteOffer = async (id) => {
    console.log("Опитвате се да изтриете оферта с идентификационен номер: ", id);
    setCurrentItem(id);
    handleShow();
    console.log("Текущ набор от елементи: ", currentItem);
  };

  const confirmDelete = async () => {
    const { data } = await offerDeleteRest(currentItem);
    console.log(data);
    if (data.success) {
      setRanderFlag(!randerFlag);
    }
    handleClose();
  };

  const addItemToCart = async (offerId) => {
    const payload = {
      userId: id,
      offerId: offerId,
      quantity: 1,
    };
    const { data } = await addToCart(payload);

    console.log("Resp:: ", data);
    if (data.success === true) {
      notifySuccess("Продуктът е добавен в кошницата!");
    } else {
      notifyError(data.message);
    }
  };

  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  useEffect(() => {
    getOffer();
  }, [randerFlag]);

  return (
    <div className="menu-box">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="heading-title text-center">
              <h2> Офертите на {restaurant.resturantName}</h2>
            </div>
          </div>
        </div>
        {offers.length === 0 && (
          <div className="row">
            <div className="col-lg-12">
              <div className="special-menu text-center">
              Няма налични оферти
              </div>
            </div>
          </div>
        )}
        <div className="row special-list">
          {offers &&
            offers?.map((offer, index) => {
              return (
                <div
                  key={index}
                  className="col-lg-4 col-md-6 special-grid drinks"
                >
                  <div className="gallery-single fix">
                    <img
                      src={offer.offerImage}
                      style={{
                        height: "230px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      className="img-fluid"
                      alt="Image"
                      onError={(e) => {
                        e.target.src = "images/img-04.jpg";
                      }}
                    />
                    <div className="why-text">
                      <h4>{offer.mealName}</h4>
                      <p
                        className="dotted-text"
                        data-toggle="tooltip"
                        data-placement="top"
                        title={offer.description}
                      >
                        {offer.description}
                      </p>
                      <div className="d-flex justify-content-between">
                        <h5>{offer.price} лв.</h5>
                        <span className="text-white font-weight-bold">
                        Количество: {offer.quantity}
                        </span>
                      </div>
                      {!restid && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Link to={`/edit-offers/${offer._id}`}>
                            <button
                              style={{
                                padding: "10px",
                                color: "gray",
                                backgroundColor: "#e0e0e0",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                marginRight: "10px",
                              }}
                            >
                             Редактиране
                            </button>
                          </Link>

                          <button
                            style={{
                              padding: "10px",
                              color: "#fff",
                              backgroundColor: "#f44336",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                            onClick={() => deleteOffer(offer._id)}
                          >
                            Изтриване
                          </button>
                        </div>
                      )}
                      {restid && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Link
                            to={`/view-offer-details/${offer._id}?restaurantId=${restid}`}
                          >
                            <button
                              style={{
                                padding: "10px",
                                color: "gray",
                                backgroundColor: "#e0e0e0",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                marginRight: "10px",
                              }}
                            >
                              Подробности
                            </button>
                          </Link>

                          <button
                            style={{
                              padding: "10px",
                              color: "#fff",
                              backgroundColor: "#f44336",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                            onClick={() => addItemToCart(offer._id)}
                          >
                            Добави в кошницата
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Сигурни ли сте?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Искате ли наистина да изтриете тази оферта?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Затвори
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Изтриване
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
