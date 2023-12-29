// Import Dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Misc/spinner";
import { useNavigate } from "react-router-dom";
import { Notification_A } from "../Misc/notification";
import { domain } from "../Misc/helper";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../Misc/cacheStorage";
import { set } from "idb-keyval";

// Component
const Verify = () => {
    const [spin, setSpin] = useState(0);
    const [hide, setHide] = useState(0);
    const { personal } = useSelector(state => state)
    const navigate = useNavigate();
    const Dispatch = useDispatch();

    useEffect(() => {
        if (personal === null || Object.keys(personal).length === 0) {
            navigate("/login", { replace: true });
        }
    })

    // Submit Form
    const submitForm = async (e) => {
        e.preventDefault();

        const code = e.target[0].value;
        const email = personal.email;

        // hide
        setHide(2);

        try {
            await axios({
                method: e.target.method,
                url: domain + "account/verification",
                data: {
                    code: code.toString(),
                    email: email,
                },
            });

            setTimeout(() => {
                // Spinner
                setSpin(1);

                // Update verification
                const copy1 = personal
                copy1.verified = true

                // Update
                set("personal", copy1, store);

                // Update State
                Dispatch({ type: "verified", payload: {} });

                setTimeout(() => {

                    const status = JSON.parse(localStorage.getItem("status"))

                    if (status.loggedIn === true) {
                        // Navigate
                        if (personal.account === "admin") {
                            navigate("/app", { replace: true });
                        } else {
                            navigate("/app/laboratory", { replace: true });
                        }
                    } else {
                        navigate("/login", { replace: true });
                    }
                }, 2000);
            }, 2000);
        } catch (error) {
            // hide
            setHide(0);

            // Notify
            Notification_A(error.response.data.error, false);
        }
    };

    // Submit Form
    const resendCode = async (e) => {
        const email = JSON.parse(localStorage.getItem("pending")).email;

        // hide
        setHide(1);

        try {
            await axios({
                method: "POST",
                url: domain + "account/verification/resend_code",
                data: {
                    email: email,
                },
            });

            // Notify
            Notification_A("Verification Code Sent", true);

            // hide
            setHide(0);
        } catch (error) {
            // hide
            setHide(0);

            // Notify
            Notification_A(error.response.data.error, false);
        }
    };

    return spin === 0 ? (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
            <div className="verify p-4">
                <div className="notify text-center mb-2"></div>
                <form action="#" method="POST" onSubmit={(e) => submitForm(e)}>
                    <div className="mb-3">
                        <label htmlFor="verification" className="form-label mb-3">
                            Enter verification code sent to your email address.
                        </label>
                        <input type="text" className="form-control form-control-sm" id="verification" required />
                    </div>

                    <div className="text-end pt-2">
                        <button type="button" className="btn btn-sm btn-primary me-3 px-3" onClick={(e) => resendCode(e)} style={{ display: `${hide === 1 ? "none" : ""}` }}>
                            Resend Code
                        </button>
                        <button className="btn bg-primary btn-sm px-4 me-3" type="button" style={{ display: `${hide === 1 || hide === 2 ? "" : "none"}` }}>
                            <span className="spinner-border spinner-border-sm text-light mx-2" role="status" aria-hidden="true"></span>
                            <span className="visually-hidden">Loading...</span>
                        </button>
                        <button type="submit" className="btn btn-sm btn-primary px-4" style={{ display: `${hide === 2 ? "none" : ""}` }}>
                            Verify
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : (
        <Spinner />
    );
};

export default Verify;
