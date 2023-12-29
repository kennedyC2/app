import { Routes, Route } from "react-router-dom";
import "./assets/css/app.css";
import Carousel from 'bootstrap/js/dist/carousel';
import Container, { store } from "./components/main";
import Home from "./components/home";
import Cart from "./components/cart";
import Wishlist from "./components/wishlist";
import Product from "./components/product";
import Admin from "./components/admin/main";
import User from "./components/user/main";
import Brooches from "./components/user/components/brooches";
import Scrubs from "./components/user/components/scrubs";
import CardHolders from "./components/user/components/cardHolder";
import Coats from "./components/user/components/coats";
import PenTorch from "./components/user/components/penTorch";
import ScrubCaps from "./components/user/components/scrubCaps";
import Crocs from "./components/user/components/crocs";
import Sneakers from "./components/user/components/sneakers";
import Shirts from "./components/user/components/tShirt";
import Search from "./components/user/components/search";
import AdminBrooches from "./components/admin/component/brooches";
import AdminCardHolder from "./components/admin/component/cardHolder";
import AdminCoats from "./components/admin/component/coats";
import AdminCrocs from "./components/admin/component/crocs";
import AdminTorch from "./components/admin/component/penTorch";
import AdminCaps from "./components/admin/component/scrubCaps";
import AdminScrubs from "./components/admin/component/scrubs";
import AdminSneakers from "./components/admin/component/sneakers";
import AdminShirts from "./components/admin/component/tShirt";
import Login from "./components/login";
import SignUp from "./components/SignUp";
import Verify from "./components/verify";
import Profile from "./components/profile";
import axios from "axios";
import { domain } from "./components/helpers";
import { get, set } from "idb-keyval";
import { useCallback } from "react";
import AdminTrends from "./components/admin/component/trending";
import AdminNewArrivals from "./components/admin/component/newArrival";

