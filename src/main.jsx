import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import CountPage from "./pages/CountPage/CountPage";
import Currency from "./pages/CurrencyPage/Currency";
import Modal from "./pages/Modal/Modal";
import PhotoCollection from "./pages/PhotoCollection/PhotoCollection";
import Quiz from "./pages/Quiz/Quiz";
import UsersList from "./pages/UsersList/UsersList";

import "./index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/countpage' element={<CountPage />} />
        <Route path='/currency' element={<Currency />} />
        <Route path='/modalpage' element={<Modal />} />
        <Route path='/photocollection' element={<PhotoCollection />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/userlist' element={<UsersList />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
