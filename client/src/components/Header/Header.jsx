import Path from "../../path.js";
import { Link, useNavigate } from "react-router-dom";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Header() {
  const [isloggedIn, setIsloggedIn] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isResturant, setIsResturant] = useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");
  const navigate = useNavigate();
  useEffect(() => {
    if (token && role) {
      setIsloggedIn(true);
      if (role === "user") {
        setIsUser(true);
      } else if (role === "resturant") {
        setIsResturant(true);
      }
    } else {
      setIsloggedIn(false);
      setIsUser(false);
      setIsResturant(false);
    }
  }, [token, role]);

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <header className="top-navbar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand">
              <img style={{ width: "170px" }} src="/logo.svg" alt="logo" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbars-rs-food"
              aria-controls="navbars-rs-food"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* <ToastContainer/> */}
            <div className="collapse navbar-collapse" id="navbars-rs-food">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={Path.Home} className="nav-link">
                    Начало
                  </Link>
                </li>
                {isResturant && (
                  <>
                    <li className="nav-item">
                      <Link to={Path.Contact} className="nav-link">
                        Контакт
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={Path.createOffers} className="nav-link">
                        Създай оферта
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={Path.myOffers} className="nav-link">
                        Мои оферти
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <Link to={Path.About} className="nav-link">
                    Повече за сайта
                  </Link>
                </li>
                {isUser && (
                  <>
                    <li className="nav-item">
                      <Link to={Path.Contact} className="nav-link">
                        Контакти
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={Path.Cart} className="nav-link">
                        Моят количка
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={Path.resturants} className="nav-link">
                        Ресторанти
                      </Link>
                    </li>
                  </>
                )}

                {isloggedIn ? (
                  <li onClick={() => logOut()} className="nav-item">
                    <Link to={"/"} className="nav-link">
                      Изход
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="dropdown-a"
                      data-toggle="dropdown"
                    >
                      Добре дошли
                    </a>
                    <div className="dropdown-menu" aria-labelledby="dropdown-a">
                      <Link to={Path.RegisterFirm} className="dropdown-item">
                        Ресторант
                      </Link>
                      <Link to={Path.RegisterUser} className="dropdown-item">
                        Потребител
                      </Link>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
