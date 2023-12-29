import { set } from "idb-keyval"
import { Link } from "react-router-dom"
import { store } from "./main"
import { Fragment } from "react"
import axios from "axios"
import { Spinner } from "./misc"

export const Header_Cart_DSP = (domain, index, item, cart, dispatch) => {
    return (
        <div key={item._id.toUpperCase() + "_" + index + "C"} className="d-flex w-100 justify-content-between py-4">
            <div className="col-4 m-auto" style={{ height: "120px" }}>
                <img src={domain + "image/" + item.images.main} className="d-block w-100 h-100" alt="..." />
            </div>
            <div className="col-5 text-start ps-2 m-auto">
                <p className="pb-1">{item.title}</p>
                <p className="pb-1">Brand: {item.brand}</p>
                <p className="pb-1">&#x20A6; {new Intl.NumberFormat("en-US", {}).format(item.price)}</p>
            </div>
            <div className="col-1 pt-2 m-auto">
                <button type="button" className="btn-close text-reset" onClick={async e => {
                    // Update Store
                    await set("cart", {
                        id: cart.id.filter(each => {
                            return each !== item._id
                        }),
                        data: cart.data.filter(each => {
                            return each._id !== item._id
                        }),
                        expiry: cart.expiry
                    }, store)

                    return dispatch({ type: "remove4rmCart", payload: item })
                }}></button>
            </div>
        </div>
    )
}

export const Header_Wishlist_DSP = (domain, index, item, wishlist, dispatch) => {
    return (
        <div key={item._id.toUpperCase() + "_" + index + "W"} className="d-flex w-100 justify-content-between py-4">
            <div className="col-4 m-auto" style={{ height: "120px" }}>
                <img src={domain + "image/" + item.images.main} className="d-block w-100 h-100" alt="..." />
            </div>
            <div className="col-5 text-start ps-2 m-auto">
                <p className="pb-1">{item.title}</p>
                <p className="pb-1">Brand: {item.brand}</p>
                <p className="pb-1">&#x20A6; {new Intl.NumberFormat("en-US", {}).format(item.price)}</p>
            </div>
            <div className="col-1 pt-2 m-auto">
                <button type="button" className="btn-close text-reset" onClick={async e => {
                    // Update Store
                    await set("wishlist", {
                        id: wishlist.id.filter(each => {
                            return each !== item._id
                        }),
                        data: wishlist.data.filter(each => {
                            return each._id !== item._id
                        }),
                        expiry: wishlist.expiry
                    }, store)

                    return dispatch({ type: "remove4rmWishlist", payload: item })
                }}></button>
            </div>
        </div>
    )
}

