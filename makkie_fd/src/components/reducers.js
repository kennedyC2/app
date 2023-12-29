// Reducers
const scrubs = (state = { data: [], fetched: false }, action) => {
    // ============================
    switch (action.type) {
        case "createScrubs":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        case "addScrub":
            return {
                ...state,
                data: [...state.data, ...action.payload],
                fetched: true
            }

        case "updateScrub":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        case "deleteScrub":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        default:
            return state;
    }
};

const coats = (state = { data: [], fetched: false }, action) => {
    // ============================
    switch (action.type) {
        case "createCoats":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        case "addCoat":
            return {
                ...state,
                data: [...state.data, ...action.payload],
                fetched: true
            }

        case "updateCoat":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        case "deleteCoat":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        default:
            return state;
    }
};

const crocs = (state = { data: [], fetched: false }, action) => {
    // ============================
    switch (action.type) {
        case "createCrocs":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        case "addCroc":
            return {
                ...state,
                data: [...state.data, ...action.payload],
                fetched: true
            }

        case "updateCroc":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        case "deleteCroc":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        default:
            return state;
    }
};

const sneakers = (state = { data: [], fetched: false }, action) => {
    // ============================
    switch (action.type) {
        case "createSneakers":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        case "addSneaker":
            return {
                ...state,
                data: [...state.data, ...action.payload],
                fetched: true
            }

        case "updateSneaker":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        case "deleteSneaker":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        default:
            return state;
    }
};

const penTorch = (state = { data: [], fetched: false }, action) => {
    // ============================
    switch (action.type) {
        case "createTorch":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        case "addTorch":
            return {
                ...state,
                data: [...state.data, ...action.payload],
                fetched: true
            }

        case "updateTorch":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        case "deleteTorch":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        default:
            return state;
    }
};

const scrubCaps = (state = { data: [], fetched: false }, action) => {
    // ============================
    switch (action.type) {
        case "createCaps":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        case "addCap":
            return {
                ...state,
                data: [...state.data, ...action.payload],
                fetched: true
            }

        case "updateCap":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        case "deleteCap":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        default:
            return state;
    }
};

const brooches = (state = { data: [], fetched: false }, action) => {
    // ============================
    switch (action.type) {
        case "createBrooches":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        case "addBrooch":
            return {
                ...state,
                data: [...state.data, ...action.payload],
                fetched: true
            }

        case "updateBrooch":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        case "deleteBrooch":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        default:
            return state;
    }
};

const cardHolders = (state = { data: [], fetched: false }, action) => {
    // ============================
    switch (action.type) {
        case "createCardHolders":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        case "addCardHolder":
            return {
                ...state,
                data: [...state.data, ...action.payload],
                fetched: true
            }

        case "updateCardHolder":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        case "deleteCardHolder":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        default:
            return state;
    }
};

const shirts = (state = { data: [], fetched: false }, action) => {
    // ============================
    switch (action.type) {
        case "createShirts":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        case "addShirt":
            return {
                ...state,
                data: [...state.data, ...action.payload],
                fetched: true
            }

        case "updateShirt":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        case "deleteShirt":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        default:
            return state;
    }
};

const home = (state = {}, action) => {
    // ============================
    switch (action.type) {
        case "createHome":
            return { ...state, ...action.payload };

        case "add":
            return { ...state, ...action.payload.data };

        case "update":
            return { ...state, ...(state[action.payload.id] = action.payload.data) };

        case "delete":
            delete state[action.payload.id];
            return { ...state };

        default:
            return state;
    }
};

const appData = (state = {}, action) => {
    // ============================
    switch (action.type) {
        case "createData":
            return { ...state, ...action.payload };

        case "add":
            return { ...state, ...action.payload.data };

        case "updateData":
            return { ...state, ...state["appData"]["brand"] = new Set(state["appData"]["brand"]).add(action.payload) };

        case "delete":
            delete state[action.payload.id];
            return { ...state };

        default:
            return state;
    }
};

const user = (state = {}, action) => {
    // ============================
    switch (action.type) {
        case "createUserData":
            return { ...state, ...action.payload };

        case "delivery":
            return { ...state, delivery: action.payload };

        case "verify":
            return { ...state, verified: action.payload };

        case "pending":
            return { ...state, pending: [...state.pending, action.payload] };

        case "history":
            return { ...state, pending: [...state.history, action.payload] };

        case "settled":
            return { ...state, settled: [...state.settled, action.payload] };

        case "delete":
            delete state[action.payload.id];
            return { ...state };

        default:
            return state;
    }
};

