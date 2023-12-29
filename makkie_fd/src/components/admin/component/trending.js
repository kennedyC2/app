import axios from "axios";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { domain } from "../../helpers";
import { Admin_DSP_TN } from "../../dsp";
import { Spinner2 } from "../../misc";

const AdminTrends = ({ FetchData }) => {
    const { data, fetched } = useSelector((state) => state["trending"]);
    const Dispatch = useDispatch();

    const deleteTN = async (e, item, trend) => {
        e.preventDefault();

        // Hide
        e.target.classList.add("d-none")
        e.target.nextSibling.classList.remove("d-none")

        try {
            await axios({
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                url: trend ? domain + "products/trending/delete?t=" + item._id + "&c=trending" : domain + "products/newArrivals/delete?t=" + item._id + "&c=newArrivals",
                data: item
            });

            // Notification
            const notification = document.getElementById("notifB")
            notification.firstChild.innerHTML = "SUCCESS"
            notification.classList.add("showNotif")

            setTimeout(() => {
                // Show
                e.target.nextSibling.classList.add("d-none")
                e.target.classList.remove("d-none")

                // Close Notification
                notification.classList.remove("showNotif")
                // Update
                Dispatch({ type: trend ? "remove4rmTrending" : "remove4rmNewArrivals", payload: item })

            }, 1000);
        } catch (error) {
            // Show
            e.target.nextSibling.classList.add("d-none")
            e.target.classList.remove("d-none")

            // Continue
            const { data } = error.response

            // Notification
            const notification = document.getElementById("notifA")
            notification.firstChild.innerHTML = data.message
            notification.classList.add("showNotif")

            setTimeout(() => {
                // Close Notification
                notification.classList.remove("showNotif")
            }, 1000);
        }
    };

    useEffect(() => {
        if (fetched === false) {
            FetchData("trending", null, Dispatch, "createTrending", "TH")
        }

        return
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            {fetched ? (
                data && data.length > 0 ?
                    <div className="w-100 grid">
                        {
                            data.map((item, index) => {
                                return (
                                    Admin_DSP_TN(domain, index, item, deleteTN, true)
                                )
                            })
                        }
                    </div>
                    :
                    <Fragment>
                        <div className="empty">
                            <p>------- &nbsp;  no data &nbsp; -------</p>
                        </div>
                    </Fragment>

            ) : (
                <Spinner2 />
            )}
        </Fragment>
    );
};

export default AdminTrends;
