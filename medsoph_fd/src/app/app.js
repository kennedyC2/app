//  Import libraries
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Left from "./left/main";
import Spinner from "./Misc/spinner";
import Right from "./right/right";
import { store } from "./Misc/cacheStorage";
import { get } from "idb-keyval";

// App
const App = () => {
    const navigate = useNavigate;
    const Dispatch = useDispatch();
    const [spin, setSpin] = useState(0);
    const { personal, company } = useSelector((state) => state);

    // Confirm log In status
    const [status] = useState(() => {
        return (
            JSON.parse(localStorage.getItem("status")) || {
                loggedIn: false,
                session: false,
            }
        );
    });

    useEffect(() => {
        const session = setInterval(async () => {
            if (status.session - Date.now() > 0 && status.session - Date.now() < 1000 * 60 * 5) {
                const session = 1000 * 60 * 30
                localStorage.setItem("status", JSON.stringify({
                    loggedIn: true,
                    session: session,
                }))

                status.session = session
            }

            if (status.session < Date.now()) {
                navigate("/login", { replace: true });
            }

        }, 1000 * 60);

        return () => {
            clearInterval(session);
        };
    });

    useEffect(() => {
        (async () => {
            // Populate personal
            const _data = await get("personal", store)

            // Populate company
            const _data2 = await get("company", store)

            if (personal.fetched === false) {
                return Dispatch({ type: "personal", payload: _data });
            }

            if (company.fetched === false) {
                return Dispatch({ type: "company", payload: _data2 });
            }

            // return
        })()

    })

    return status.loggedIn === true ? (
        personal.fetched === true && company.fetched === true && spin === 0 ? (
            <Fragment>
                <Left setSpin={setSpin} />
                <Right setSpin={setSpin} />
            </Fragment>
        ) : (
            <Spinner />
        )
    ) : (
        navigate("/login", { replace: true })
    );
};

export default App;
