import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { domain } from "./helpers";
import { set } from "idb-keyval";
import { store } from "./main";

const Wishlist = ({ CreateCart, CreateWishlist }) => {
    const Dispatch = useDispatch()
    const { cart, wishlist } = useSelector(state => state)

    useEffect(() => {
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

    return (
        <div className="wishlist body m-auto pt-0">
            <div className="container w_1200">
                <div>
                    <p className="mt-3 mb-3 px-1 heading">My Wish List</p>
                </div>
                <div className="mt-3">
                    <div className="d-none d-lg-flex w-100 justify-content-between border border-1 rounded py-2 pe-2 text-uppercase">
                        <div className="ps-5 my-auto" style={{ width: "41.5%" }}>Product</div>
                        <div className="m-auto text-center ps-4" style={{ width: "26.5%" }}>PRICE</div>
                        <div className="m-auto text-center" style={{ width: "27.5%" }}>QTY</div>
                        <div className=" m-auto text-end" style={{ width: "32.5%" }}></div>
                    </div>
                    <ul className="wp_list">
                        {
                            wishlist && wishlist.data && wishlist.data.length > 0 ? (
                                <Fragment>
                                    {wishlist.data.map((item, index) => {
                                        return (
                                            <li key={index} className="pe-3 my-2">
                                                <div className="d-flex justify-content-between w-100 h-100 py-3">
                                                    <div className="col-5 col-md-4 col-lg-2 px-2">
                                                        <img src={domain + "image/" + item.images.main} className="d-block w-100 h-100" alt="..." />
                                                    </div>
                                                    <div className="col-6 col-lg-9 ps-2 d-flex">
                                                        <div className="col-lg-4">
                                                            <p className="px-2 py-1 m-auto">{item.title}</p>
                                                            <p className="px-2 py-1 m-auto">Brand: {item.brand}</p>
                                                            <p className="px-2 py-1 m-auto">Color: {item.dColor}</p>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <p className="px-2 py-1 m-auto">&#x20A6; {new Intl.NumberFormat("en-US", {}).format(item.price)}</p>
                                                        </div>
                                                        <div className="d-none d-lg-block col-lg-2">
                                                            <div className="input-group m-auto py-1">
                                                                <span className="input-group-text" id="minus" onClick={e => {
                                                                    return Dispatch({ type: "decreaseWQuantity", payload: index })
                                                                }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                                                    </svg>
                                                                </span>
                                                                <input type="number" className="form-control inc text-center" placeholder="1" aria-label="Username" aria-describedby="basic-addon1" value={item.order.quantity} readOnly />
                                                                <span className="input-group-text" id="plus" onClick={e => {
                                                                    return Dispatch({ type: "increaseWQuantity", payload: index })
                                                                }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-2 py-1">
                                                            <button type="button" className="btn btn-md py-2 px-3" onClick={async e => {
                                                                // Update Store
                                                                await set("cart", {
                                                                    id: [...cart.id, item._id],
                                                                    data: [...cart.data, item],
                                                                    expiry: cart.expiry
                                                                }, store)

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
                                                                Dispatch({ type: "addToCart", payload: item })

                                                                Dispatch({ type: "remove4rmWishlist", payload: item })
                                                            }}>
                                                                ADD TO CART
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="col-1 col-lg-1 text-end">
                                                        <button type="button" className="btn-close text-reset" onClick={async e => {
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
                                                            Dispatch({ type: "remove4rmWishlist", payload: item })
                                                        }}></button>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </Fragment>
                            ) : (
                                <div className="empty">
                                    <p>------- &nbsp;  Empty &nbsp; -------</p>
                                </div>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
