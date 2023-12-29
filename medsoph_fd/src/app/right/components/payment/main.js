// ========================================================================
//                             Payment
// ========================================================================

// Import libraries
import React, { useState, Fragment, useEffect } from "react";
import bg from "../../../../assets/images/Medical-Lab-Water-Filtration-Systems-5db98228a4df4-1200x381.jpg";
import visa from "../../../../assets/images/visa-svgrepo-com.svg";
import mastercard from "../../../../assets/images/mastercard-svgrepo-com.svg";
import LeftTop from "../../../left/components/l-top";
import LeftBottom from "../../../left/components/l-bottom";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { domain } from "../../../Misc/helper";

// App
const Payment = (props) => {
    const { personal } = useSelector((state) => state);
    const image = domain + "image/" + personal.display;
    const { setSpin } = props;
    const navigate = useNavigate;

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

    return (
        <Fragment>
            {status.loggedIn === true && status.session > Date.now() ? (
                <div className="payment">
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

                    <div className="" id="pyl" style={{ backgroundImage: `url(${bg})` }}></div>
                    <div className="pt-4">
                        <div id="py_1">
                            <div className="mb-4 pb-4">
                                <div className="d-flex justify-content-between p-2">
                                    <div>
                                        <strong>Trial Period</strong>
                                        <p>3 months</p>
                                    </div>
                                    <div>
                                        <h4>
                                            N10,000 <br /> <span style={{ fontSize: ".8rem" }}>/month</span>
                                        </h4>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <div className="d-flex justify-content-between pb-2">
                                        <p className="mb-0">90 days</p>
                                        <p className="mb-0">12 days remaining</p>
                                    </div>
                                    <div className="progress mb-3">
                                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "75%" }}></div>
                                    </div>
                                </div>
                                <div className="border-top mx-2 text-end">
                                    <button className="btn btn-sm btn-outline-secondary mt-3">Change plan</button>
                                </div>
                            </div>
                            <div className="pb-4">
                                <div className="px-2 pt-2">
                                    <p>Recent Cards</p>
                                </div>
                                <ul className="list-group px-2">
                                    <li className="list-group-item d-lg-flex justify-content-between mb-2">
                                        <div className="d-flex">
                                            <img src={visa} alt="" />
                                            <div>
                                                <p className="mb-0 my-2 ms-4">XXXX-XXXX-XXXX-4219</p>
                                                <p className="mb-0 my-1 ms-4" style={{ color: "rgba(107, 123, 147, .5)" }}>
                                                    Expiry date: 05/25
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            <button className="btn btn-sm btn-outline-danger">Change</button>
                                            <button className="btn btn-sm btn-outline-danger">Remove</button>
                                        </div>
                                    </li>
                                    <li className="list-group-item d-lg-flex justify-content-between mb-2">
                                        <div className="d-flex">
                                            <img src={mastercard} alt="" />
                                            <div>
                                                <p className="mb-0 my-2 ms-4">XXXX-XXXX-XXXX-4219</p>
                                                <p className="mb-0 my-1 ms-4" style={{ color: "rgba(107, 123, 147, .5)" }}>
                                                    Expiry date: 05/25
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            <button className="btn btn-sm btn-outline-danger">Change</button>
                                            <button className="btn btn-sm btn-outline-danger">Remove</button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="pb-4 d-none">
                                <div className="px-2 pt-2">
                                    <p>Payment History:</p>
                                </div>
                                <div className="px-2 table-responsive">
                                    <table className="table table-bordered" style={{ marginBottom: "0" }}>
                                        {/* <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Receipt</th>
                                            <th scope="col">Subscription</th>
                                            <th scope="col">Expires</th>
                                            <th scope="col">Renewal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>12/3/2019</td>
                                            <td>PD-1234567</td>
                                            <td>6-Months</td>
                                            <td>12/4/2019</td>
                                            <td>12/4/2019</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>12/4/2019</td>
                                            <td>PD-1234567</td>
                                            <td>6-Months</td>
                                            <td>12/5/2019</td>
                                            <td>12/5/2019</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>12/5/2019</td>
                                            <td>PD-1234567</td>
                                            <td>6-Months</td>
                                            <td>12/6/2019</td>
                                            <td>12/6/2019</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td>12/6/2019</td>
                                            <td>PD-1234567</td>
                                            <td>6-Months</td>
                                            <td>12/7/2019</td>
                                            <td>12/7/2019</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td>12/7/2019</td>
                                            <td>PD-1234567</td>
                                            <td>6-Months</td>
                                            <td>12/8/2019</td>
                                            <td>12/8/2019</td>
                                        </tr>
                                    </tbody> */}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Navigate to="/login" replace={true} />
            )}
        </Fragment>
    );
};

export default Payment;
