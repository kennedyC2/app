import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import pic1 from "../assets/images/pic 1.png";
import { domain } from "./helpers";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { store } from "./main";
import { set } from "idb-keyval";

// InitialState
const InitialState = {
    "_id": "",
    "title": "",
    "brand": "",
    "sizes": {},
    "quantity": "",
    "price": "",
    "colors": {},
    "category": "",
    "description": "",
    "misc": [],
    "images": {}
}

const Product = ({ FetchAppData, FetchData, CreateUserData, CreateCart }) => {
    const Dispatch = useDispatch()
    const { appData, user, cart, trending, newArrivals } = useSelector(state => state)
    const { collection, index, id } = useParams()
    console.log(collection, index, id)
    const col = useSelector(state => state[collection])
    const s = useSelector(state => state)
    console.log(s)
    console.log(col)
    const [target, setTarget] = useState(InitialState)
    console.log(target)
    const [selectedSize, setSelectedSize] = useState(target && target.order && target.order.size !== "" ? target.order.size : "all")
    const dir = `create${collection.charAt(0).toUpperCase()}${collection.substring(1)}`

    // Load appData
    useEffect(() => {
        if (Object.keys(appData).length === 0) {
            FetchAppData(Dispatch)
        }

        if (Object.keys(user).length === 0) {
            CreateUserData(Dispatch, store)
        }

        // Load User Cart
        if (Object.keys(cart).length === 0) {
            CreateCart(Dispatch, store)
        }


        if (collection === "newArrivals" || collection === "trending") {
            if (col.data.length > 0) {
                let _data = JSON.parse(JSON.stringify(col["data"][index]))
                setTarget(_data)
            } else {
                FetchData(collection, null, Dispatch, dir, "TH")
            }
        }

        if (col.length > 0) {
            let _data = JSON.parse(JSON.stringify(col[index]))
            setTarget(_data)
        } else {
            FetchData("products", collection, Dispatch, dir)
            setTarget(col["data"][index])
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trending, newArrivals])

    // useEffect(() => {
    //     if (collection === "newArrivals" || collection === "trending") {
    //         if (col.data.length > 0) {
    //             let _data = JSON.parse(JSON.stringify(col["data"][index]))
    //             setTarget(_data)
    //         } else {
    //             const dir = collection === "trending" ? "createTrending" : "createNewArrivals"
    //             FetchData(collection, null, Dispatch, dir, "TH")
    //         }
    //     }

    //     if (col.length > 0) {
    //         let _data = JSON.parse(JSON.stringify(col[index]))
    //         setTarget(_data)
    //     } else {
    //         (async () => {
    //             let { data } = await axios.get(domain + `products/get?i=${id.replace("src-", "").toLowerCase()}&a=false&c=products`);
    //             setTarget(data)
    //         })()
    //     }

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    return (
        <div className="product body m-auto pt-3">
            <div className="container w_1200">
                <div>
                    <div>
                        <p className="my-2 px-1 heading">{collection}</p>
                    </div>
                    <div className="min-h-50 mt-4 d-flex justify-content-between">
                        <div className="col-lg-8 h-auto d-flex justify-content-between pt-2">
                            <div className="pd_lft-1 col-md-6 col-lg-6">
                                {/* Carousel */}
                                <div id="item_dsp1" className="carousel carousel-dark slide w-100" data-bs-ride="carousel">
                                    {target && target["images"]["main"] ? (
                                        <Fragment>
                                            <div className="carousel-inner h-100">
                                                <div className="carousel-item h-100 w-100 active">
                                                    <img src={domain + "image/" + target.images.main} width="100%" height="100%" alt={collection} />
                                                </div>
                                                <div className="carousel-item h-100 w-100">
                                                    <img src={domain + "image/" + target.images.image_1} width="100%" height="100%" alt={collection} />
                                                </div>
                                                <div className="carousel-item h-100 w-100">
                                                    <img src={domain + "image/" + target.images.image_2} width="100%" height="100%" alt={collection} />
                                                </div>
                                            </div>
                                            <button className="carousel-control-prev" type="button" data-bs-target="#item_dsp1" data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target="#item_dsp1" data-bs-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </Fragment>
                                    ) : (
                                        " "
                                    )}
                                </div>
                                <div id="item_dsp2" className="w-100 d-flex flex-nowrap mt-4">
                                    <div className="item me-2">
                                        <img src={target ? domain + "image/" + target.images.main : ""} width="100%" height="100%" alt={collection} />
                                    </div>
                                    <div className="item me-2">
                                        <img src={target ? domain + "image/" + target.images.image_1 : ""} width="100%" height="100%" alt={collection} />
                                    </div>
                                    <div className="item me-2">
                                        <img src={target ? domain + "image/" + target.images.image_2 : ""} width="100%" height="100%" alt={collection} />
                                    </div>
                                </div>
                            </div>
                            <div className="pd_lft-2 col-md-6 col-lg-5 h-100">
                                <div className="text-start px-1">
                                    <p className="text-uppercase mb-3">{target ? target.title : ""}</p>
                                    <p className="text-capitalize mb-3">
                                        Brand: <span>{target ? target.brand : ""}</span>
                                    </p>
                                    <p className="text-capitalize mb-4">
                                        Sex: <span>{target ? target.sex : ""}</span>
                                    </p>
                                    <p className="prc mb-4">&#x20A6; {new Intl.NumberFormat("en-US", {}).format(target ? target.price : 0)}</p>

                                    <div className="mb-4" style={{ display: target && Object.keys(target["sizes"]).length > 0 ? "block" : "none" }}>
                                        <p>Sizes:</p>
                                        <ul className="s_list">
                                            {
                                                target && Object.keys(target["sizes"]).length > 0 ? (
                                                    Object.keys(target["sizes"]).map((each, index) => {
                                                        return (
                                                            <li key={index} className={each === target && target.order.size ? "selectedSz" : ""} onClick={e => {
                                                                setSelectedSize(each)

                                                                // Update
                                                                setTarget({ ...target, order: { ...target.order, size: each } })
                                                            }}>{each}</li>
                                                        )
                                                    })
                                                ) : (" ")
                                            }
                                        </ul>
                                    </div>

                                    <div className="mb-4" style={{ display: target && Object.keys(target["colors"]).length > 0 ? "block" : "none" }}>
                                        <p>Colour:</p>
                                        <ul className="c_list">
                                            {
                                                target && Object.keys(target["sizes"]).length > 0 ? (
                                                    selectedSize === "all" ? (
                                                        Object.keys(target["colors"]).map((each, index) => {
                                                            return (
                                                                <input key={index} className="form-check-input" type="checkbox" id="checkboxNoLabel" style={{ backgroundColor: each }} disabled />
                                                            )
                                                        })
                                                    ) : (
                                                        <form action="" method="get">
                                                            {Object.keys(target["sizes"][selectedSize]).map((each, index) => {
                                                                return (
                                                                    <input key={index + selectedSize} className={`form-check-input A${target._id.toUpperCase() + "_" + index}${selectedSize}`} type="checkbox" style={{ backgroundColor: each }}
                                                                        onChange={async e => {
                                                                            document.querySelectorAll(`input.A${target._id.toUpperCase() + "_" + index}${selectedSize}`).forEach(each => {
                                                                                each.checked = false
                                                                            })

                                                                            e.currentTarget.checked = true

                                                                            // Update
                                                                            setTarget({ ...target, order: { ...target.order, color: each } })

                                                                        }} checked={target.order.color === each} />
                                                                )
                                                            })}
                                                        </form>
                                                    )
                                                ) : (
                                                    <form action="" method="get">
                                                        {target && Object.keys(target["colors"]).map((each, index) => {
                                                            return (
                                                                <input key={index + each} className={`form-check-input A${target._id.toUpperCase() + "_" + index}${each}`} type="checkbox" style={{ backgroundColor: each }}
                                                                    onChange={async e => {
                                                                        document.querySelectorAll(`input.A${target._id.toUpperCase() + "_" + index}${selectedSize}`).forEach(each => {
                                                                            each.checked = false
                                                                        })

                                                                        e.currentTarget.checked = true

                                                                        // Update Store
                                                                        setTarget({ ...target, order: { ...target.order, color: each } })

                                                                    }} checked={target.order.color === each} />
                                                            )
                                                        })}
                                                    </form>
                                                )
                                            }
                                        </ul>
                                    </div>

                                    <div className="mb-4">
                                        <p>Quantity:</p>
                                        <div className="input-group py-1">
                                            <span className="input-group-text" id="minus" onClick={e => {
                                                setTarget({ ...target, order: { ...target.order, quantity: target.order.quantity -= 1 } })
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                                </svg>
                                            </span>
                                            <input type="number" className="form-control inc text-center" placeholder="1" aria-label="Username" aria-describedby="basic-addon1" value={target && target.order ? target.order["quantity"] : 0} readOnly />
                                            <span className="input-group-text" id="plus" onClick={e => {
                                                setTarget({ ...target, order: { ...target.order, quantity: target.order.quantity += 1 } })
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 px-1 pt-5">
                            <div className="text-uppercase pt-2 pb-3 border-bottom border-2">Summary</div>
                            <div className="d-flex justify-content-between my-4 border-bottom border-1 pb-3">
                                <div className="col-5">Subtotal:</div>
                                <div className="col-5 text-end">&#x20A6; {new Intl.NumberFormat("en-US", {}).format(parseInt(target && target.order ? target.order["quantity"] : 0) * parseInt(target ? target["price"] : 0))}</div>
                            </div>
                            <div className="my-4">
                                <p className="mb-3">Location:</p>
                                <div className="dropdown-center">
                                    <button className="btn dropdown-toggle w-100 mb-3 text-capitalize" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {user["delivery"]}
                                    </button>
                                    <ul className="dropdown-menu w-100">
                                        {appData && appData["delivery"] ? (
                                            Object.keys(appData["delivery"]).map((item, index) => {
                                                return (
                                                    <li key={index} className="dropdown-item text-capitalize" onClick={e => {
                                                        return Dispatch({ type: "delivery", payload: item })
                                                    }}>{item}</li>
                                                )
                                            })
                                        ) : (
                                            <div className="empty emptyS">
                                                <p>------- &nbsp;  no data &nbsp; -------</p>
                                            </div>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between my-4 border-bottom border-1 pb-4">
                                <div className="col-5">Delivery Fee:</div>
                                <div className="col-5 text-end">&#x20A6; {new Intl.NumberFormat("en-US", {}).format(appData && appData["delivery"] ? appData["delivery"][user["delivery"]] : "0.00")}</div>
                            </div>
                            <div className="c-btm">
                                <div className="w-100 d-flex justify-content-between border-bottom border-1 pb-2">
                                    <p>Total:</p>
                                    <p>&#x20A6; {new Intl.NumberFormat("en-US", {}).format(appData && appData["delivery"] ? ((parseInt(target && target.order ? target.order["quantity"] : 0) * parseInt(target ? target["price"] : 0)) + appData["delivery"][user["delivery"]]) : "")}</p>
                                </div>
                                <div className="pt-1 pb-3">
                                    <div className="form-check text-start ps-4 pt-4 pb-3">
                                        <input className="form-check-input me-3" type="checkbox" value="" id="T&C" />
                                        <label className="form-check-label" htmlFor="T&C">
                                            {" "}
                                            I agree with the <span className="text-decoration-underline">Terms and Conditions</span>{" "}
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-md w-100 py-2 mb-3" onClick={async e => {
                                        let i = cart.id.indexOf(target["_id"])
                                        if (i > -1) {
                                            // Update Store
                                            await set("cart", {
                                                id: cart.id.filter(each => {
                                                    return each !== target._id
                                                }),
                                                data: cart.data.filter(each => {
                                                    return each._id !== target._id
                                                }),
                                                expiry: cart.expiry
                                            }, store)

                                            // Update State
                                            return Dispatch({ type: "remove4rmCart", payload: target })
                                        }

                                        // Update Store
                                        await set("cart", {
                                            id: [...cart.id, target._id],
                                            data: [...cart.data, target],
                                            expiry: cart.expiry
                                        }, store)

                                        return Dispatch({ type: "addToCart", payload: JSON.parse(JSON.stringify(target ? target : {})) })
                                    }}>
                                        {cart.id && cart.id.indexOf(target ? target._id : "") > -1 ? "ADDED" : "ADD TO CART"}
                                    </button>{" "}
                                    <button type="button" className="btn btn-md w-100 py-2 mb-3" onClick={async e => {
                                        const reqData = {
                                            cart: target.order,
                                            total: (parseInt(target.order["quantity"]) * parseInt(target["price"])) + appData["delivery"][user["delivery"]],
                                            user: user._id,
                                            email: user.email,
                                            delivery: user.delivery
                                        }

                                        try {
                                            const response = await axios({
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                url: domain + "cart/create",
                                                data: reqData,
                                            });

                                            const result = response.data;

                                            // Update Store
                                            await set("user", {
                                                _id: user._id,
                                                firstname: user.firstname,
                                                lastname: user.lastname,
                                                email: user.email,
                                                delivery: user.delivery,
                                                verified: user.verified,
                                                active: user.active,
                                                admin: user.admin,
                                                pending: [...user.pending, result._id],
                                                history: [...user.history, result],
                                                settled: user.settled,
                                                cards: user.cards
                                            }, store)

                                            // Update Admin
                                            if (user.admin) {
                                                Dispatch({ type: "pending", payload: result })
                                            }

                                            // Update State
                                            Dispatch({ type: "pending", payload: result._id })
                                            Dispatch({ type: "history", payload: result })

                                        } catch (error) {
                                            console.log(error);
                                        }
                                    }}>
                                        CHECKOUT
                                    </button>{" "}
                                    <br />
                                    <Link to="/" className="btn btn-md w-100 py-2">
                                        RETURN TO HOMEPAGE
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <p className="my-5 px-1 heading">You might also like these:</p>
                    </div>
                    {/* Cards */}
                    <div className="grid">
                        <div className="card">
                            <div className="imgcont">
                                <Link to="/product" className="d-inline-block text-decoration-none">
                                    <img src={pic1} width="100%" height="100%" className="card-img-top" alt="..." />
                                </Link>
                            </div>
                            <div className="card-body">
                                <Link to="/product" className="d-inline-block px-2 pb-3 text-decoration-none">
                                    <h5 className="card-title ps-2">Purple Scrub Top</h5>
                                    <p className="card-text ps-2">&#x20A6; 5000</p>
                                </Link>
                                <div className="d-flex justify-content-between">
                                    <Link href="#" className="btn col-9 shadow">
                                        ADD TO CART
                                    </Link>
                                    <Link href="#" className="btn px-1 wl col-2 shadow" title="Add to wishlist">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="imgcont">
                                <Link to="/product" className="d-inline-block text-decoration-none">
                                    <img src={pic1} width="100%" height="100%" className="card-img-top" alt="..." />
                                </Link>
                            </div>
                            <div className="card-body">
                                <Link to="/product" className="d-inline-block px-2 pb-3 text-decoration-none">
                                    <h5 className="card-title ps-2">Purple Scrub Top</h5>
                                    <p className="card-text ps-2">&#x20A6; 5000</p>
                                </Link>
                                <div className="d-flex justify-content-between">
                                    <Link href="#" className="btn col-9 shadow">
                                        ADD TO CART
                                    </Link>
                                    <Link href="#" className="btn px-1 wl col-2 shadow" title="Add to wishlist">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="imgcont">
                                <Link to="/product" className="d-inline-block text-decoration-none">
                                    <img src={pic1} width="100%" height="100%" className="card-img-top" alt="..." />
                                </Link>
                            </div>
                            <div className="card-body">
                                <Link to="/product" className="d-inline-block px-2 pb-3 text-decoration-none">
                                    <h5 className="card-title ps-2">Purple Scrub Top</h5>
                                    <p className="card-text ps-2">&#x20A6; 5000</p>
                                </Link>
                                <div className="d-flex justify-content-between">
                                    <Link href="#" className="btn col-9 shadow">
                                        ADD TO CART
                                    </Link>
                                    <Link href="#" className="btn px-1 wl col-2 shadow" title="Add to wishlist">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="imgcont">
                                <Link to="/product" className="d-inline-block text-decoration-none">
                                    <img src={pic1} width="100%" height="100%" className="card-img-top" alt="..." />
                                </Link>
                            </div>
                            <div className="card-body">
                                <Link to="/product" className="d-inline-block px-2 pb-3 text-decoration-none">
                                    <h5 className="card-title ps-2">Purple Scrub Top</h5>
                                    <p className="card-text ps-2">&#x20A6; 5000</p>
                                </Link>
                                <div className="d-flex justify-content-between">
                                    <Link href="#" className="btn col-9 shadow">
                                        ADD TO CART
                                    </Link>
                                    <Link href="#" className="btn px-1 wl col-2 shadow" title="Add to wishlist">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="imgcont">
                                <Link to="/product" className="d-inline-block text-decoration-none">
                                    <img src={pic1} width="100%" height="100%" className="card-img-top" alt="..." />
                                </Link>
                            </div>
                            <div className="card-body">
                                <Link to="/product" className="d-inline-block px-2 pb-3 text-decoration-none">
                                    <h5 className="card-title ps-2">Purple Scrub Top</h5>
                                    <p className="card-text ps-2">&#x20A6; 5000</p>
                                </Link>
                                <div className="d-flex justify-content-between">
                                    <Link href="#" className="btn col-9 shadow">
                                        ADD TO CART
                                    </Link>
                                    <Link href="#" className="btn px-1 wl col-2 shadow" title="Add to wishlist">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="imgcont">
                                <Link to="/product" className="d-inline-block text-decoration-none">
                                    <img src={pic1} width="100%" height="100%" className="card-img-top" alt="..." />
                                </Link>
                            </div>
                            <div className="card-body">
                                <Link to="/product" className="d-inline-block px-2 pb-3 text-decoration-none">
                                    <h5 className="card-title ps-2">Purple Scrub Top</h5>
                                    <p className="card-text ps-2">&#x20A6; 5000</p>
                                </Link>
                                <div className="d-flex justify-content-between">
                                    <Link href="#" className="btn col-9 shadow">
                                        ADD TO CART
                                    </Link>
                                    <Link href="#" className="btn px-1 wl col-2 shadow" title="Add to wishlist">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="imgcont">
                                <Link to="/product" className="d-inline-block text-decoration-none">
                                    <img src={pic1} width="100%" height="100%" className="card-img-top" alt="..." />
                                </Link>
                            </div>
                            <div className="card-body">
                                <Link to="/product" className="d-inline-block px-2 pb-3 text-decoration-none">
                                    <h5 className="card-title ps-2">Purple Scrub Top</h5>
                                    <p className="card-text ps-2">&#x20A6; 5000</p>
                                </Link>
                                <div className="d-flex justify-content-between">
                                    <Link href="#" className="btn col-9 shadow">
                                        ADD TO CART
                                    </Link>
                                    <Link href="#" className="btn px-1 wl col-2 shadow" title="Add to wishlist">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="imgcont">
                                <Link to="/product" className="d-inline-block text-decoration-none">
                                    <img src={pic1} width="100%" height="100%" className="card-img-top" alt="..." />
                                </Link>
                            </div>
                            <div className="card-body">
                                <Link to="/product" className="d-inline-block px-2 pb-3 text-decoration-none">
                                    <h5 className="card-title ps-2">Purple Scrub Top</h5>
                                    <p className="card-text ps-2">&#x20A6; 5000</p>
                                </Link>
                                <div className="d-flex justify-content-between">
                                    <Link href="#" className="btn col-9 shadow">
                                        ADD TO CART
                                    </Link>
                                    <Link href="#" className="btn px-1 wl col-2 shadow" title="Add to wishlist">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="imgcont">
                                <Link to="/product" className="d-inline-block text-decoration-none">
                                    <img src={pic1} width="100%" height="100%" className="card-img-top" alt="..." />
                                </Link>
                            </div>
                            <div className="card-body">
                                <Link to="/product" className="d-inline-block px-2 pb-3 text-decoration-none">
                                    <h5 className="card-title ps-2">Purple Scrub Top</h5>
                                    <p className="card-text ps-2">&#x20A6; 5000</p>
                                </Link>
                                <div className="d-flex justify-content-between">
                                    <Link href="#" className="btn col-9 shadow">
                                        ADD TO CART
                                    </Link>
                                    <Link href="#" className="btn px-1 wl col-2 shadow" title="Add to wishlist">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="imgcont">
                                <Link to="/product" className="d-inline-block text-decoration-none">
                                    <img src={pic1} width="100%" height="100%" className="card-img-top" alt="..." />
                                </Link>
                            </div>
                            <div className="card-body">
                                <Link to="/product" className="d-inline-block px-2 pb-3 text-decoration-none">
                                    <h5 className="card-title ps-2">Purple Scrub Top</h5>
                                    <p className="card-text ps-2">&#x20A6; 5000</p>
                                </Link>
                                <div className="d-flex justify-content-between">
                                    <Link href="#" className="btn col-9 shadow">
                                        ADD TO CART
                                    </Link>
                                    <Link href="#" className="btn px-1 wl col-2 shadow" title="Add to wishlist">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
