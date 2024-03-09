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
import { getOfferDetails, addToCart } from "../../service/ApiService";
import { Link, useLocation, useParams } from "react-router-dom/dist";
import { toast } from "react-toastify";
export default function index() {
  const [offer, setOffer] = useState({});
  //   const [restId, setRestId] = useState("");
  const location = useLocation();
  const { offer_id, restaurantId } = useParams();
  const userId = localStorage.getItem("id");

  const queryParams = new URLSearchParams(location.search);
  const restId = queryParams.get("restaurantId");

  const getOfferDetail = async () => {
    const { data } = await getOfferDetails(offer_id);
    setOffer(data.data);
  };

  const handleAddToCart = async () => {
    const payload = {
      userId: userId,
      offerId: offer_id,
      quantity: 1,
    };
    const { data } = await addToCart(payload);

    if (data.success === true) {
      notifySuccess("Продуктът е добавен в кошницата!");
    } else {
      notifyError(data.message);
    }
  };

  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);
  useEffect(() => {
    getOfferDetail();
  }, []);

  return (
    <div className="menu-box">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="heading-title text-center">
              <h2> Детайли за офертата</h2>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <Link to={`/my-offers?id=${restId}`}>
            <button
              style={{
                padding: "10px",
                color: "#fff",
                backgroundColor: "#f44336",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              className="bg-primary px-4 text-white hover:cursor-pointer"
            >
              Обратно към офертите
            </button>
          </Link>
          <p
            className="text-black"
            style={{ fontSize: "19px", fontWeight: "bold" }}
          >
        Подробности
          </p>
        </div>

        <hr />

        <div className="card mb-3">
          <div className="row no-gutters relative">
            <div className="col-md-4">
              <img
                src={offer.offerImage}
                style={{
                  height: "230px",
                  width: "100%",
                  objectFit: "cover",
                }}
                className="card-img"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{offer.mealName}</h5>
                <p className="card-text">{offer.description}</p>

                <p>
                Съставки: <strong>{offer.ingrediants}</strong>
                </p>

                <p className="card-text">
                  <small className="text-muted">
                  Последно актуализирано: Преди {offer.createdAt} 
                  </small>
                </p>
              </div>
            </div>

            <div
              className=""
              style={{ top: "0", right: "0", position: "absolute" }}
            >
              <button
                onClick={() => handleAddToCart()}
                className="cart-btn btn btn-primary"
              >
                <i className="fa fa-shopping-cart mr-2"></i>
                Добави в кошницата
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
