// Import Dependencies
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Misc/spinner";
import { store } from "../Misc/cacheStorage";
import { useDispatch } from "react-redux";
import { Notification_A } from "../Misc/notification";
import { domain, months } from "../Misc/helper";
import { set } from "idb-keyval";

// Component
const Login = () => {
    // State
    const [spin, setSpin] = useState(0);
    const [hide, setHide] = useState(0);
    const navigate = useNavigate();
    const Dispatch = useDispatch();

    // Submit Form
    const submitForm = async (e) => {
        e.preventDefault();

        // Define Data
        const data = {};
        data["email"] = e.target[0].value;
        data["password"] = e.target[1].value;
        data["account"] = e.target[2].value;

        // Hide
        setHide(1);

        try {
            const response = await axios({
                method: e.target.method,
                url: domain + "account/login",
                data: data,
            });

            // Spinner
            setSpin(1);

            // Save to Local Storage
            localStorage.setItem("status", JSON.stringify({
                loggedIn: true,
                session: Date.now() + 1000 * 60 * 30,
            }));

            // Sort Pending Data
            const _data = {}

            // Loop
            response.data.company.pending.forEach((prop, index) => {
                const date = prop.date.split("-")
                if (_data[`${months[parseInt(date[1]) - 1]}_${date[0]}_${date[2]}`] !== undefined) {
                    prop["position"] = index
                    _data[`${months[parseInt(date[1]) - 1]}_${date[0]}_${date[2]}`].push(prop)
                } else {
                    _data[`${months[parseInt(date[1]) - 1]}_${date[0]}_${date[2]}`] = []
                    prop["position"] = index
                    _data[`${months[parseInt(date[1]) - 1]}_${date[0]}_${date[2]}`].push(prop)
                }
            })

            // Update Company
            response.data.company.pending = _data

            // fetched
            response.data["fetched"] = true

            // Update User
            set("personal", response.data.user, store);

            // Update Company
            set("company", response.data.company, store);

            // Update State
            Dispatch({ type: "home", payload: response.data });

            // Navigate
            if (response.data.user.account === "administrator") {
                setTimeout(() => {
                    navigate("/app", { replace: true });
                }, 2000);
            } else {
                setTimeout(() => {
                    navigate("/app/laboratory", { replace: true });
                }, 2000);
            }

        } catch (error) {
            // Remove Hide
            setTimeout(() => {
                setHide(0);

                // Notify
                Notification_A(error.response.data.message, false);
            }, 1000);
        }
    };

    return spin === 0 ? (
        <div className="w-100 h-100 lgn" style={{ backgroundColor: "#ffffff" }}>
            <div className="w-100">
                <div className="text-center mb-3">
                    <Link to="/" className="d-inline-flex text-decoration-none">
                        <div className="d-flex">
                            <div className="logo"></div>
                            <div>
                                <h1 className="tit">
                                    ED<span style={{ color: "#0d6efd" }}>SOPH</span>
                                </h1>
                                <div className="line"></div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="notify text-center mb-2"></div>
                <form className="px-4 py-1 mb-4" method="POST" action="account/login" id="login" onSubmit={(e) => submitForm(e)}>
                    <div className="mb-3">
                        <label htmlFor="emailLogin" className="form-label ps-1">
                            Email address:
                        </label>
                        <input type="email" className="form-control form-control-sm" placeholder="someone@email.com" id="emailLogin" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loginPass" className="form-label ps-1">
                            Password:
                        </label>
                        <input type="password" className="form-control form-control-sm" placeholder="**************" id="loginPass" required />
                        <div id="loginPass" className="form-text text-danger ps-1">
                            Must be 8-20 characters long.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">
                            Account Type:
                        </label>
                        <select className="form-select form-select-sm" name="type" id="type" defaultValue="Administrator" required>
                            <option value="Administrator">Administrator</option>
                            <option value="Receptionist">Receptionist</option>
                            <option value="Laboratory_Scientist">Laboratory Scientist</option>
                            <option value="Radiologist">Radiologist</option>
                            <option value="Receptionist,_Laboratory Scientist">Receptionist + Laboratory Scientist</option>
                            <option value="Receptionist,_Technician">Receptionist + Technician</option>
                        </select>
                    </div>
                    <div className="text-end pt-3 d-flex justify-content-end">
                        <div className="d-inline-flex pt-1" style={{ fontSize: ".9rem" }}>
                            <p className="mb-0 me-2 sgx">Don't have an account?</p>
                            <Link to="/register" className="d-inline-flex text-decoration-underline me-3">
                                Register
                            </Link>
                        </div>
                        <button type="submit" className="btn btn-primary btn-sm px-4" style={{ display: `${hide === 0 ? "block" : "none"}` }}>
                            Login
                        </button>
                        <button className="btn bg-primary btn-sm px-4" type="button" style={{ display: `${hide === 1 ? "block" : "none"}` }}>
                            <span className="spinner-border spinner-border-sm text-light mx-2" role="status" aria-hidden="true"></span>
                            <span className="visually-hidden">Loading...</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : (
        <Spinner />
    );
};

export default Login;
