// ========================================================================
//                             Users
// ========================================================================

// Import libraries
import axios from "axios";
import { set } from "idb-keyval";
import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { store } from "../../../Misc/cacheStorage";
import AddUser from "./components/addUser";
import ListUsers from "./components/listUsers";
import { Notification_A } from "../../../Misc/notification";
import LeftTop from "../../../left/components/l-top";
import LeftBottom from "../../../left/components/l-bottom";
import { domain } from "../../../Misc/helper";

// App
const Users = (props) => {
    // fetch Data From Storage
    const { personal, company } = useSelector((state) => state);
    const image = domain + "image/" + personal.display;
    const Dispatch = useDispatch();
    const navigate = useNavigate;
    const { setSpin } = props

    // Confirm log In status
    const [status] = useState(
        () =>
            JSON.parse(localStorage.getItem("status")) || {
                loggedIn: false,
                session: false,
            }
    );

    useEffect(() => {
        const session = setInterval(async () => {
            if (status.session - Date.now() > 0 && status.session - Date.now() < 1000 * 60 * 5) {
                const session = 1000 * 60 * 30
                localStorage.setItem("status", JSON.stringify({
                    loggedIn: true,
                    session: session,
                }))

                status.session = session
            }

            if (status.session < Date.now()) {
                navigate("/login", { replace: true });
            }

        }, 1000 * 60);

        return () => {
            clearInterval(session);
        };
    });

    // Save Selected Services
    const saveUsers = async (e) => {
        e.preventDefault();

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
        data["account_type"] = e.target[9].value;
        data["password"] = e.target[10].value;
        data["admin"] = personal.email;
        data["company"] = personal.company;

        //  Send
        try {
            const response = await axios({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                url: domain + "laboratory/users/create",
                data: data,
            });

            // Update Services
            await set("company", response.data, store);

            // Close
            e.target.parentNode.parentNode.childNodes[1].childNodes[0].click();

            // Update State
            Dispatch({ type: "company", payload: response.data });
        } catch (error) {
            // Notify
            Notification_A(error.response.data.error, false);
        }
    };

    // Click the submit button
    const submitForm = (e) => {
        e.target.parentNode.parentNode.childNodes[0].childNodes[1][11].click();
    };

    return status.loggedIn === true && status.session > Date.now() ? (
        <Fragment>
            <div className="users">
                <header className="d-lg-none">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid desktop_hdr">
                            <Link to="#" className="d-inline-flex text-decoration-none d-lg-none">
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
                            <div className="searchBar d-none d-lg-block" style={{ width: "35%" }}>
                                <form action="" method="post">
                                    <div className="dir input-group flex-nowrap">
                                        <button type="submit" style={{ paddingBottom: "3px" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#5e5e5e" className="bi bi-search-heart" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Zm0-7.518c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z" />
                                            </svg>
                                        </button>
                                        <input type="search" name="search" id="search" placeholder="Search ....." style={{ width: "100%", padding: ".3rem .6rem" }} />
                                    </div>
                                </form>
                            </div>
                            <div className="d-lg-none" style={{ marginRight: "2.2rem" }}>
                                <img src={image} alt="Profile_Picture" className="rounded-circle" width="40" height="40" />
                            </div>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                                <div className="d-lg-none">
                                    <LeftTop />
                                    <LeftBottom tag="mob" setSpin={setSpin} />
                                </div>
                                <div className="d-none d-lg-flex">
                                    <div style={{ margin: ".6rem 1.3rem 0 0" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#5e5e5e" className="bi bi-bell" viewBox="0 0 16 16">
                                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                                        </svg>
                                    </div>
                                    <div className="d-flex">
                                        <div style={{ margin: "0 .6rem 0 0" }}>
                                            <img src={image} alt="Profile_Picture" className="rounded-circle" width="40" height="40" />
                                        </div>
                                        <div className="text-start" style={{ paddingTop: ".2rem" }}>
                                            <p className="text-capitalize" style={{ fontSize: ".8rem", margin: "0" }}>
                                                {personal["lastname"]} {personal["other"]}
                                            </p>
                                            <p className="text-capitalize" style={{ fontSize: ".8rem", margin: "0" }}>
                                                {personal["account"].replaceAll("_", " ")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>

                {/* <nav> */}
                <div className="text-end rg_f py-2">
                    <div className="text-end">
                        {/* Button trigger modal */}
                        <button type="button" className="btn btn-outline-primary btn-sm px-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Add User
                        </button>
                    </div>
                </div>
                <div className="tab-content" id="nav-tabContent">
                    <ListUsers data={company.users} />

                    {/* Modal */}
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="notify text-center mt-2"></div>
                                    <AddUser saveUsers={saveUsers} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">
                                        Close
                                    </button>
                                    <button type="button" className="btn btn-primary btn-sm" onClick={(e) => submitForm(e)}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    ) : (
        <Navigate to="/login" replace={true} />
    );
};

export default Users;