export const Product_DSP = (domain, collection, index, item, cart, wishlist, dispatch) => {
    return (
        <div key={item._id.toUpperCase() + "_" + index + "P"} className="card">
            <div className="imgcont">
                <Link to={`/product/${collection}/${index}/src-${item._id.toLowerCase()}`} preventScrollReset={false} className="d-inline-block text-decoration-none">
                    <img src={domain + "image/" + item.images.main} width="100%" height="100%" className="card-img-top" alt={collection} />
                </Link>
            </div>
            <div className="card-body">
                <Link to={`/product/${collection}/${index}/src-${item._id.toLowerCase()}`} preventScrollReset={false} className="d-inline-block px-2 pb-3 text-decoration-none">
                    <h5 className="card-title ps-1">{item.title}</h5>
                    <p className="card-text ps-1">&#x20A6; {new Intl.NumberFormat("en-US", {}).format(item.price)}</p>
                </Link>
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn col-9 shadow" onClick={async e => {
                        let i = cart.id.indexOf(item["_id"])
                        if (i > -1) {
                            // Update Store
                            await set("cart", {
                                id: cart.id.filter(each => {
                                    return each !== item._id
                                }),
                                data: cart.data.filter(each => {
                                    return each._id !== item._id
                                }),
                                expiry: cart.expiry
                            }, store)

                            // Update State
                            return dispatch({ type: "remove4rmCart", payload: item })
                        }

                        // Update Store
                        await set("cart", {
                            id: [...cart.id, item._id],
                            data: [...cart.data, item],
                            expiry: cart.expiry
                        }, store)

                        return dispatch({ type: "addToCart", payload: JSON.parse(JSON.stringify(item)) })

                    }}>
                        {cart.id && cart.id.indexOf(item._id) > -1 ? "ADDED" : "ADD TO CART"}
                    </button>
                    <button type="button" className="btn px-1 wl col-2 shadow" title="Add to wishlist" onClick={async e => {
                        let i = wishlist.id.indexOf(item["_id"])
                        if (i > -1) {

                            // Update Store
                            await set("wishlist", {
                                id: wishlist.id.filter(each => {
                                    return each !== item._id
                                }),
                                data: wishlist.data.filter(each => {
                                    return each._id !== item._id
                                }),
                                expiry: wishlist.expiry
                            }, store)

                            // Update State
                            return dispatch({ type: "remove4rmWishlist", payload: item })
                        }

                        // Update Store
                        await set("wishlist", {
                            id: [...wishlist.id, item._id],
                            data: [...wishlist.data, item],
                            expiry: wishlist.expiry
                        }, store)

                        return dispatch({ type: "addToWishlist", payload: item })

                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="90%" height="100%" className="bi bi-heart-fill" fill={wishlist.id && wishlist.id.indexOf(item._id) > -1 ? "red" : "#adc0cf"} viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export const Admin_DSP = (domain, index, item, updateState, deleteItem, addTN, display, trending, newArrival) => {
    return (
        <div key={item._id.toUpperCase() + "_" + index + "A"} className="card" id={item._id + "_" + index}>
            <img src={domain + "image/" + item.images.main} className="card-img-top" alt="crocs" width={"100%"} height={"100%"} />
            <div className="card-body">
                <div>
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">&#x20A6; {new Intl.NumberFormat("en-US", {}).format(item.price)}</p>
                </div>

                <div className="card-body px-0 pb-0 d-flex justify-content-between">
                    <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target={"#crocs_" + index + "a"}>
                        View
                    </button>

                    <div className="modal fade" id={"crocs_" + index + "a"} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={"crocs_" + index + "a_Label"} aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modalThree">
                            <div className="modal-content py-3">
                                <div className="modal-header px-4">
                                    <h1 className="modal-title fs-5" id={"crocs_" + index + "a_Label"}>Category: {item.category}</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body text-start px-4">
                                    <div>
                                        <div className="w-100 d-flex justify-content-between">
                                            <div style={{ width: "30%" }}>
                                                <p className="text-capitalize">Product: {item.title}</p>
                                                <p className="text-capitalize">Brand: {item.brand}</p>
                                                <p className="text-capitalize">Sex: {item.sex}</p>
                                                <p>Primary Color: <span className="form-check-input ms-2 mt-0 rounded-circle d-inline-block" style={{ backgroundColor: item.dColor, width: "20px", height: "20px" }}></span></p>
                                                <p>Current price: &#x20A6; {new Intl.NumberFormat("en-US", {}).format(item.price)}</p>
                                            </div>
                                            <div className="d-flex justify-content-between" style={{ width: "65%" }}>
                                                <div className="w-30">
                                                    <p>In Stock: {new Intl.NumberFormat("en-US", {}).format(item.quantity)}</p>
                                                    <p>Sold: {new Intl.NumberFormat("en-US", {}).format(item.sold)}</p>
                                                </div>
                                                <div className="" style={{ width: "60%" }}>
                                                    {
                                                        Object.entries(item.sizes).map(([each, obj], index1) => {
                                                            return (
                                                                <p key={"dd" + index1}>Size {each}: {
                                                                    Object.entries(obj).map(([each1, value], index2) => {
                                                                        return (
                                                                            <span key={"de" + index2} >
                                                                                <span className="form-check-input ms-2 mt-0 rounded-circle d-inline-block" style={{ backgroundColor: each1, width: "20px", height: "20px" }}></span>
                                                                                {" "}= {value}{index2 > 1 ? "," : ""}{", "}
                                                                            </span>
                                                                        )
                                                                    })
                                                                }</p>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <p className="desc pt-0">Images:</p>
                                        <div className="cont4">
                                            <div>
                                                <img src={domain + "image/" + item.images.main} alt="main" />
                                            </div>
                                            <div>
                                                <img src={domain + "image/" + item.images.image_1} alt="image_1" />
                                            </div>
                                            <div>
                                                <img src={domain + "image/" + item.images.image_2} alt="image_2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer px-4">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => updateState(index, item._id)}>
                        Edit
                    </button>

                    <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target={"#crocs_" + index + "b"}>
                        Delete
                    </button>

                    <div className="modal fade" id={"crocs_" + index + "b"} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={"crocs_" + index + "b_Label"} aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modalFour">
                            <div className="modal-content">
                                <div className="modal-body text-start py-5 px-4">
                                    Do you really want to delete this item?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary px-5" data-bs-dismiss="modal">No</button>
                                    <button type="button" className="btn btn-danger px-5" style={{ display: display ? "block" : "none" }} onClick={(e) => deleteItem(e, item._id, item.category, item.images, item.misc)}>Yes</button>
                                    <button type="button" className="btn btn-danger px-5" style={{ display: display ? "none" : "block" }} disabled>
                                        {Spinner("#03001fcc", "1.5rem", "28px")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body px-0 pb-0 d-flex justify-content-between">
                    <button type="button" className="btn btn-outline-secondary" style={{ width: "45%" }} onClick={(e) => addTN(e, item, true)} disabled={trending.indexOf(item._id) > -1 ? true : false}>
                        {trending.indexOf(item._id) > -1 ? "Added" : "Trending"}
                    </button>
                    <button type="button" className="btn btn-outline-secondary d-none">
                        {Spinner("#adc0cf", "1.5rem", "70px")}
                    </button>
                    <button type="button" className="btn btn-outline-secondary" style={{ width: "50%" }} onClick={(e) => addTN(e, item, false)} disabled={newArrival.indexOf(item._id) > -1 ? true : false}>
                        {trending.indexOf(item._id) > -1 ? "Added" : "New Arrival"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export const Admin_DSP_TN = (domain, index, item, deleteTN, TH) => {
    return (
        <div key={item._id.toUpperCase() + "_" + index + "A"} className="card" id={item._id + "_" + index}>
            <img src={domain + "image/" + item.images.main} className="card-img-top" alt="crocs" width={"100%"} height={"100%"} />
            <div className="card-body">
                <div>
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">&#x20A6; {new Intl.NumberFormat("en-US", {}).format(item.price)}</p>
                </div>

                <div className="card-body px-0 pb-0 justify-content-between">
                    <button type="button" className="btn btn-outline-secondary" style={{ width: "100%" }} onClick={(e) => TH ? deleteTN(e, item, true) : deleteTN(e, item, false)}>
                        Delete
                    </button>
                    <button type="button" className="btn btn-outline-secondary d-none" style={{ width: "100%" }}>
                        {Spinner("#adc0cf", "1.5rem", "100%")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export const History_DSP = (history, domain, index) => {
    return (
        <Fragment>
            <div className="modal-header">
                <h1 className="modal-title fs-6 px-3" id="backdropCLabel">
                    Ticket No: {history[index]._id.toUpperCase()}
                </h1>
                <button type="button" className="btn-close" id="f2c" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="hTop px-4">
                    <div>
                        <p className="">Email: {history[index].email} </p>
                    </div>
                    <div>
                        <p className="text-capitalize">Phone: {history[index].phone} </p>
                    </div>
                </div>
                <div className="hMid px-4">
                    <p className="text-capitalize">Items:  </p>
                    <div className="d-flex flex-wrap justify-content-between">
                        {
                            history[index]["cart"].map((item, index1) => {
                                return (<div key={"cct" + index1} className="prCard card mb-3 ps-2" style={{ "maxWidth": "540px" }}>
                                    <div className="row g-0 justify-content-between">
                                        <div className="col-md-5 my-auto">
                                            <img src={domain + "image/" + item.image} className="img-fluid rounded-start" alt="..." />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="card-body">
                                                <h5 className="card-title">{item.title}</h5>
                                                <p className="card-text"><small className="text-muted">Brand: {item.brand}</small></p>
                                                <p className="card-text"><small className="text-muted">Sex: {item.sex}</small></p>
                                                <p className="card-text">
                                                    <small className="text-muted">
                                                        Colour:  <span className="form-check-input ms-2 mt-0 rounded-circle d-inline-block" style={{ backgroundColor: item.color, width: "20px", height: "20px" }}></span>
                                                    </small>
                                                </p>
                                                <p className="card-text"><small className="text-muted">Quantity: {item.quantity}</small></p>
                                                <p className="card-text"><small className="text-muted">Price: {item.price}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <p className="text-capitalize">Delivery: {history[index].delivery} State, </p>
                <p className="text-capitalize">Total paid: &#x20A6; {new Intl.NumberFormat("en-US", {}).format(history[index].total)}</p>
            </div>
        </Fragment>

    );
}

export const AdminPending_DSP = (history, user, domain, index, dispatch) => {
    return (
        <Fragment>
            <div className="hTop">
                <div>
                    <p className="text-capitalize">Ticket No: {history[index]._id.toUpperCase()} </p>
                    <p className="">Email: {history[index].email} </p>
                    <p className="text-capitalize">Phone: {history[index].phone} </p>
                </div>
                <div className="hBtm" style={{ width: "28%" }}>
                    <p className="text-capitalize">Delivery: {history[index].delivery} State </p>
                    <p className="text-capitalize">Total paid: &#x20A6; {new Intl.NumberFormat("en-US", {}).format(history[index].total)}</p>
                </div>
                <div style={{ width: "20%" }}>
                    <button type="button" className="btn btn-danger" onClick={async (e) => {
                        try {
                            await axios({
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                url: domain + "cart/close",
                                data: {
                                    product: history[index]._id,
                                    user: history[index].user
                                }
                            });

                            let targetIndex = user.pending.indexOf(history[index]._id)

                            if (targetIndex > -1) {
                                const newData = JSON.parse(JSON.stringify(user))

                                // Update Status
                                newData.history[targetIndex].status = "Processed"

                                // Update Store
                                await set("user", newData, store)

                                // Update State
                                dispatch({ type: "createUserData", payload: newData })
                            }

                            // Update Pending
                            dispatch({ type: "remove4rmPending", payload: history[index]._id })

                        } catch (error) {
                            console.log(error);
                        }
                    }}>Close Ticket</button>
                </div>
            </div>
            <div className="hMid">
                <p className="text-capitalize">Items:  </p>
                <div className="d-flex flex-wrap justify-content-between">
                    {
                        history[index]["cart"].map((item, index1) => {
                            return (<div key={"cct" + index1} className="prCard card mb-3 ps-2" style={{ "maxWidth": "540px" }}>
                                <div className="row g-0 justify-content-between">
                                    <div className="col-md-5 my-auto">
                                        <img src={domain + "image/" + item.image} className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p className="card-text"><small className="text-muted">Brand: {item.brand}</small></p>
                                            <p className="card-text"><small className="text-muted">Sex: {item.sex}</small></p>
                                            <p className="card-text">
                                                <small className="text-muted">
                                                    Colour:  <span className="form-check-input ms-2 mt-0 rounded-circle d-inline-block" style={{ backgroundColor: item.color, width: "20px", height: "20px" }}></span>
                                                </small>
                                            </p>
                                            <p className="card-text"><small className="text-muted">Quantity: {item.quantity}</small></p>
                                            <p className="card-text"><small className="text-muted">Price: {item.price}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        </Fragment>

    );
}