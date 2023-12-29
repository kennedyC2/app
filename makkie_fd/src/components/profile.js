// import axios from "axios";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { domain } from "./helpers";
import { set } from "idb-keyval";
import { store } from "./main";
import { History_DSP } from "./dsp";

const Profile = ({ CreateUserData, CreateCart, CreateWishlist }) => {
    const Dispatch = useDispatch()
    const { user, appData, cart, wishlist } = useSelector((state) => state);
    const [passwordShown1, passwordToggle1] = useState(false)
    const [passwordShown2, passwordToggle2] = useState(false)
    const [passwordShown3, passwordToggle3] = useState(false)
    const [targetD, setTargetD] = useState(0)
    const [data_1, setData_1] = useState(user.delivery)
    const [data_2, setData_2] = useState({
        old: "",
        new1: "",
        new2: ""
    });
    let hasCharacter = /\W/
    let hasDigit = /\d/

    // Load User Data
    useEffect(() => {
        if (Object.keys(user).length === 0) {
            CreateUserData(Dispatch, store)
        }
        // Load User Wishlist
        if (Object.keys(wishlist).length === 0) {
            CreateWishlist(Dispatch, store)
        }

        // Load User Cart
        if (Object.keys(cart).length === 0) {
            CreateCart(Dispatch, store)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const submitForm = async (e) => {
        e.preventDefault();
        let old = false
        let new1 = false
        let new2 = false

        if (data_2.old !== "" && data_2.old.length >= 8 && hasCharacter.test(data_2.old) && hasDigit.test(data_2.old)) {
            document.getElementById("passOld").classList.remove("is-invalid")
            document.getElementById("passOld").classList.add("is-valid")
            old = true
        } else {
            document.getElementById("passOld").classList.add("is-invalid")
        }

        if (data_2.new1 !== "" && data_2.new1.length >= 8 && hasCharacter.test(data_2.new1) && hasDigit.test(data_2.new1)) {
            document.getElementById("passNew1").classList.remove("is-invalid")
            document.getElementById("passNew1").classList.add("is-valid")
            new1 = true
        } else {
            document.getElementById("passNew1").classList.add("is-invalid")
        }

        if (data_2.new2 !== "" && data_2.new2.length >= 8 && hasCharacter.test(data_2.new2) && hasDigit.test(data_2.new2) && data_2.new2 === data_2.new1) {
            document.getElementById("passNew2").classList.remove("is-invalid")
            document.getElementById("passNew2").classList.add("is-valid")
            new2 = true
        } else {
            document.getElementById("passNew2").classList.add("is-invalid")
        }

        if (old && new1 && new2) {
            try {
                await axios({
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    url: domain + "/account/password",
                    data: {
                        id: user._id,
                        old: data_2.old,
                        new1: data_2.new1
                    }
                });

                // Close Modal
                document.querySelectorAll("div#backdropP div.modal-footer button")[0].click()

            } catch (error) {
                console.log(error.response.data.message);
            }
        }
    };

    return (
        <Fragment>
            <div className="profile w_1200 m-auto d-lg-flex justify-content-between">
                <div className="px-3 mb">
                    <div className="mb-4 py-3 px-4" style={{ border: "1px solid #adc0cf", borderRadius: "1rem" }}>
                        <h2 className="py-2">Personal Details:</h2>
                        <p>Name: {user.firstname} {user.lastname}</p>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                        <p className="text-capitalize">Delivery: {user.delivery} <span>
                            <a className="btn btn-sm btn-danger ms-2" title="Change Delivery" data-bs-toggle="modal" href="#backdropD" role="button" >
                                Change
                            </a>
                        </span></p>
                        <p>Password: ************* <span>
                            <a className="btn btn-sm btn-danger ms-2" title="Change Password" data-bs-toggle="modal" href="#backdropP" role="button" >
                                Change
                            </a>
                        </span></p>
                    </div>
                    <div className="py-4 px-4" style={{ border: "1px solid #adc0cf", borderRadius: "1rem" }}>
                        <h2 className="py-2">Cards:</h2>
                        {
                            user.cards && user.cards.length > 0 ? (
                                user.cards.map((item, index) => {
                                    return (
                                        <div key={index} className="d-flex justify-content-between c_cont">
                                            <div className="my-auto gg">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="50" viewBox="0 0 256 83">
                                                    <defs>
                                                        <linearGradient id="logosVisa0" x1="45.974%" x2="54.877%" y1="-2.006%" y2="100%">
                                                            <stop offset="0%" stop-color="#222357" />
                                                            <stop offset="100%" stop-color="#254AA5" />
                                                        </linearGradient>
                                                    </defs>
                                                    <path fill="url(#logosVisa0)" d="M132.397 56.24c-.146-11.516 10.263-17.942 18.104-21.763c8.056-3.92 10.762-6.434 10.73-9.94c-.06-5.365-6.426-7.733-12.383-7.825c-10.393-.161-16.436 2.806-21.24 5.05l-3.744-17.519c4.82-2.221 13.745-4.158 23-4.243c21.725 0 35.938 10.724 36.015 27.351c.085 21.102-29.188 22.27-28.988 31.702c.069 2.86 2.798 5.912 8.778 6.688c2.96.392 11.131.692 20.395-3.574l3.636 16.95c-4.982 1.814-11.385 3.551-19.357 3.551c-20.448 0-34.83-10.87-34.946-26.428m89.241 24.968c-3.967 0-7.31-2.314-8.802-5.865L181.803 1.245h21.709l4.32 11.939h26.528l2.506-11.939H256l-16.697 79.963h-17.665m3.037-21.601l6.265-30.027h-17.158l10.893 30.027m-118.599 21.6L88.964 1.246h20.687l17.104 79.963h-20.679m-30.603 0L53.941 26.782l-8.71 46.277c-1.022 5.166-5.058 8.149-9.54 8.149H.493L0 78.886c7.226-1.568 15.436-4.097 20.41-6.803c3.044-1.653 3.912-3.098 4.912-7.026L41.819 1.245H63.68l33.516 79.963H75.473" transform="matrix(1 0 0 -1 0 82.668)" />
                                                </svg>
                                            </div>
                                            <div className="my-auto gg">
                                                <p className="my-0">{user.firstname} {user.lastname}</p>
                                                <p className="my-0">{user.card_number}</p>
                                            </div>
                                            <div className="my-auto gg text-end">
                                                <button className="btn btn-sm btn-danger text-white">Remove</button>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="empty emptyS w-100">
                                    <p>------- &nbsp;  no card yet &nbsp; -------</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="px-4 mx-3 py-2">
                    <div style={{ height: "100%" }}>
                        <h2 className="py-3">History:</h2>
                        {
                            user.history && user.history.length > 0 ? (
                                user.history.map((item, index) => {
                                    if (index <= 10) {
                                        return (
                                            <a key={"h" + index} className="btn btn-sm d-flex mb-3 text-start px-0" title="Change Delivery" data-bs-toggle="modal" href="#backdropC" role="button" onClick={() => setTargetD(index)}>
                                                <div className="my-auto me-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#FF0066" d="M9 20c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2m8-2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m-9.8-3.2v-.1l.9-1.7h7.4c.7 0 1.4-.4 1.7-1l3.9-7l-1.7-1l-3.9 7h-7L4.3 2H1v2h2l3.6 7.6L5.2 14c-.1.3-.2.6-.2 1c0 1.1.9 2 2 2h12v-2H7.4c-.1 0-.2-.1-.2-.2M18 2.8l-1.4-1.4l-4.8 4.8l-2.6-2.6L7.8 5l4 4L18 2.8Z" /></svg>
                                                </div>
                                                <div className="my-auto gg">
                                                    <p className="my-0">{item._id.toUpperCase()}</p>
                                                    <p className="my-0 text-capitalize">{item.date} - {item.status}</p>
                                                </div>
                                            </a>
                                        )
                                    }

                                    return ""
                                })
                            ) : (
                                <div className="empty emptyS h-75">
                                    <p>------- &nbsp;  no data &nbsp; -------</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="modal fade" id="backdropD" data-bs-backdrop="static" aria-hidden="true" aria-labelledby="backdropDLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modalFive">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="backdropDLabel">
                                Delivery:
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form >
                                {appData && appData["delivery"] ? (
                                    Object.keys(appData["delivery"]).map((item, index) => {
                                        return (
                                            <div key={index} className="form-check">
                                                <input className="form-check-input" type="radio" name={item} id={"flexRadioDefault" + index} onClick={e => setData_1(item)} defaultChecked={user.delivery === item ? true : false} />
                                                <label className="form-check-label ms-2 text-capitalize" htmlFor={"flexRadioDefault" + index}>
                                                    {item}
                                                </label>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="empty emptyS">
                                        <p>------- &nbsp;  no data &nbsp; -------</p>
                                    </div>
                                )}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary invisible" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-secondary" onClick={async e => {
                                try {
                                    const response = await axios({
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        url: domain + "product/delivery",
                                        data: {
                                            id: user._id,
                                            delivery: data_1
                                        }
                                    });

                                    const result = response.data;

                                    await set("user", result, store)

                                    Dispatch({ type: "delivery", payload: data_1 })

                                    // Close Modal
                                    e.target.previousSibling.click()
                                } catch (error) {
                                    console.log(error);
                                }
                            }} >Save</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="backdropP" data-bs-backdrop="static" aria-hidden="true" aria-labelledby="backdropPLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modalFive">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="backdropPLabel">
                                Password:
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="" method="post" className="needs-validation" onSubmit={e => submitForm(e)} noValidate>
                                <div className="mb-3">
                                    <label htmlFor="passOld" className="form-label"> Old Password: </label>
                                    <div className="input-group has-validation">
                                        <input type={passwordShown1 ? "text" : "password"} className="form-control form-control-lg" id="passOld" name="password" placeholder="******************" onChange={(e) => setData_2({ ...data_2, old: e.target.value })} required />
                                        <span className="input-group-text" onClick={e => passwordToggle1(!passwordShown1)}>
                                            {!passwordShown1 ?
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
                                            data_2.old === "" ? "Please enter a valid password" : (data_2.old.length < 8 ? "Minimum of 8 characters" : (!hasCharacter.test(data_2.old) ? "Must contain a special character" : (!hasDigit.test(data_2.old) ? "Must contain digits" : (document.getElementById("passOld").classList.remove("is-invalid")))))
                                        }</div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="passNew1" className="form-label"> New Password: </label>
                                    <div className="input-group has-validation">
                                        <input type={passwordShown2 ? "text" : "password"} className="form-control form-control-lg" id="passNew1" name="password" placeholder="******************" onChange={(e) => setData_2({ ...data_2, new1: e.target.value })} required />
                                        <span className="input-group-text" onClick={e => passwordToggle2(!passwordShown2)}>
                                            {!passwordShown2 ?
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
                                            data_2.new1 === "" ? "Please enter a valid password" : (data_2.new1.length < 8 ? "Minimum of 8 characters" : (!hasCharacter.test(data_2.new1) ? "Must contain a special character" : (!hasDigit.test(data_2.new1) ? "Must contain digits" : (document.getElementById("passNew1").classList.remove("is-invalid")))))
                                        }</div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="passNew2" className="form-label"> Confirm Password: </label>
                                    <div className="input-group has-validation">
                                        <input type={passwordShown3 ? "text" : "password"} className="form-control form-control-lg" id="passNew2" name="password" placeholder="******************" onChange={(e) => setData_2({ ...data_2, new2: e.target.value })} required />
                                        <span className="input-group-text" onClick={e => passwordToggle3(!passwordShown3)}>
                                            {!passwordShown3 ?
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
                                            data_2.new2 === "" ? "Please enter a valid password" : (data_2.new2.length < 8 ? "Minimum of 8 characters" : (!hasCharacter.test(data_2.new2) ? "Must contain a special character" : (!hasDigit.test(data_2.new2) ? "Must contain digits" : (data_2.new2 !== data_2.new1 ? "Password must be the same as typed previously" : (document.getElementById("passNew2").classList.remove("is-invalid"))))))
                                        }</div>
                                    </div>
                                </div>
                                <button type="submit" id="cPass" hidden>Submit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary invisible" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-secondary" onClick={e => document.getElementById("cPass").click()} >Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="backdropC" data-bs-backdrop="static" aria-hidden="true" aria-labelledby="backdropCLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modalTwo">
                    <div className="modal-content">
                        {user && user.history && user.history.length > 0 ? History_DSP(user.history, domain, targetD) : ""}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Profile;
