import { Fragment, useEffect } from "react";
import AdminList from "./component/list";
import PendingOrders from "./component/pending"
import { useDispatch, useSelector } from "react-redux";
import { store } from "../main";
import { Link, useNavigate } from "react-router-dom";
import SettledList from "./component/settled";

const Admin = ({ FetchPendingOrders, FetchCompletedOrders, CreateUserData, UpdateStatus }) => {
    const { user, status, pending, completed } = useSelector(state => state)
    const Dispatch = useDispatch()
    const Navigate = useNavigate()
    useEffect(() => {
        // Variables
        const dashboard = document.getElementById("dashboard");
        const menuTab = document.querySelector("ul#myTab");
        const _menuTab = document.querySelector("div#myTabContent");
        const menuTabs = document.querySelectorAll("ul#myTab li");
        let tabs_width = 0;

        if (dashboard) {
            menuTabs.forEach((element) => {
                tabs_width += element.clientWidth;
            });

            const padding = ((menuTab.clientWidth - _menuTab.clientWidth) / 2) + (_menuTab.clientWidth - tabs_width);

            // Centralize menu
            menuTab.setAttribute("style", "padding-left:" + padding + "px");
        }
    });

    useEffect(() => {
        // Load User Data
        if (user && Object.keys(user).length === 0) {
            CreateUserData(Dispatch, store)
        }

        // Load User Status
        if (user && Object.keys(status).length === 0) {
            UpdateStatus(Dispatch, store)
        }

        // Load Admin Pending Orders
        if (user && pending.data.length === 0) {
            FetchPendingOrders(Dispatch)
        }

        // Load Admin Pending Orders
        if (user && completed.data.length === 0) {
            FetchCompletedOrders(Dispatch)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Validate User
    useEffect(() => {
        if (Object.keys(user).length > 0 && Object.keys(status).length > 0) {
            if (!user.admin || !status.active) {
                // Navigate
                Navigate("/", { replace: true })
            }
        }
    })

    return (
        <Fragment>
            <div className="ext_cnt min-vh-100 d-none d-lg-block" id="dashboard">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="products-tab" data-bs-toggle="tab" data-bs-target="#products-tab-pane" type="button" role="tab" aria-controls="products-tab-pane" aria-selected="false">
                            Products
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pending-tab" data-bs-toggle="tab" data-bs-target="#pending-tab-pane" type="button" role="tab" aria-controls="pending-tab-pane" aria-selected="false">
                            Pending Orders
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="settled-tab" data-bs-toggle="tab" data-bs-target="#settled-tab-pane" type="button" role="tab" aria-controls="settled-tab-pane" aria-selected="false">
                            Processed Orders
                        </button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    {/* Product list */}
                    <div className="tab-pane fade show active" id="products-tab-pane" role="tabpanel" aria-labelledby="products-tab" tabIndex="0">
                        <AdminList />
                    </div>

                    <div className="tab-pane fade" id="pending-tab-pane" role="tabpanel" aria-labelledby="pending-tab" tabIndex="0">
                        <PendingOrders />
                    </div>

                    <div className="tab-pane fade" id="settled-tab-pane" role="tabpanel" aria-labelledby="settled-tab" tabIndex="0">
                        <SettledList />
                    </div>
                </div>
            </div>

            <div className="empty d-flex justify-center-center align-items-center vh-50 d-lg-none" style={{ height: "80vh" }}>
                <div className="px-3">
                    <p className="text-center py-2" style={{ color: "#adc0cf", fontSize: "1.3rem" }}>&nbsp;  Please Visit This Page On A Desktop &nbsp;</p>
                    <Link to="/" className="btn btn-md btn-primary w-100 py-2">
                        RETURN TO HOMEPAGE
                    </Link>
                </div>
            </div>
        </Fragment>
    );
};

export default Admin;
