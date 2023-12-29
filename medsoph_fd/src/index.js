//  Import libraries
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Index from "./app/landing_pages/index";
import Login from "./app/landing_pages/login";
import SignUP from "./app/landing_pages/signUp";
import Home from "./app/landing_pages/home";
import Verify from "./app/landing_pages/verification";
import App from "./app/app";
import ProtectedRoute from "./app/Misc/private";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

// Base
const Base = () => {
    return (
        <div className="ext d-lg-flex align-items-center w-100 h-100">
            <Routes>
                <Route path="/" exact element={<Index />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/register" exact element={<SignUP />} />
                <Route path="/account/verification" exact element={<Verify />} />
                <Route path="/app" element={<ProtectedRoute />}>
                    <Route path="/app" exact element={<Home />} />
                    <Route path="/app/laboratory/*" exact element={<App />} />
                </Route>
            </Routes>

            <div className="modal" id="notificationPane" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="notificationPaneLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

createRoot(document.querySelector("#root")).render(
    <BrowserRouter>
        <Provider store={store}>
            <Base />
        </Provider>
    </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
