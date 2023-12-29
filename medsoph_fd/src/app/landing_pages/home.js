// Import Dependencies
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { states, hours, domain } from "./../Misc/helper";
import Spinner from "../Misc/spinner";
import axios from "axios";
import { get, set } from "idb-keyval";
import { store } from "../Misc/cacheStorage";
import { Notification_A, Notification_B } from "../Misc/notification";

// Component
const Home = () => {
    const Dispatch = useDispatch();
    const navigate = useNavigate();
    const { personal } = useSelector(state => state)
    const [spin, setSpin] = useState(0);
    const [hide, setHide] = useState(0);
    const image = domain + "image/" + personal.display;

    // Confirm log In status
    const [status] = useState(
        () =>
            JSON.parse(localStorage.getItem("status")) || {
                loggedIn: false,
                session: false,
            }
    );

    useEffect(() => {
        (async () => {
            // Populate personal
            const _data = await get("personal", store)

            if (personal.verified === false) {
                return Dispatch({ type: "personal", payload: _data });
            }

            // return
        })()
    })

    useEffect(() => {
        const company = document.querySelectorAll(".point li");

        // Add EventListener
        company.forEach((each) => {
            each.addEventListener("click", async () => {
                // Toggle Fetched
                Dispatch({ type: "toggle", payload: {} });

                // Spinner
                setSpin(1);

                try {
                    navigate("/app/laboratory", { replace: true });
                } catch (error) {
                    // Notify
                    Notification_B("Something Went Wrong, Please Try Again Later", false);
                }
            });
        });
    });

    const saveCompanyData = async (e) => {
        e.preventDefault();

        // Define Data
        const data = {};
        data["name"] = e.target[0].value;
        data["account"] = personal.account;
        data["type"] = e.target[1].value;
        data["phone"] = e.target[2].value;
        data["email"] = e.target[3].value;
        data["reg_no"] = e.target[4].value;
        data["address"] = e.target[5].value;
        data["state"] = e.target[6].value;
        data["country"] = e.target[7].value;

        // time
        const now = new Date(Date.now());
        data["time"] = `${hours[now.getHours()].split(":")[0]}:${now.getMinutes() < 10 ? "0" + now.getMinutes().toString() : now.getMinutes().toString()} ${hours[now.getHours()].split(":")[1]}`;
        data["date"] = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

        // Hide
        setHide(1);

        try {
            const response = await axios({
                method: e.target.method,
                url: domain + data.type.toLowerCase() + "/create",
                data: data,
            });

            // Update company
            const copy1 = personal
            copy1.company = response.data.company

            // Update
            set("personal", copy1, store);
            set("company", response.data.companyD, store)

            // Update State
            Dispatch({ type: "full_acct", payload: response.data });

            setTimeout(() => {
                e.target.parentNode.parentNode.childNodes[1].childNodes[0].click();
                document.getElementById(e.target.id).reset();
            }, 2000);
        } catch (error) {
            // Remove Hide
            setTimeout(() => {
                setHide(0);

                // Notify
                document.querySelector("div.modal").scrollTo(0, 0);
                Notification_A(error.response.data.error, false);
            }, 2000);
        }
    };

    const submitCompanyForm = (e) => {
        e.target.parentNode.parentNode.childNodes[0].childNodes[1][8].click();
    };

    const logout = (e) => {
        e.preventDefault();

        // Spinner
        setSpin(1);

        // Update Storage
        localStorage.removeItem("status");

        setTimeout(() => {
            // Navigate
            navigate("/login", { replace: true });
        }, 2000);
    };

    return status.loggedIn === true && status.session > Date.now() ? (
        personal.fetched === true ? (
            personal.verified === true ? (
                <Fragment>
                    {personal.company !== undefined && spin === 0 ? (
                        <div className="home w-100 h-100" style={{ backgroundColor: "#ffffff" }}>
                            <div className="bbs w-100">
                                <nav className="navbar navbar-expand-lg navbar-light">
                                    <div className="container-fluid px-2">
                                        <Link to="#" className="d-inline-flex text-decoration-none">
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
                                        <button className="navbar-toggler d-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="navbar-toggler-icon"></span>
                                        </button>
                                        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                                            <div className="dropdown-toggle" id="hmDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                                                <img src={image} alt="Profile_Picture" className="rounded-circle" width="40" height="40" />
                                            </div>
                                            <ul className="dropdown-menu" aria-labelledby="hmDropdown">
                                                <li>
                                                    <Link className="dropdown-item" to="#">
                                                        Contact Us
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/login" replace>
                                                        Logout
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="d-lg-none dropdown-toggle" id="mDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                                            <img src={image} alt="Profile_Picture" className="rounded-circle" width="40" height="40" />
                                        </div>
                                        <ul className="dropdown-menu" aria-labelledby="mDropdown">
                                            <li>
                                                <Link className="dropdown-item" to="#">
                                                    Contact Us
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/login" replace onClick={(e) => logout(e)}>
                                                    Logout
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                            <div className="clist m-auto mt-5 d-flex align-items-center justify-content-center rounded">
                                <div className="w-100">
                                    <div style={{ height: "calc(100vh - 190px)" }}>
                                        {Object.keys(personal.company).length > 0 ? (
                                            <ol className="list-group point">
                                                <li className="list-group-item rounded mb-1" data-cid={personal.company.cid} data-typ={personal.company.type}>
                                                    <div className="ms-0 me-auto">
                                                        <div className="fw-bold text-capitalize mb-1">{personal.company.name}</div>
                                                        <div className="d-flex justify-content-between" style={{ fontSize: "13px" }}>
                                                            <p className="mb-0" data-cid={personal.company.cid}>
                                                                Created: {personal.company.date}
                                                            </p>
                                                            <p className="mb-0">{personal.company.time}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ol>
                                        ) : (
                                            <div className="d-flex align-items-center justify-content-center h-100 w-100">
                                                <h6 style={{ color: "rgba(149, 170, 201, .8)" }}>Nothing Here Yet</h6>
                                            </div>
                                        )}
                                    </div>
                                    {/* <!-- Button trigger modal --> */}
                                    <button type="button" className="btn mt-2 w-100" data-bs-toggle="modal" data-bs-target="#homeDrop" style={{ backgroundColor: "#202A44", color: "#ffffff" }}>
                                        Add
                                    </button>

                                    {/* <!-- Modal --> */}
                                    <div className="modal fade" id="homeDrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="homeDropLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered modal-lg">
                                            <div className="modal-content">
                                                <div className="modal-body">
                                                    <div className="notify text-center mt-2"></div>
                                                    <form action="#" method="POST" className="resp pt-3 d-flex justify-content-between" id="formPr" onSubmit={(e) => saveCompanyData(e)}>
                                                        <div className="inn">
                                                            <div className="mb-3">
                                                                <label htmlFor="name" className="form-label">
                                                                    Name:
                                                                </label>
                                                                <input type="text" className="form-control form-control-sm" name="name" id="name" placeholder="Phantom Solutions" required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="type" className="form-label">
                                                                    Type:
                                                                </label>
                                                                <select className="form-select form-select-sm" name="account" defaultValue="laboratory" id="account">
                                                                    <option value="Laboratory">Laboratory</option>
                                                                </select>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="phone" className="form-label">
                                                                    Phone:
                                                                </label>
                                                                <input type="text" className="form-control form-control-sm" name="phone" id="phone" placeholder="+2340000000000" required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="email" className="form-label">
                                                                    Email:
                                                                </label>
                                                                <input type="email" className="form-control form-control-sm" name="email" id="email" placeholder="Someone@email.com" required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="reg_no" className="form-label">
                                                                    Registration Number:
                                                                </label>
                                                                <input type="text" className="form-control form-control-sm" name="reg_no" id="reg_no" placeholder="RS56-7483-929" required />
                                                            </div>
                                                        </div>
                                                        <div className="inn">
                                                            <div className="mb-3">
                                                                <label htmlFor="address" className="form-label">
                                                                    Address:
                                                                </label>
                                                                <textarea className="form-control" name="address" id="address" placeholder="Imo state Teaching Hospital, Orlu." rows="5" required />
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="state" className="form-label">
                                                                    State:
                                                                </label>
                                                                <select className="form-select form-select-sm" name="state" id="state" required>
                                                                    {states.map((key, index) => (
                                                                        <option key={index} value={key}>
                                                                            {key.split(" ")[0]}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="country" className="form-label">
                                                                    Country:
                                                                </label>
                                                                <select className="form-select form-select-sm" name="country" id="country" defaultValue="Nigeria" required>
                                                                    <option value="Nigeria">Nigeria</option>
                                                                </select>
                                                            </div>
                                                            <div className="mb-3 text-end">
                                                                <button type="submit" className="hide">
                                                                    Add
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">
                                                        Close
                                                    </button>
                                                    <button type="button" className="btn btn-primary btn-sm" style={{ display: `${hide === 0 ? "block" : "none"}` }} onClick={(e) => submitCompanyForm(e)}>
                                                        Submit
                                                    </button>
                                                    <button className="btn bg-primary btn-sm px-4" type="button" style={{ display: `${hide === 1 ? "block" : "none"}` }}>
                                                        <span className="spinner-border spinner-border-sm text-light mx-2" role="status" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Loading...</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Spinner />
                    )}
                </Fragment>
            ) : (
                <Navigate to="/account/verification" replace={true} />
            )
        ) : (
            <Spinner />
        )
    ) : (
        <Navigate to="/login" replace={true} />
    );
};

// Export
export default Home;
