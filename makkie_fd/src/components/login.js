import axios from "axios"
import { Fragment, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { domain } from "./helpers"
import { set } from "idb-keyval"
import { store } from "./main"
import { Spinner } from "./misc"

const Login = () => {
    const Dispatch = useDispatch()
    const Navigate = useNavigate()
    let hasCharacter = /\W/
    let hasDigit = /\d/

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [passwordShown, passwordToggle] = useState(false)
    const [display, setDisplay] = useState(true)

    const submitForm = async (e) => {
        e.preventDefault();
        let email = false
        let password = false

        if (data.email !== "" && data.email.length > 10 && data.email.includes("@")) {
            document.getElementById("email").classList.remove("is-invalid")
            document.getElementById("email").classList.add("is-valid")
            email = true
        } else {
            document.getElementById("email").classList.add("is-invalid")
        }

        if (data.password !== "" && data.password.length >= 8 && hasCharacter.test(data.password) && hasDigit.test(data.password)) {
            document.getElementById("pass").classList.remove("is-invalid")
            document.getElementById("pass").classList.add("is-valid")
            password = true
        } else {
            document.getElementById("pass").classList.add("is-invalid")
        }

        if (email && password) {
            // Hide
            setDisplay(false)

            try {
                const response = await axios({
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    url: domain + "account/login",
                    data: data
                });

                const result = response.data;

                // Update user
                await set("user", result, store)

                // Update State
                Dispatch({ type: "createUserData", payload: result })

                setTimeout(async () => {
                    // Check verification status
                    if (result.verified) {
                        const status = {
                            active: true,
                            session: Date.now()
                        }

                        // Update Store
                        await set("status", status, store)

                        // Update State
                        Dispatch({ type: "createStatus", payload: status })

                        // Notification
                        const notification = document.getElementById("notifB")
                        notification.firstChild.innerHTML = "SUCCESS"
                        notification.classList.add("showNotif")

                        setTimeout(() => {
                            // Show
                            setDisplay(true)

                            // Close Notification
                            notification.classList.remove("showNotif")

                            setTimeout(() => {
                                // Navigate
                                Navigate("/", { replace: true })
                            }, 2000);
                        }, 2000);
                    } else {
                        const status = {
                            active: false,
                            session: 0
                        }

                        // Update
                        await set("status", status, store)

                        // Navigate
                        Navigate("/account/verification", { replace: true })
                    }
                }, 2000);

            } catch (error) {
                // Show
                setDisplay(true)

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
        }
    };

    return (
        <Fragment>
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
                            <Link className="text-decoration-none" to="/">
                                <h3 className="logo_m my-auto text-center" >MARKIE</h3>
                            </Link>
                        </div>
                        <div className="d-none d-lg-block text-lg-end">
                            <div className="d-lg-flex ln_1">
                                <div className="my-auto">Not a member yet?</div>
                                <Link type="button" className="btn btn-lg btn-primary text-white ms-5 px-5 py-3" to="/account/create">Create Account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div>
                <div className="container lg_mid w_1200 m-auto d-lg-flex justify-content-between">
                    <div className="d-none d-lg-block mt-5">
                        <h3>We offer the best Medical Scrubs, Crocs, Sneakers, and Accessories.</h3>
                    </div>
                    <div className="px-2">
                        <div className="mb-4 w-75  mt-5">
                            <p>Enter your details below to Sign In</p>
                        </div>
                        <form action="#" method="post" className="needs-validation" onSubmit={e => submitForm(e)} noValidate>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label"> Email: </label>
                                <input type="email" className="form-control form-control-lg" id="email" name="email" value={data.email.toLowerCase()} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="someone@email.com" required />
                                <div className="invalid-feedback">{data.email === "" ? "Please enter a valid email" : (data.email.length < 10 ? "Please enter a valid email" : (!data.email.includes("@") ? "Please enter a valid email" : document.getElementById("email").classList.remove("is-invalid")))}</div>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="pass" className="form-label"> Password: </label>
                                <div className="input-group has-validation">
                                    <input type={passwordShown ? "text" : "password"} className="form-control form-control-lg" id="pass" name="password" placeholder="******************" onChange={(e) => setData({ ...data, password: e.target.value })} required />
                                    <span className="input-group-text" onClick={e => passwordToggle(!passwordShown)}>
                                        {!passwordShown ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                            </svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                            </svg>}
                                    </span>
                                    <div className="invalid-feedback">{
                                        data.password === "" ? "Please enter a valid password" : (data.password.length < 8 ? "Minimum of 8 characters" : (!hasCharacter.test(data.password) ? "Must contain a special character" : (!hasDigit.test(data.password) ? "Must contain digits" : (document.getElementById("pass").classList.remove("is-invalid")))))
                                    }</div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end mb-3">
                                <div className="my-auto">Forgot password?</div>
                                <button type="submit" className="btn btn-lg btn-primary text-white ms-4 px-5 px-lg-5 py-2 py-lg-3" style={{ display: display ? "block" : "none" }}>Sign In</button>
                                <button type="button" className="btn btn-lg btn-primary text-white ms-4 px-5 px-lg-5 py-2 py-lg-3" style={{ display: display ? "none" : "block" }}>
                                    {Spinner("#ffffff", "1.5rem", "50px")}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="d-lg-none text-center mt-5">
                        <div className="ln_1">
                            <div className="mb-3">Don't Have An Account?</div>
                            <Link type="button" className="btn btn-lg btn-primary w-100 text-white px-4 py-2" to="/account/create">Create Account</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="f-bottom align-bottom">
                <div className="w_1200 py-3">© 2022, Markie Stores. All Rights Reserved</div>
            </div>
        </Fragment>
    )
}

export default Login