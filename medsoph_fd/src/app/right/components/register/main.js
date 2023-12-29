// ========================================================================
//                             Register
// ========================================================================

// Import libraries
import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormTop from "./components/top";
import FormBottom from "./components/bottom";
import { year, months, monthNum, date, month, hours, domain } from "../../../Misc/helper";
import bg from "../../../../assets/images/Medical-Lab-Water-Filtration-Systems-5db98228a4df4-1200x381.jpg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { set } from "idb-keyval";
import { store } from "../../../Misc/cacheStorage";
import { Notification_B } from "../../../Misc/notification";
import LeftTop from "../../../left/components/l-top";
import LeftBottom from "../../../left/components/l-bottom";

// App
const Register = (props) => {
    const Dispatch = useDispatch();
    const navigate = useNavigate;
    const { personal, company } = useSelector((state) => state);
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

    const pid = () => {
        let data = ""
        if (parseInt(company.pid) < 1000) {
            data = "00" + (company.pid + 1).toString()
        } else {
            data = (company.pid + 1).toString()
        }

        return data
    }

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

    const [formData, updateFormData] = useState({
        firstname: "",
        lastname: "",
        other: "",
        day: date.toString(),
        month: month.toString(),
        year: year.toString(),
        date: "",
        time: "",
        age: "",
        sex: "male",
        religion: "christian (catholic)",
        tribe: "igbo",
        phone: "",
        email: "",
        diagnosis: "",
        specimen: [],
        selectedTest: [],
        account: personal.account,
        result: {},
        total: 0,
        paid: 0,
        id: "",
    });

    useEffect(() => {
        const _id = "PHDN-" + pid()
        updateFormData({ ...formData, id: _id });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSpecimen = (e) => {
        if (e.target.checked) {
            if (!formData.specimen.includes(e.target.value)) {
                updateFormData({ ...formData, specimen: [...formData.specimen, e.target.value] });
            }
        } else {
            if (formData.specimen.includes(e.target.value)) {
                updateFormData({
                    ...formData,
                    specimen: [
                        ...formData.specimen.filter((word) => {
                            return word !== e.target.value;
                        }),
                    ],
                });
            }
        }
    };

    const handleSelectedTest = (e) => {
        if (e.target.checked) {
            if (!formData.selectedTest.includes(e.target.value)) {
                updateFormData({ ...formData, selectedTest: [...formData.selectedTest, e.target.value], total: (formData.total += parseInt(e.target.value.split(":").pop())) });
            }
        } else {
            if (formData.selectedTest.includes(e.target.value)) {
                updateFormData({
                    ...formData,
                    selectedTest: [
                        ...formData.selectedTest.filter((word) => {
                            return word !== e.target.value;
                        }),
                    ],
                    total: (formData.total -= parseInt(e.target.value.split(":").pop())),
                });
            }
        }
        document.getElementById("total").innerHTML = `${formData.total > 0 ? "₦" : ""}${formData.total > 0 ? new Intl.NumberFormat("en-US", {}).format(formData.total) : "0.00"}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = document.getElementById(e.target.id);
        const data = formData;

        if (parseInt(formData["year"]) === parseInt(year)) {
            const age = monthNum - months.indexOf(formData["month"]) + 1;
            data.age = age < 2 ? age + " month" : age + " months";
        }

        if (parseInt(formData["year"]) < parseInt(year)) {
            const diff = parseInt(year) - parseInt(formData["year"]);
            if (diff === 1) {
                const prev = 12 - months.indexOf(formData["month"]);
                const next = monthNum + 1;
                data.age = prev + next < 2 ? prev + next + " month" : prev + next + " months";
            } else {
                var age = 0;
                for (var i = 1; i < diff + 1; i++) {
                    if (i === 1) {
                        age += 12 - months.indexOf(formData["month"]);
                    }

                    if (i === diff + 1) {
                        age += monthNum + 1;
                    }

                    age += 12;
                }
                data.age = Math.floor(age / 12) < 2 ? Math.floor(age / 12) + " year" : Math.floor(age / 12) + " years";
            }
        }

        // time
        const now = new Date(Date.now());
        data["time"] = `${hours[now.getHours()].split(":")[0]}:${now.getMinutes() < 10 ? "0" + now.getMinutes().toString() : now.getMinutes().toString()} ${hours[now.getHours()].split(":")[1]}`;
        data["date"] = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

        // Source Account
        data["source"] = `${personal.lastname} ${personal.firstname}`;

        // Get position
        if (personal.account !== "administrator") {
            data["position"] = company.users.filter((item, index) => {
                return item.email === personal.email ? index : ""
            })[0]
        }

        //  Send
        try {
            const response = await axios({
                method: "POST",
                url: domain + "laboratory/tests/booking",
                data: {
                    ...data,
                    type: personal.company.type,
                    companyID: company.cid,
                    email: personal.email
                },
            });

            const result = response.data;

            window.scrollTo(0, 0);

            // Sort Pending Data
            const _data = {}

            // Loop
            response.data.pending.forEach((prop, index) => {
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
            response.data.pending = _data

            // Update Services
            await set("company", response.data, store);

            // Update State
            Dispatch({ type: "company", payload: response.data });

            setTimeout(() => {
                // Notify
                Notification_B(response.data.message, true);
            }, 500);
        } catch (error) {
            // Notify
            Notification_B(error.response.data.message, false);
        }

        // form.reset();
    };

    return status.loggedIn === true && status.session > Date.now() ? (
        <Fragment>
            <div className="register" style={{ height: "auto" }}>
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

                <div id="pyl" style={{ backgroundImage: `url(${bg})` }}></div>
                <div className="mt-4">
                    <div>
                        <form action="#" method="post" id="register" onSubmit={handleSubmit}>
                            <FormTop data={formData} setData={updateFormData} specimenHandler={handleSpecimen} />
                            <FormBottom data={formData} testData={company.services} setData={updateFormData} selectedTestHandler={handleSelectedTest} />
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    ) : (
        <Navigate to="/login" replace={true} />
    );
};

export default Register;
