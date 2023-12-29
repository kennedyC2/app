// ========================================================================
//                             Database
// ========================================================================

// Import libraries
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RenderResults from "./components/renderResult_1";
import { RF_days, months, CalenderYear, date, month, year } from "../../../Misc/helper";
import { Link, Navigate, useNavigate } from "react-router-dom";
import bg from "../../../../assets/images/Medical-Lab-Water-Filtration-Systems-5db98228a4df4-1200x381.jpg";
import { domain } from "../../../Misc/helper";
import LeftTop from "../../../left/components/l-top";
import LeftBottom from "../../../left/components/l-bottom";

// App
const Database = (props) => {
    const { personal, company } = useSelector((state) => state);
    const navigate = useNavigate;
    const image = domain + "image/" + personal.display;
    const { setSpin } = props;

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

    const [sortData, setSortData] = useState({
        day: date,
        month: month,
        year: year,
    });

    const fetchData = () => {
        if (parseInt(sortData.year) === parseInt(year)) {
            return company.tests.settled[`${sortData["month"]} ${sortData["day"]}`] || [];
        } else {
            const empty = [];
            return empty;
        }
    };

    const xxx = fetchData();

    return status.loggedIn === true && status.session > Date.now() ? (
        <Fragment>
            <div className="settled" style={{ height: "auto" }}>
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

                {Object.keys(company.tests.settled).length > 0 ? (
                    <Fragment>
                        <div className="l1 rg_f d-flex justify-content-between py-2">
                            <div className="py-1 px-2 d-none d-md-block">Completed Tests: {company.storage.completed}</div>
                            <div className="d-md-flex">
                                <div className="py-1 px-3" style={{ fontSize: ".88rem" }}>
                                    Sort By Date:
                                </div>
                                <form action="#" method="get">
                                    <div className="input-group">
                                        <select className="form-select form-select-sm me-1" name="day" aria-label="Default select" defaultValue={sortData["day"]} onChange={(e) => setSortData({ ...sortData, [e.target.name]: e.target.value })} required>
                                            {RF_days.map((key, index) => (
                                                <option key={index} value={key}>
                                                    {key}
                                                </option>
                                            ))}
                                        </select>
                                        <select className="form-select form-select-sm me-1" name="month" aria-label="Default select" defaultValue={sortData["month"]} style={{ width: "90px" }} onChange={(e) => setSortData({ ...sortData, [e.target.name]: e.target.value })} required>
                                            {months.map((key, index) => (
                                                <option key={index} value={key}>
                                                    {key}
                                                </option>
                                            ))}
                                        </select>
                                        <select className="form-select form-select-sm" name="year" aria-label="Default select" defaultValue={sortData["year"]} onChange={(e) => setSortData({ ...sortData, [e.target.name]: e.target.value })} required>
                                            {CalenderYear().map((key, index) => (
                                                <option key={index} value={key}>
                                                    {key}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="tab-pane s_sel fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            {Object.keys(xxx).length > 0 ? (
                                <div className="d-flex s_sed align-items-start justify-content-between mt-3">
                                    {/* tab 1 */}
                                    <div className="rg_f py-4">
                                        <div style={{ width: "100%", overflowY: "auto", height: "96%" }}>
                                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                {fetchData().map((key, index) => (
                                                    <div key={index} className={`nav-link  btn-sm ${index === 0 ? "active" : ""} d-flex justify-content-between`} id={`v-pills-${"res" + index}${index + 5}-tab`} data-bs-toggle="tab" data-bs-target={`#v-pills-${"res" + index}${index + 5}`} type="button" role="tab" aria-controls={`v-pills-${"res" + index}${index + 5}`} aria-selected="true" style={{ width: "98%" }}>
                                                        <svg className="d-none d-xl-block" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M6.5 20q-2.275 0-3.887-1.575Q1 16.85 1 14.575q0-1.95 1.175-3.475Q3.35 9.575 5.25 9.15q.625-2.3 2.5-3.725Q9.625 4 12 4q2.925 0 4.962 2.037Q19 8.075 19 11q1.725.2 2.863 1.487Q23 13.775 23 15.5q0 1.875-1.312 3.188Q20.375 20 18.5 20Zm3.85-3L16 11.35L14.55 9.9l-4.225 4.225l-2.1-2.1L6.8 13.45Z" />
                                                        </svg>
                                                        <div className="d-flex justify-content-between ps-2" style={{ width: "505px", fontSize: "15px", marginTop: "2px" }}>
                                                            <p style={{ marginBottom: 0 }}>{key} </p>
                                                            <p className="d-none d-lg-flex" style={{ marginBottom: 0 }}>
                                                                {xxx[key]["date"]} | {xxx[key]["time"]}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {/* tab 2 */}
                                    <div className="rg_f py-4">
                                        <div className="tab-content p-2" id="v-pills-tabContent" style={{ width: "100%", height: "96%", overflowY: "auto" }}>
                                            {Object.keys(xxx).map((item, index) => (
                                                <div key={index} className={`tab-pane fade show ${index === 0 ? "active" : ""}`} id={`v-pills-${"res" + index}${index + 5}`} role="tabpanel" aria-labelledby={`v-pills-${"res" + index}${index + 5}-tab`}>
                                                    <div key={index} className="mb-3" style={{ fontSize: "13.5px", textTransform: "Capitalize" }}>
                                                        <h6 className="text-decoration-underline text-center mb-4">Test Details:</h6>
                                                        <p>
                                                            Name: &nbsp; {xxx[item]["firstname"]}&nbsp;{xxx[item]["lastname"]}&nbsp;{xxx[item]["other"]}
                                                        </p>
                                                        <p>
                                                            Age: &nbsp; <span style={{ textTransform: "lowercase" }}>{xxx[item]["age"]}</span>
                                                        </p>
                                                        <p>
                                                            Sex: &nbsp; <span>{xxx[item]["sex"]}</span>
                                                        </p>
                                                        <p>
                                                            Religion: &nbsp; <span>{xxx[item]["religion"]}</span>
                                                        </p>
                                                        <p>Tribe: &nbsp; {xxx[item]["tribe"]}</p>
                                                        <p>
                                                            Provisional Diagnosis: &nbsp; <span>{xxx[item]["diagnosis"]}</span>
                                                        </p>
                                                        <p>
                                                            Date: &nbsp; <span>{xxx[item]["date"]}</span>
                                                        </p>
                                                        <p>
                                                            Time: &nbsp; <span className="text-lowercase">{xxx[item]["time"]}</span>
                                                        </p>
                                                        <div>
                                                            <p style={{ marginBottom: ".55rem" }}>Specimen Collected:</p>
                                                            <ol className="list-group list-group-numbered" style={{ width: "90%", fontSize: "13px" }}>
                                                                {xxx[item]["specimen"].map((key, index) => (
                                                                    <li key={index} className="list-group-item mb-1 rounded">
                                                                        &nbsp; {key}
                                                                    </li>
                                                                ))}
                                                            </ol>
                                                        </div>
                                                        <br></br>
                                                        <div>
                                                            <p style={{ marginBottom: ".55rem" }}>Test Required:</p>
                                                            <ol className="list-group mb-3 list-group-numbered" style={{ width: "90%", fontSize: "13px" }}>
                                                                {xxx[item]["selectedTest"].map((key, index) => (
                                                                    <li key={index} className="list-group-item mb-1 rounded">
                                                                        &nbsp; {key.split(":")[2].replaceAll("_", " ")}
                                                                    </li>
                                                                ))}
                                                            </ol>
                                                        </div>
                                                        <RenderResults result={xxx[item]["result"]} />
                                                        <div className="mt-3" style={{ width: "90%" }}>
                                                            <p className="d-flex justify-content-end">
                                                                Total: &nbsp; <span className="ms-1 text-lowercase">₦{new Intl.NumberFormat("en-US", {}).format(xxx[item]["total"])}</span>
                                                            </p>
                                                            <p className="d-flex justify-content-end">
                                                                Paid: &nbsp; <span className="ms-1 text-lowercase">₦{new Intl.NumberFormat("en-US", {}).format(xxx[item]["paid"])}</span>
                                                            </p>
                                                            <p className="d-flex justify-content-end">
                                                                Debt: &nbsp; <span className="ms-1 text-lowercase">₦{new Intl.NumberFormat("en-US", {}).format(xxx[item]["balance"])}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="rg_f mt-3 d-flex align-items-center justify-content-center" style={{ height: "calc(623px - 68px)" }}>
                                    <div style={{ textAlign: "center", width: "50%", margin: "auto", fontSize: "18px", color: "rgba(149, 170, 201, .8)" }}>
                                        <p className="mb-1">-no data-</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Fragment>
                ) : (
                    <div className="bttm">
                        <div id="pyl" style={{ backgroundImage: `url(${bg})` }}></div>
                        <div className="mt-4">
                            <div className="rg_f py-4 d-flex align-items-center justify-content-center">
                                <div style={{ textAlign: "left", width: "70%", margin: "auto", fontSize: "17px", color: "rgba(149, 170, 201, .8)" }}>
                                    <p className="mb-1">Nothing Here Yet !!!</p>
                                    <p>Booked Tests and Unsettled Tests Will Appear Here.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    ) : (
        <Navigate to="/login" replace={true} />
    );
};

export default Database;
