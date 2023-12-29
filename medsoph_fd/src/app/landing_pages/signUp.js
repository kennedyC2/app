// Import Dependencies
import React, { useState } from "react";
import { sex, RF_days, months, hours, CalenderYear, states } from "../Misc/helper";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Misc/spinner";
import { Notification_A } from "../Misc/notification";
import { domain } from "../Misc/helper";
import { set } from "idb-keyval";
import { store } from "./../Misc/cacheStorage";
import { useDispatch } from "react-redux";

// Component
const SignUP = () => {
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
        data["firstname"] = e.target[0].value;
        data["lastname"] = e.target[1].value;
        data["other"] = e.target[2].value;
        data["sex"] = e.target[3].value;
        data["phone"] = e.target[4].value;
        data["email"] = e.target[5].value;
        data["day"] = e.target[6].value;
        data["month"] = e.target[7].value;
        data["year"] = e.target[8].value;
        data["state"] = e.target[9].value;
        data["country"] = e.target[10].value;
        data["password"] = e.target[11].value;

        // time
        const now = new Date(Date.now());
        data["time"] = `${hours[now.getHours()].split(":")[0]}:${now.getMinutes() < 10 ? "0" + now.getMinutes().toString() : now.getMinutes().toString()} ${hours[now.getHours()].split(":")[1]}`;
        data["date"] = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

        // Hide
        setHide(1);

        try {
            const response = await axios({
                method: e.target.method,
                url: domain + "account/signUp",
                data: data,
            });

            // Spinner
            setSpin(1);

            // fetched
            response.data["fetched"] = true

            // Update User
            await set("personal", response.data, store);

            // Update State
            Dispatch({ type: "personal", payload: response.data });

            setTimeout(() => {
                navigate("/account/verification", { replace: true });
            }, 2000);
        } catch (error) {
            // Remove Hide
            setTimeout(() => {
                setHide(0);

                // Notify
                document.querySelector("div#root").scrollTo(0, 0);
                Notification_A(error.response.data.message, false);
            }, 1000);
        }
    };

    return spin === 0 ? (
        <div className="w-100 h-100 d-flex justify-content-center" style={{ backgroundColor: "#ffffff" }}>
            <div className="w-100">
                <div className="text-center pt-5 mb-3">
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
                <form action="account/signUp" method="POST" className="px-4 py-1" id="SignUP" onSubmit={(e) => submitForm(e)}>
                    <div className="d-lg-flex justify-content-between">
                        <div className="inn">
                            <div className="mb-3">
                                <label htmlFor="firstname" className="form-label">
                                    Firstname: <span className="text-danger fs-5">*</span>
                                </label>
                                <input type="text" className="form-control form-control-sm" name="firstname" id="firstname" placeholder="Amadi" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastname" className="form-label">
                                    Lastname: <span className="text-danger fs-5">*</span>
                                </label>
                                <input type="text" className="form-control form-control-sm" name="lastname" id="lastname" placeholder="Precious" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="other" className="form-label">
                                    Other (names): <span className="text-danger fs-5">*</span>
                                </label>
                                <input type="text" className="form-control form-control-sm" name="other" id="other" placeholder="Chioma" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="sex" className="form-label">
                                    Sex: <span className="text-danger fs-5">*</span>
                                </label>
                                <select className="form-select form-select-sm" name="sex" aria-label="Default select" required>
                                    <option value="" disabled>
                                        select
                                    </option>
                                    {sex.map((key, index) => (
                                        <option key={index} value={key}>
                                            {key}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">
                                    Phone: <span className="text-danger fs-5">*</span>
                                </label>
                                <input type="text" className="form-control form-control-sm" name="phone" id="phone" placeholder="+2340000000000" required />
                            </div>
                        </div>
                        <div className="inn">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email: <span className="text-danger fs-5">*</span>
                                </label>
                                <input type="email" className="form-control form-control-sm" name="email" id="email" placeholder="someone@email.com" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="age" className="form-label">
                                    Date of Birth: <span className="text-danger fs-5">*</span>
                                </label>
                                <div className="input-group">
                                    <select className="form-select form-select-sm me-1" name="day" defaultValue={"Default"} aria-label="Default select" required>
                                        <option value="Default" disabled>
                                            Day
                                        </option>
                                        {RF_days.map((key, index) => (
                                            <option key={index} value={key}>
                                                {key}
                                            </option>
                                        ))}
                                    </select>
                                    <select className="form-select form-select-sm me-1" name="month" aria-label="Default select" defaultValue={"Default"} style={{ width: "90px" }} required>
                                        <option value="Default" disabled>
                                            Month
                                        </option>
                                        {months.map((key, index) => (
                                            <option key={index} value={key}>
                                                {key}
                                            </option>
                                        ))}
                                    </select>
                                    <select className="form-select form-select-sm" name="year" aria-label="Default select" defaultValue={"Default"} required>
                                        <option value="Default" disabled>
                                            Year
                                        </option>
                                        {CalenderYear().map((key, index) => (
                                            <option key={index} value={key}>
                                                {key}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="state" className="form-label">
                                    State: <span className="text-danger fs-5">*</span>
                                </label>
                                <select className="form-select form-select-sm" name="state" id="state" required>
                                    <option value="" disabled>
                                        select
                                    </option>
                                    {states.map((key, index) => (
                                        <option key={index} value={key}>
                                            {key.split(" ")[0]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="country" className="form-label">
                                    Country: <span className="text-danger fs-5">*</span>
                                </label>
                                <select className="form-select form-select-sm" name="country" id="country" required>
                                    <option value="" disabled>
                                        select
                                    </option>
                                    <option value="Nigeria">Nigeria</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password: <span className="text-danger fs-5">*</span>
                                </label>
                                <input type="password" className="form-control form-control-sm" name="password" id="password" placeholder="***************" required />
                                <div id="password" className="form-text text-danger ps-1">
                                    Must be 8-20 characters long.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-4 text-end d-flex justify-content-end">
                        <div className="d-inline-flex pt-1" style={{ fontSize: ".9rem" }}>
                            <p className="mb-0 me-2 sgx">Already have an account?</p>
                            <Link to="/login" className="d-inline-flex text-decoration-underline me-3">
                                Login
                            </Link>
                        </div>
                        <button type="submit" className="btn btn-primary btn-sm px-3 mb-1" style={{ display: `${hide === 0 ? "block" : "none"}` }}>
                            Register
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

export default SignUP;
