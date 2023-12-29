import { set } from "idb-keyval";
import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { store } from "./main";
import { domain } from "./helpers";
import axios from "axios";

const Verify = ({ CreateUserData }) => {
    const Dispatch = useDispatch()
    const Navigate = useNavigate()
    const { user } = useSelector(state => state)

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            await axios({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                url: domain + "/account/verify",
                data: {
                    code: e.target[0].value,
                    id: user._id
                },
            });

            // Update Store
            user.verified = true
            await set("user", user, store)

            // Update State
            Dispatch({ type: "verify", payload: !user.verified })

            // Notification
            const notification = document.getElementById("notifB")
            notification.firstChild.innerHTML = "SUCCESS"
            notification.classList.add("showNotif")

            setTimeout(() => {
                // Close Notification
                notification.classList.remove("showNotif")

                setTimeout(() => {
                    // Navigate
                    Navigate("/account/login", { replace: true })
                }, 2000);
            }, 2000);

        } catch (error) {
            // Continue
            const { data } = error.response

            // Notification
            const notification = document.getElementById("notifA")
            notification.firstChild.innerHTML = data.message
            notification.classList.add("showNotif")

            setTimeout(() => {
                // Close Notification
                notification.classList.remove("showNotif")
            }, 2000);
        }
    };

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            CreateUserData(Dispatch, store)
        }

        return
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Fragment>
            <div className="verify">
                <header>
                    <div className="container w_1200 m-auto">
                        <div className="ht_wrapper d-flex justify-content-between pt-4 pb-3">
                            {/* LOGO Container  */}
                            <div className="logo position-relative d-none d-lg-block">
                                <Link to="/">
                                    <h4 className="position-absolute m-0 bottom-0">MARKIE</h4>
                                </Link>
                            </div>
                            <div className="my-auto d-lg-none pt-4">
                                <a className="text-decoration-none" href="./index.html">
                                    <h3 className="my-auto text-center">MARKIE</h3>
                                </a>
                            </div>
                            <div className="d-none d-lg-block text-lg-end">
                                <div className="d-lg-flex ln_1">
                                    <div className="my-auto">""</div>
                                    <button type="button" className="btn btn-lg btn-primary text-white ms-5 px-5 py-3">""</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div>
                    <div className="container lg_mid m-auto d-lg-flex justify-content-between">
                        <div className="px-2 w-100">
                            <h2 className="text-center text-capitalize" style={{ fontSize: "30px !important" }}>2FA</h2>
                            <div className="mb-2 mx-auto text-center" style={{ width: "85%" }}>
                                <p>We just sent you an email with an authentication code. Enter the code to verify your identity.</p>
                            </div>
                            <form action="#" method="post" className="needs-validation mx-auto" style={{ width: "85%" }} onSubmit={e => submitForm(e)} noValidate>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label"> Verification Code: </label>
                                    <input type="email" className="form-control form-control-lg text-center" id="code" name="email" required />
                                    <div className="invalid-feedback">Invalid Verification Code.</div>
                                </div>
                                <div className="d-flex justify-content-between py-3">
                                    <div className="my-auto">Resend Code?</div>
                                    <button type="submit" className="btn btn-lg btn-primary text-white ms-4 px-5 px-lg-5 py-2 py-lg-2">Verify</button>
                                </div>
                            </form>
                        </div>
                        <div className="d-lg-none text-center mt-4">
                            <div className="ln_1">
                                <div className="mb-3">Don't Have An Account?</div>
                                <button type="button" className="btn btn-lg btn-primary w-100 text-white px-4 py-2">Create Account</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="f-bottom align-bottom">
                    <div className="w_1200 py-3">© 2022, Markie Stores. All Rights Reserved</div>
                </div>
            </div>
        </Fragment>
    )
}

export default Verify