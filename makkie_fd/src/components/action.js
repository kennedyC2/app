import axios from "axios";
import { domain } from "./helpers";
import { get, set } from "idb-keyval";

export const FetchAppData = async (dispatch) => {
    let { data } = await axios({
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
        url: domain + "app/data",
        params: {}
    })

    return dispatch({ type: "createData", payload: data })
}

export const FetchPendingOrders = async (dispatch) => {
    let { data } = await axios({
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
        url: domain + "cart/pending",
        params: {}
    })

    return dispatch({ type: "createPendingOrders", payload: data })
}

export const FetchCompletedOrders = async (dispatch) => {
    let { data } = await axios({
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
        url: domain + "cart/settled",
        params: {}
    })

    return dispatch({ type: "createCompletedOrders", payload: data })
}

export const CreateUserData = async (dispatch, store) => {
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
}

export const CreateCart = async (dispatch, store) => {
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
}

export const CreateWishlist = async (dispatch, store) => {
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
}

export const UpdateStatus = async (dispatch, store) => {
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
}