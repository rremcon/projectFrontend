import React, {useContext} from 'react';
import {AuthContext} from "./context/AuthContext";
import './styles/App.css';
import Nav from "./components/Nav/Nav";
import {Navigate, Route, Routes, } from "react-router-dom";
import HomeLogin from "./pages/Home/HomeLogin";
import Registration from "./pages/Registration/Registration";
import AccountPage from "./pages/Account/AccountPage";
import Products from "./pages/Product/Products";
import BuyProductPage from "./pages/Product/BuyProductPage";
import AdminPage from "./pages/Administrator/AdminPage";
import AdminAccounts from "./pages/Administrator/AdminAccounts";
import AdminOrders from "./pages/Administrator/AdminOrders";
import TicketsAdmin from "./pages/Administrator/AdminTickets";
import AddTicket from "./pages/Administrator/AddTicket";
import Tickets from "./pages/Ticket/Tickets";
import BookTicketPage from "./pages/Booking/BookTicketPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import Picture from "./components/Picture/Picture";
import race_helmet from './assets/race_helmet.png';
import dtm_car_porsche_bmw from "./assets/dtm_car_porsche_bmw.png";
import sbk_moto_gp_circuit_racing from "./assets/sbk-moto-gp-circuit-racing.jpg";
import f1_car_redbull_spa_francorchamps from "./assets/f1-car-redbull-spa-francorchamps.jpg";


function App() {

    const {isAuth} = useContext(AuthContext);

    return (

      <>
          <header id="header" className="outer-content-container">
              <div className="inner-content-container">

                  <div className="header-container">

                      <Picture
                          className="image-wrapper"
                          img={race_helmet}
                          imgTitle="helmet"
                      />

                      <h2>ticketsdutchgp.com</h2>
                      <h3><em>Racing Events.</em></h3>

                      <Nav/>

                  </div>

              </div>

          </header>

          <Routes>
              <Route path="/" element={<HomeLogin/>} />
              <Route path="/registration" element={<Registration/>} />
              <Route path="/account" element={ isAuth ? <AccountPage/> : <Navigate to="/"/>}/>
              <Route path="/tickets" element={<Tickets/>} />
              <Route path="/ticket/:id" element={<BookTicketPage/>} />
              <Route path="/products" element={<Products/>} />
              <Route path="/product/:id" element={<BuyProductPage/>}/>

              <Route path="/admin" element={ isAuth ? <AdminPage/> : <Navigate to="/"/>} />
              <Route path="/admin/accounts" element={<AdminAccounts/>} />
              <Route path="/admin/orders" element={<AdminOrders/>} />
              <Route path="/admin/tickets" element={<TicketsAdmin/>} />
              <Route path="/admin/add/ticket" element={<AddTicket/>} />

              <Route path="*" element={<NotFoundPage/>}/>
          </Routes>


          <footer id="footer" className="outer-content-container">
              {/*<>*/}
                  <div className="inner-content-container">
                      {/*<div className="footer-images-container">*/}
                      <div className="footer-container">

                          <Picture
                              className="image-wrapper"
                              img={f1_car_redbull_spa_francorchamps}
                              imgTitle="f1_car_redbull_spa_francorchamps"
                          />
                          <Picture
                              className="image-wrapper"
                              img={sbk_moto_gp_circuit_racing}
                              imgTitle="sbk_moto_gp_circuit_racing"
                          />
                          <Picture
                              className="image-wrapper"
                              img={dtm_car_porsche_bmw}
                              imgTitle="dtm-car-porsche-bmw"
                          />
                      </div>
                      {/*</div>*/}
                  {/*</>*/}
                  {/*<div className="footer-copyright-tekst">*/}
                  <h6>info@ticketsdutchgp.com</h6>
              {/*</div>*/}
              </div>
          </footer>

       </>
  );
}

export default App;
