import Header from "./components/Header/Header.jsx";
import About from "./components/About/About.jsx";
import { Routes, Route } from "react-router-dom";
import Path from "./path.js";

import Footer from "./components/Footer/Footer.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Home from "./components/Home/Home.jsx";
import RegisterFirm from "./components/FirmLoginRegister/Register/Register.jsx";
import LoginFirm from "./components/FirmLoginRegister/Login/Login.jsx";
import RegisterUser from "./components/UserLoginRegiter/Register/Register.jsx";
import LoginUser from "./components/UserLoginRegiter/Login/Login.jsx";
import Offers from "./components/offers/Offer.jsx";
import CreateOffer from "./components/CreateOffers/CreateOffer.jsx";
import EditOffer from "./components/EditOffer/EditOffer.jsx";
import Resturants from "./components/Resturant/Resturants.jsx";
import OfferDetails from "./components/OfferDetails/index.jsx";
import Cart from "./components/Cart/Cart.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={Path.Home} element={<Home />} />
        <Route path={Path.About} element={<About />} />
        <Route path={Path.Contact} element={<Contact />} />
        <Route path={Path.RegisterFirm} element={<RegisterFirm />} />
        <Route path={Path.LoginFirm} element={<LoginFirm />} />
        <Route path={Path.RegisterUser} element={<RegisterUser />} />
        <Route path={Path.LoginUser} element={<LoginUser />} />
        <Route path={Path.myOffers} element={<Offers />} />
        <Route path={Path.createOffers} element={<CreateOffer />} />
        <Route path={Path.editOffers} element={<EditOffer />} />
        <Route path={Path.resturants} element={<Resturants />} />
        <Route path={Path.offerDetails} element={<OfferDetails />} />
        <Route path={Path.Cart} element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