const App = () => {
    const FetchAppData = useCallback(async (dispatch) => {
        let { data } = await axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
            url: domain + "app/data",
            params: {}
        })

        return dispatch({ type: "createData", payload: data })
    }, [])

    const FetchPendingOrders = useCallback(async (dispatch) => {
        const file = await get("pending", store)

        if (file && file.data.length > 0 && file.expiry > Date.now()) {
            return dispatch({ type: "createPendingOrders", payload: file.data })
        }

        let { data } = await axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
            url: domain + "cart/pending",
            params: {}
        })

        // Save
        set("pending", {
            data: data,
            expiry: Date.now() + (1000 * 60 * 60 * 2)
        }, store)

        return dispatch({ type: "createPendingOrders", payload: data })
    }, [])

    const FetchCompletedOrders = useCallback(async (dispatch) => {
        const file = await get("completed", store)

        if (file && file.data.length > 0 && file.expiry > Date.now()) {
            return dispatch({ type: "createCompletedOrders", payload: file.data })
        }

        let { data } = await axios({
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
            url: domain + "cart/settled",
            params: {}
        })

        // Save
        set("completed", {
            data: data,
            expiry: Date.now() + (1000 * 60 * 60 * 2)
        }, store)

        return dispatch({ type: "createCompletedOrders", payload: data })
    }, [])

    const CreateUserData = useCallback(async (dispatch, store) => {
        // Initialize User Data
        const InitialState = {
            firstname: "",
            lastname: "",
            email: "",
            delivery: "imo",
            verified: false,
            active: false,
            admin: false,
            cart: [],
            wishlist: [],
            history: [],
            cards: []
        };

        // Load User Data
        let data = await get("user", store)

        if (data !== null && data !== undefined) {
            return await dispatch({ type: "createUserData", payload: data })
        }

        return await dispatch({ type: "createUserData", payload: InitialState })
    }, [])

    const CreateCart = useCallback(async (dispatch, store) => {
        // Initialize User Data
        const InitialState = {
            id: [],
            data: [],
            expiry: Date.now()
        };

        // Load User Data
        let data = await get("cart", store)

        if (data !== null && data !== undefined) {
            if (Date.now() - data.expiry > 1000 * 60 * 60 * 6) {
                await set("cart", InitialState, store)
                return dispatch({ type: "createCart", payload: InitialState })
            }

            return dispatch({ type: "createCart", payload: data })
        }

        await set("cart", InitialState, store)
        return dispatch({ type: "createCart", payload: InitialState })
    }, [])

    const CreateWishlist = useCallback(async (dispatch, store) => {
        // Initialize User Data
        const InitialState = {
            id: [],
            data: [],
            expiry: Date.now()
        };

        // Load User Data
        let data = await get("wishlist", store)

        if (data !== null && data !== undefined) {
            if (Date.now() - data.expiry > 1000 * 60 * 60 * 6) {
                await set("wishlist", InitialState, store)
                return dispatch({ type: "createWishlist", payload: InitialState })
            }

            return dispatch({ type: "createWishlist", payload: data })
        }

        await set("wishlist", InitialState, store)
        return dispatch({ type: "createWishlist", payload: InitialState })
    }, [])

    const UpdateStatus = useCallback(async (dispatch, store) => {
        // Initialize User Data
        const InitialState = {
            active: false,
            session: 0
        };

        // Load User Data
        let data = await get("status", store)

        if (data !== null && data !== undefined) {
            return dispatch({ type: "createStatus", payload: data })
        }

        return dispatch({ type: "createStatus", payload: InitialState })
    }, [])

    const FetchData = useCallback(async (collection, category, dispatch, type, TH) => {
        if (TH) {
            const file = await get(collection, store)

            if (file && file.data.length > 0 && file.expiry > Date.now()) {
                return await dispatch({ type: type, payload: file.data });
            }

            const { data } = collection === "trending" ? await axios.get(domain + "products/trending/get?i=marky&a=true&c=" + collection) : await axios.get(domain + "products/newArrivals/get?i=marky&a=true&c=" + collection);

            // Save
            set(collection, {
                data: data,
                expiry: Date.now() + (1000 * 60 * 60 * 6)
            }, store)

            return await dispatch({ type: type, payload: data });
        } else {
            const file = await get(category, store)

            if (file && file.data.length > 0 && file.expiry > Date.now()) {
                return await dispatch({ type: type, payload: file.data });
            }

            const { data } = await axios.get(domain + "products/get?i=marky&a=true&c=" + collection + "&q=" + category);

            // Save
            set(category, {
                data: data,
                expiry: Date.now() + (1000 * 60 * 60 * 6)
            }, store)

            return await dispatch({ type: type, payload: data });
        }
    }, []);

    const Populate = useCallback((elem) => {
        let items = document.querySelectorAll("#" + elem + " .carousel-item");
        let items_child = document.querySelectorAll("#" + elem + " .carousel-item .grid");
        items_child.forEach(element => {
            if (element.childNodes.length > 1) {
                for (var i = 0; i < 4; i++) {
                    element.removeChild(element.lastChild)
                }
            }
        });

        items.forEach((el) => {
            const minPerSlide = 5;
            let next = el.nextElementSibling;
            for (var i = 1; i < minPerSlide; i++) {
                if (!next) {
                    // wrap carousel by using first child
                    next = items[0];
                }
                let cloneChild = next.firstChild.cloneNode(true);
                el.firstChild.appendChild(cloneChild.children[0]);
                next = next.nextElementSibling;
            }
        });

        // setTimeout(() => {
        //     new Carousel(document.querySelector('#trending'), {
        //         ride: "carousel",
        //     })

        //     new Carousel(document.querySelector('#newArrival'), {
        //         ride: "carousel"
        //     })
        // }, 5000);


    }, []);

    return (
        <div className="ext_cnt w-100 min-vh-100">
            <div id="notifA" className="notifA">
                <p className="bg-danger text-white"></p>
            </div>
            <div id="notifB" className="notifB">
                <p className="bg-primary text-white"></p>
            </div>
            <Routes>
                <Route path="/" element={<Container CreateCart={CreateCart} CreateWishlist={CreateWishlist} />}>
                    <Route path="/" exact element={<Home FetchData={FetchData} CreateCart={CreateCart} CreateWishlist={CreateWishlist} Populate={Populate} />} />
                    <Route path="/cart" exact element={<Cart FetchAppData={FetchAppData} CreateUserData={CreateUserData} CreateCart={CreateCart} />} />
                    <Route path="/wishlist" exact element={<Wishlist CreateCart={CreateCart} CreateWishlist={CreateWishlist} />} />
                    <Route path="/profile" exact element={<Profile CreateUserData={CreateUserData} CreateCart={CreateCart} CreateWishlist={CreateWishlist} />} />
                    <Route path="/product/:collection/:index/:id" exact element={<Product FetchAppData={FetchAppData} CreateUserData={CreateUserData} CreateCart={CreateCart} />} />
                    <Route path="/products/search/:query" exact element={<Search />} />
                    <Route path="/category" element={<User FetchAppData={FetchAppData} FetchCompletedOrders={FetchCompletedOrders} FetchPendingOrders={FetchPendingOrders} CreateCart={CreateCart} CreateUserData={CreateUserData} CreateWishlist={CreateWishlist} UpdateStatus={UpdateStatus} />}>
                        <Route path="/category/scrubs" exact element={<Scrubs FetchData={FetchData} />} />
                        <Route path="/category/brooches" exact element={<Brooches FetchData={FetchData} />} />
                        <Route path="/category/cardHolders" exact element={<CardHolders FetchData={FetchData} />} />
                        <Route path="/category/coats" exact element={<Coats FetchData={FetchData} />} />
                        <Route path="/category/crocs" exact element={<Crocs FetchData={FetchData} />} />
                        <Route path="/category/penTorch" exact element={<PenTorch FetchData={FetchData} />} />
                        <Route path="/category/scrubCaps" exact element={<ScrubCaps FetchData={FetchData} />} />
                        <Route path="/category/sneakers" exact element={<Sneakers FetchData={FetchData} />} />
                        <Route path="/category/shirts" exact element={<Shirts FetchData={FetchData} />} />
                    </Route>
                </Route>
                <Route path="/admin" exact element={<Admin FetchPendingOrders={FetchPendingOrders} FetchCompletedOrders={FetchCompletedOrders} CreateUserData={CreateUserData} UpdateStatus={UpdateStatus} />}>
                    <Route path="/admin/product/scrubs" exact element={<AdminScrubs FetchData={FetchData} />} />
                    <Route path="/admin/product/brooches" exact element={<AdminBrooches FetchData={FetchData} />} />
                    <Route path="/admin/product/cardHolders" exact element={<AdminCardHolder FetchData={FetchData} />} />
                    <Route path="/admin/product/coats" exact element={<AdminCoats FetchData={FetchData} />} />
                    <Route path="/admin/product/crocs" exact element={<AdminCrocs FetchData={FetchData} />} />
                    <Route path="/admin/product/penTorch" exact element={<AdminTorch FetchData={FetchData} />} />
                    <Route path="/admin/product/scrubCaps" exact element={<AdminCaps FetchData={FetchData} />} />
                    <Route path="/admin/product/sneakers" exact element={<AdminSneakers FetchData={FetchData} />} />
                    <Route path="/admin/product/shirts" exact element={<AdminShirts FetchData={FetchData} />} />
                    <Route path="/admin/product/trending" exact element={<AdminTrends FetchData={FetchData} />} />
                    <Route path="/admin/product/newArrivals" exact element={<AdminNewArrivals FetchData={FetchData} />} />
                </Route>
                <Route path="/account/login" exact element={<Login />} />
                <Route path="/account/create" exact element={<SignUp FetchAppData={FetchAppData} />} />
                <Route path="/account/verification" exact element={<Verify CreateUserData={CreateUserData} />} />
            </Routes>
        </div>
    );
};

export default App;
