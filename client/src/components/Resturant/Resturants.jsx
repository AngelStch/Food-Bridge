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
import { resturantsList } from "../../service/ApiService";
import { Link } from "react-router-dom/dist";

export default function Resturants() {
  const [resturants, setResturants] = useState([]);
  const [search, setSearch] = useState("");

  //   const [randerFlag, setRanderFlag] = useState(false);

  const getRestaurants = async (searchTerm) => {
    const { data } = await resturantsList(searchTerm);
    if (data.success) {
      setResturants(data.data);
    } else {
      setResturants([]);
    }
  };

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    getRestaurants(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="menu-box">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="heading-title text-center">
              <h2>Ресторанти</h2>
              <p>
                Насладете се на прекрасната храна на нашите ресторанти. Имаме по нещо за всеки!
              </p>
              <div>
                <input
                  type="text"
                  style={{
                    marginTop: "20px",
                    padding: "8px",
                    width: "250px",
                    marginRight: "8px",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                  }}
                  placeholder="Търси"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  style={{
                    padding: "8px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Търсене
                </button>
              </div>
            </div>
          </div>
        </div>
        {resturants.length === 0 && (
          <div className="row">
            <div className="col-lg-12">
              <div className="special-menu text-center">
                Няма намерени ресторанти
              </div>
            </div>
          </div>
        )}
        <div className="row special-list">
          {resturants &&
            resturants?.map((resturant, index) => {
              return (
                <div
                  key={index}
                  className="col-lg-4 col-md-6 special-grid drinks"
                >
                  <Link to={`/my-offers?id=${resturant._id}`}>
                    <div className="gallery-single fix">
                      <img
                        src={resturant.restaurantImage}
                        style={{ height: "230px", objectFit: "cover", width: "100%" }}
                        className="img-fluid"
                        alt="Image"
                        onError={(e) =>
                          (e.target.src = "images/restaurant1.jpg")
                        }
                      />
                      <div style={{ textAlign: "center" }} className="why-text">
                        <h4>{resturant.resturantName}</h4>
                        <p>Адрес: {resturant.resturantAddress}</p>
                        <h5>Тел.: {resturant.resturantPhone}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
