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
import {
  getCartList,
  addToCart,
  checkoutApi,
  removeFromCart,
} from "../../service/ApiService";
import { Link, useLocation, useParams } from "react-router-dom/dist";
import { toast } from "react-toastify";

export default function index() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const location = useLocation();

  const getAllCarts = async () => {
    const id = localStorage.getItem("id");
    const { data } = await getCartList(id);
    if (data.success) {
      let subTotal = 0;
      data.data.forEach((item) => {
        const subtotal = item.quantity * item.offerId.price;
        subTotal += subtotal;
      });
      setSubTotal(subTotal);
      setTotal(subTotal);
      setCart(data.data);
    }
  };

  const handleRemove = async (item) => {
    const id = localStorage.getItem("id");
    const payload = {
      userId: id,
      offerId: item,
      quantity: 1,
    };
    const { data } = await removeFromCart(payload);
    if (data.success) {
      notifySuccess("Продуктът е премахнат от количката.");
    }
    getAllCarts();
  };

  const handleAdd = async (item) => {
    const id = localStorage.getItem("id");
    const payload = {
      userId: id,
      offerId: item.offerId._id,
      quantity: 1,
    };
    const { data } = await addToCart(payload);

    if (data.success === true) {
      notifySuccess("Продуктът е добавен в количката!");
    } else {
      notifyError(data.message);
    }
    getAllCarts();
  };

  const handleCheckout = async () => {
    const id = localStorage.getItem("id");
    const payload = {
      userId: id,
    };
    const { data } = await checkoutApi(payload);

    console.log("RES:: ", data);
    if (data.success) {
      notifySuccess("Благодарим ви за поръчката!");
      await getAllCarts();
    } else {
      notifyError(data.message);
    }
  };

  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);

  useEffect(() => {
    getAllCarts();
  }, []);

  return (
    <div className="menu-box">
      <div className="container">
        <div className="h-100 h-custom">
          <div className="h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
                <div className="card">
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="col-lg-7">
                        <div className="">
                          <h5 className="mb-3">
                            <div className="text-body h-5">
                              <i className="fa fa-long-arrow-alt-left me-2"></i>
                              Продукти ({cart.length})
                            </div>
                          </h5>
                          <hr />
                        </div>

                        <div
                          className="px-3"
                          style={{ height: "58vh", overflowY: "scroll" }}
                        >
                          {cart &&
                            cart.map((item) => (
                              <div className="card mb-3 shadow" key={item._id}>
                                <div className="card-body">
                                  <div className="d-flex justify-content-between">
                                    <div style={{width: "50%"}} className="d-flex flex-column flex-sm-row align-items-sm-center">
                                      <div className="mr-3">
                                        <img
                                          src={item?.offerId?.offerImage}
                                          className="img-fluid rounded-3"
                                          alt="item"
                                          style={{
                                            width: "60px",
                                            height: "65px",
                                            objectFit: "cover",
                                          }}
                                        />
                                      </div>
                                      <div className="ms-3">
                                        <h5>{item?.offerId.mealName}</h5>
                                      </div>
                                    </div>
                                    <div style={{width: "50%"}} className="d-flex flex-row align-items-center justify-content-between ">
                                      <div
                                        // style={{
                                        //   width: "50px",
                                        //   height: "13px",
                                        // }}
                                      >
                                        <h5 className="fw-normal mb-0">
                                          {item?.quantity}
                                        </h5>
                                      </div>
                                      <div
                                        // style={{
                                        //   width: "80px",
                                        //   height: "13px",
                                        // }}
                                      >
                                        <h5 className="mb-0">
                                          {item?.offerId.price} лв.
                                        </h5>
                                      </div>
                                      <div className="d-flex justify-between">
                                        <div
                                          className="mr-2 cursor"
                                          onClick={() => handleRemove(item._id)}
                                          style={{ color: "#cecece"}}
                                        >
                                          <i style={{fontSize : "1.5em"}} className="fa fa-minus fa-"></i>
                                        </div>
                                        <div
                                          className="cursor"
                                          onClick={() => handleAdd(item)}
                                          style={{ color: "#cecece" }}
                                        >
                                          <i style={{fontSize : "1.5em"}} className="fa fa-plus fa-"></i>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                </div>
                                
                              </div>
                            ))}
                            {/* <div class="row mb-4 d-flex justify-content-between align-items-center">
                    <div class="col-md-2 col-lg-2 col-xl-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
                        class="img-fluid rounded-3" alt="Cotton T-shirt"/>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-3">
                      <h6 class="text-muted">Shirt</h6>
                      <h6 class="text-black mb-0">Cotton T-shirt</h6>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                      <button class="btn btn-link px-2"
                        onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                        <i class="fas fa-minus"></i>
                      </button>

                      <input id="form1" min="0" name="quantity" value="1" type="number"
                        class="form-control form-control-sm" />

                      <button class="btn btn-link px-2"
                        onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h6 class="mb-0">€ 44.00</h6>
                    </div>
                    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                      <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
                    </div>
                  </div> */}
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div
                          className="card text-white rounded-3"
                          style={{
                            position: "sticky",
                            top: "96px",
                            background: "#d9a46f",
                          }}
                        >
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                              <h5 className="mb-0 text-white h5">
                                Card details
                              </h5>
                            </div>

                            <hr className="my-4" />

                            <div className="d-flex justify-content-between">
                              <p className="mb-2">Междинна сума</p>
                              <p className="mb-2">{subTotal} лв.</p>
                            </div>

                            <div className="d-flex justify-content-between">
                              <p className="mb-2">Доставка</p>
                              <p className="mb-2">{deliveryCharges} (Безплатна)</p>
                            </div>

                            <div className="d-flex justify-content-between mb-4">
                              <p className="mb-2">Общо</p>
                              <p className="mb-2">{total + deliveryCharges} лв.</p>
                            </div>

                            {cart && cart.length > 0 ? (
                              <div
                                onClick={() => handleCheckout()}
                                className="btn btn-info btn-block btn-lg"
                              >
                                <div className="d-flex justify-content-between">
                                  <span>{total} лв.</span>
                                  <span>
                                  Плащане{" "}
                                    <i className="fas fa-long-arrow-alt-right ms-2"></i>
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className="btn btn-secondary btn-block btn-lg">
                                <div className="d-flex justify-content-between">
                                  <span>{total} лв.</span>
                                  <span>
                                  Плащане{" "}
                                    <i className="fas fa-long-arrow-alt-right ms-2"></i>
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