const cart = (state = {}, action) => {
    // ============================
    switch (action.type) {
        case "createCart":
            return { ...state, ...action.payload };

        case "addToCart":
            return { ...state, id: [...state.id, action.payload._id], data: [...state.data, action.payload] };

        case "remove4rmCart":
            return {
                ...state,
                id: state.id.filter((each) => {
                    return each !== action.payload["_id"]
                }),
                data: state.data.filter((each) => {
                    return each["_id"] !== action.payload["_id"]
                })
            };

        case "increaseCQuantity":
            let ideal = JSON.parse(JSON.stringify(state.data))
            ideal[action.payload]["order"]["quantity"] += 1
            return { ...state, data: [...ideal] };

        case "decreaseCQuantity":
            let cdeal = JSON.parse(JSON.stringify(state.data))
            cdeal[action.payload]["order"]["quantity"] -= 1
            return { ...state, data: [...cdeal] };

        case "updateSize":
            return { ...state, data: action.payload }

        case "updateColor":
            return { ...state, data: action.payload }

        case "deleteCart":
            return {
                ...state,
                id: [],
                data: []
            };

        default:
            return state;
    }
};

const wishlist = (state = {}, action) => {
    // ============================
    switch (action.type) {
        case "createWishlist":
            return { ...state, ...action.payload };

        case "addToWishlist":
            return { ...state, id: [...state.id, action.payload._id], data: [...state.data, action.payload] };

        case "remove4rmWishlist":
            return {
                ...state,
                id: state.id.filter((each) => {
                    return each !== action.payload["_id"]
                }),
                data: state.data.filter((each) => {
                    return each["_id"] !== action.payload["_id"]
                })
            };

        case "increaseWQuantity":
            let ideal = [...state.data]
            ideal[action.payload]["order"]["quantity"] += 1
            return { ...state, data: [...ideal] };

        case "decreaseWQuantity":
            let cdeal = [...state.data]
            cdeal[action.payload]["order"]["quantity"] -= 1
            return { ...state, data: [...cdeal] };

        default:
            return state;
    }
};

const status = (state = {}, action) => {
    // ============================
    switch (action.type) {
        case "createStatus":
            return { ...state, ...action.payload };

        case "active":
            return { ...state, active: action.payload };

        case "session":
            return { ...state, session: action.payload };

        default:
            return state;
    }
};

const search = (state = { data: [], fetched: false }, action) => {
    // ============================
    switch (action.type) {
        case "createSearchData":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            }

        default:
            return state;
    }
};

const pending = (state = { data: [], fetched: false }, action) => {
    // ============================
    switch (action.type) {
        case "createPendingOrders":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            };

        case "addToPending":
            return {
                ...state,
                data: [...state.data, ...action.payload],
                fetched: true
            }

        case "remove4rmPending":
            return {
                ...state,
                data: state.data.filter((item) => {
                    return item._id !== action.payload["_id"]
                }),
                fetched: true
            }

        default:
            return state;
    }
};

const trending = (state = { id: [], data: [], fetched: false }, action) => {
    // ============================
    switch (action.type) {
        case "createTrending":
            return {
                ...state,
                id: action.payload.map(each => {
                    return each["_id"]
                }),
                data: [...action.payload],
                fetched: true
            }

        case "addToTrending":
            return {
                ...state,
                id: [...state.id, ...action.payload["_id"]],
                data: [...state.data, action.payload],
                fetched: true
            }

        case "remove4rmTrending":
            return {
                ...state,
                id: state["id"].filter(item => {
                    return item !== action.payload["_id"]
                }),
                data: state["data"].filter((item) => {
                    return item._id !== action.payload["_id"]
                }),
                fetched: true
            }

        default:
            return state;
    }
};

const newArrivals = (state = { id: [], data: [], fetched: false }, action) => {
    // ============================
    switch (action.type) {
        case "createNewArrivals":
            return {
                ...state,
                id: action.payload.map(each => {
                    return each["_id"]
                }),
                data: [...action.payload],
                fetched: true
            }

        case "addToNewArrivals":
            return {
                ...state,
                id: [...state.id, ...action.payload["_id"]],
                data: [...state.data, action.payload],
                fetched: true
            }

        case "remove4rmNewArrivals":
            return {
                ...state,
                id: state["id"].filter(item => {
                    return item !== action.payload["_id"]
                }),
                data: state["data"].filter((item) => {
                    return item._id !== action.payload["_id"]
                }),
                fetched: true
            }

        default:
            return state;
    }
};

const completed = (state = { data: [], fetched: false }, action) => {
    // ============================
    switch (action.type) {
        case "createCompletedOrders":
            return {
                ...state,
                data: [...action.payload],
                fetched: true
            };

        default:
            return state;
    }
};

// Combine Reducers
const rootReducer = {
    coats,
    scrubs,
    crocs,
    sneakers,
    penTorch,
    scrubCaps,
    brooches,
    cardHolders,
    shirts,
    home,
    user,
    appData,
    cart,
    wishlist,
    status,
    search,
    pending,
    completed,
    trending,
    newArrivals
};

export default rootReducer;
