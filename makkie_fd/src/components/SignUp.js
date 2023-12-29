import { Fragment, useEffect, useState } from "react"
import { domain } from "./helpers";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { set } from "idb-keyval";
import { store } from "./main";
import { Spinner } from "./misc";

const SignUp = ({ FetchAppData }) => {
    const Dispatch = useDispatch()
    const Navigate = useNavigate()
    const { appData } = useSelector(state => state)
    let hasCharacter = /\W/
    let hasDigit = /\d/

    const [_data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        delivery: "imo"
    });

    const [display, setDisplay] = useState(true)

    const [passwordShown, passwordToggle] = useState(false)

    const submitForm = async (e) => {
        e.preventDefault();
        let firstname = false
        let lastname = false
        let email = false
        let password = false
        let delivery = false

        if (_data.firstname !== "" && _data.firstname.length >= 3) {
            document.getElementById("firstname").classList.remove("is-invalid")
            document.getElementById("firstname").classList.add("is-valid")
            firstname = true
        } else {
            document.getElementById("firstname").classList.add("is-invalid")
        }

        if (_data.lastname !== "" && _data.lastname.length >= 3) {
            document.getElementById("lastname").classList.remove("is-invalid")
            document.getElementById("lastname").classList.add("is-valid")
            lastname = true
        } else {
            document.getElementById("lastname").classList.add("is-invalid")
        }

        if (_data.email !== "" && _data.email.length > 10 && _data.email.includes("@")) {
            document.getElementById("email").classList.remove("is-invalid")
            document.getElementById("email").classList.add("is-valid")
            email = true
        } else {
            document.getElementById("email").classList.add("is-invalid")
        }

        if (_data.password !== "" && _data.password.length >= 8 && hasCharacter.test(_data.password) && hasDigit.test(_data.password)) {
            document.getElementById("pass").classList.remove("is-invalid")
            document.getElementById("pass").classList.add("is-valid")
            password = true
        } else {
            document.getElementById("pass").classList.add("is-invalid")
        }

        if (_data.delivery !== "") {
            document.getElementById("delivery").classList.remove("is-invalid")
            document.getElementById("delivery").classList.add("is-valid")
            delivery = true
        } else {
            document.getElementById("delivery").classList.add("is-invalid")
        }

        if (firstname && lastname && email && password && delivery) {
            // Hide
            setDisplay(false)

            // Continue
            try {
                const response = await axios({
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    url: domain + "account/create",
                    data: _data,
                });

                const { data } = response;

                // Update user
                await set("user", data, store)

                // Update State
                Dispatch({ type: "createUserData", payload: data })

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
                        Navigate("/account/verification", { replace: true })
                    }, 2000);
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

    useEffect(() => {
        if (Object.keys(appData).length === 0) {
            FetchAppData(Dispatch)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Fragment>
            <header>
                <div className="container w_1200 m-auto">
                    <div className="ht_wrapper d-lg-flex justify-content-between pt-4 pb-3">
                        {/* LOGO Container */}
                        <div className="logo position-relative d-none d-lg-block">
                            <Link to="/">
                                <h4 className="position-absolute m-0 bottom-0">MARKIE</h4>
                            </Link>
                        </div>
                        <div className="my-auto d-lg-none pt-4">
                            <Link className="text-decoration-none" to="./index.html">
                                <h3 className="logo_m my-auto text-center">MARKIE</h3>
                            </Link>
                        </div>
                        <div className="d-none d-lg-block text-lg-end">
                            <div className="d-lg-flex ln_1">
                                <div className="my-auto">Already Have An Account?</div>
                                <Link className="btn btn-lg btn-primary text-white ms-5 px-5 py-3" to="/account/login">Sign In</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div>
                <div className="container sg_mid w_1200 m-auto d-lg-flex justify-content-between">
                    <div className="d-none d-lg-block mt-5">
                        <h3>We offer the best Medical Scrubs, Crocs, Sneakers, and Accessories.</h3>
                    </div>
                    <div className="px-2">
                        <form action="#" method="post" className="needs-validation" onSubmit={e => submitForm(e)} noValidate>
                            <div className="d-lg-flex justify-content-between">
                                <div className="mb-4">
                                    <label htmlFor="firstname" className="form-label">Firstname: </label>
                                    <input type="text" className="form-control form-control-lg" id="firstname" name="firstname" placeholder="John" onChange={(e) => setData({ ..._data, firstname: e.target.value })} value={_data.firstname} required />
                                    <div className="invalid-feedback">{_data.firstname === "" ? "Please enter a valid name" : (_data.firstname.length < 3 ? "3 or more characters" : document.getElementById("firstname").classList.remove("is-invalid"))}</div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="lastname" className="form-label">Lastname: </label>
                                    <input type="text" className="form-control form-control-lg" id="lastname" name="lastname" placeholder="Doe" value={_data.lastname} onChange={(e) => setData({ ..._data, lastname: e.target.value })} required />
                                    <div className="invalid-feedback">{_data.lastname === "" ? "Please enter a valid name" : (_data.lastname.length < 3 ? "3 or more characters" : document.getElementById("lastname").classList.remove("is-invalid"))}</div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label"> Email: </label>
                                <input type="email" className="form-control form-control-lg" id="email" name="email" placeholder="someone@email.com" value={_data.email.toLowerCase()} onChange={(e) => setData({ ..._data, email: e.target.value })} required />
                                <div className="invalid-feedback">{_data.email === "" ? "Please enter a valid email" : (_data.email.length < 10 ? "Please enter a valid email" : (!_data.email.includes("@") ? "Please enter a valid email" : document.getElementById("email").classList.remove("is-invalid")))}</div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="form-label"> Phone: </label>
                                <input type="number" className="form-control form-control-lg" id="phone" name="phone" placeholder="0814-094-8648" value={_data.phone} onChange={(e) => setData({ ..._data, phone: e.target.value })} required />
                                <div className="invalid-feedback">{_data.phone === "" ? "Please enter a valid phone number" : (_data.email.length < 11 ? "Please enter a valid phone number" : document.getElementById("email").classList.remove("is-invalid"))}</div>
                            </div>
                            <div className="d-lg-flex justify-content-between">
                                <div className="mb-4 me">
                                    <label htmlFor="pass" className="form-label"> Password: </label>
                                    <div className="input-group has-validation">
                                        <input type={passwordShown ? "text" : "password"} className="form-control form-control-lg" id="pass" name="password" placeholder="******************" onChange={(e) => setData({ ..._data, password: e.target.value })} required />
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
                                            _data.password === "" ? "Please enter a valid password" : (_data.password.length < 8 ? "Minimum of 8 characters" : (!hasCharacter.test(_data.password) ? "Must contain a special character" : (!hasDigit.test(_data.password) ? "Must contain digits" : (document.getElementById("pass").classList.remove("is-invalid")))))
                                        }</div>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="delivery" className="form-label"> State: </label>
                                    <select className="form-select form-select-lg" id="delivery" aria-label="delivery" disabled={Object.keys(appData).length > 0 ? false : true} onChange={e => setData({ ..._data, delivery: e.target.value })}>
                                        {
                                            Object.keys(appData).length > 0 ? (
                                                Object.keys(appData["delivery"]).map((item, index) => {
                                                    return (
                                                        <option key={index} value={item}>{item}</option>
                                                    )
                                                })
                                            ) : (
                                                <option value="imo">Imo</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end mb-4">
                                <button type="submit" className="btn btn-lg btn-primary text-white px-4 px-lg-5 py-lg-3" style={{ display: display ? "block" : "none" }}>Create Account</button>
                                <button type="button" className="btn btn-lg btn-primary text-white px-4 px-lg-5 py-lg-3" style={{ display: display ? "none" : "block" }}>
                                    {Spinner("#ffffff", "1.5rem", "105px")}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="d-lg-none px-2">
                        <div className="ln_1">
                            <div className="mb-3 text-center">Already Have An Account?</div>
                            <Link type="button" className="btn btn-lg btn-primary w-100 text-white px-4 py-2" to="/account/login">Sign In</Link>
                        </div>
                    </div>
                </div>
            </div >
            <div className="f-bottom align-bottom mt-5">
                <div className="w_1200 py-3">© 2022, Markie Stores. All Rights Reserved</div>
            </div>
        </Fragment >
    )
}

export default SignUp