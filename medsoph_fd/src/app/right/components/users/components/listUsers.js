// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { domain } from "../../../../Misc/helper";
import axios from "axios";
import { set } from "idb-keyval";
import { store } from "../../../../Misc/cacheStorage";
import { Notification_B } from "../../../../Misc/notification";

// Component
const ListUsers = (props) => {
    const { data } = props;
    const { personal } = useSelector(state => state)
    const Dispatch = useDispatch();

    // Click the submit button
    const submitForm = async (position, email) => {
        //  Send
        try {
            const response = await axios({
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                url: domain + "laboratory/users/delete",
                data: {
                    position: position.toString(),
                    email: email,
                    type: personal.company.type,
                    companyID: personal.company.cid
                },
            });

            // Update Services
            await set("company", response.data, store);

            // Update State
            Dispatch({ type: "company", payload: response.data });
        } catch (error) {
            // Notify
            Notification_B(error.response.data.message, false);
        }
    };

    return (
        <div className="tab-pane s_sel fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            {data.length > 0 ? (
                <div className="d-flex s_sed align-items-start mt-3 justify-content-between">
                    <div className="rg_f py-3 px-2">
                        <div style={{ width: "100%", overflowY: "auto", height: "95%" }}>
                            <div className="nav nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                {data.map((key, index) => (
                                    <div key={index} className={`nav-link text-capitalize mb-1 d-flex ${index === 0 ? "active" : ""}`} id={`v-pills-${index}-services-tab`} data-bs-toggle="tab" data-bs-target={`#v-pills-${index}-services`} type="button" role="tab" aria-controls={`v-pills-${index}-services`} aria-selected="true">
                                        <div className="me-3 ms-2 d-none d-lg-block">
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1.15em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 448 512">
                                                <path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
                                            </svg>
                                        </div>
                                        <div className="d-lg-none" style={{ paddingTop: "4px", fontSize: "15px" }}>
                                            {key.firstname}
                                        </div>
                                        <div className="d-none d-lg-block text-uppercase" style={{ paddingTop: "3px", fontSize: "15px", width: "85%" }}>
                                            {key.lastname}&nbsp;&nbsp;{key.firstname}&nbsp;&nbsp;{key.other}
                                        </div>
                                        <div style={{ paddingTop: "2px", fontSize: "15px" }} onClick={(e) => submitForm(index, key.email)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z" /></svg>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* tab 2 */}
                    <div className="rg_f py-3">
                        <div className="tab-content py-2 px-2" id="v-pills-tabContent" style={{ width: "100%", overflowY: "auto", height: "100%", fontSize: "13.5px" }}>
                            {data.map((key, index) => (
                                <div key={index} className={`tab-pane fade show ${index === 0 ? "active" : ""}`} id={`v-pills-${index}-services`} role="tabpanel" aria-labelledby={`v-pills-${index}-services-tab`}>
                                    <p className="text-capitalize">
                                        Name: &nbsp;{key.firstname}&nbsp;&nbsp;{key.lastname}&nbsp;&nbsp;{key.other}
                                    </p>
                                    <p>Phone: &nbsp;{key.phone}</p>
                                    <p className="text-capitalize">Sex: &nbsp;{key.sex}</p>
                                    <p className="text-capitalize">
                                        Birthday: &nbsp;{key.month} {key.day}
                                    </p>
                                    <p className="text-capitalize">Account Type: &nbsp;{key.account.replaceAll("_", " ")}</p>
                                    <div>
                                        <p className="text-capitalize">Recent Activities:</p>
                                        {key["recent"].length > 0 ? (
                                            <ul className="list-group list-group-flush">
                                                {key["recent"].map((item, index) => (
                                                    <li key={index} className="list-group-item d-flex pt-1 pb-3 px-0">
                                                        <div className="pt-1">
                                                            <div className="extend rounded-circle">
                                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48">
                                                                    <g fill="#95aac9" fillRule="evenodd" clipRule="evenodd">
                                                                        <path d="M6.818 12.864A1.157 1.157 0 0 0 8.455 14.5l.818-.819l4.09 4.09l-3.272 3.274a1.157 1.157 0 1 0 1.636 1.636l1.636-1.636l2.076 2.076a10.079 10.079 0 0 1 2.781-.047l-3.443-3.443l5.354-5.354L31.9 26.047l-5.076 5.076a10.058 10.058 0 0 1 .055 3.438l.394.394a5.787 5.787 0 0 0 6.205 1.296l1.158 1.159a2.313 2.313 0 0 0 2.236.599l2.673 2.673a1.157 1.157 0 1 0 1.637-1.637l-2.674-2.673a2.313 2.313 0 0 0-.6-2.235l-1.158-1.159a5.787 5.787 0 0 0-1.295-6.205l-13.91-13.91l1.637-1.637a1.157 1.157 0 0 0-1.637-1.636l-3.272 3.273l-4.09-4.09l.817-.818a1.157 1.157 0 1 0-1.636-1.637l-6.546 6.546Zm25.93 21.524l2.14-2.14a3.787 3.787 0 0 0-.848-4.06l-.504-.505l-5.353 5.354l.504.504a3.786 3.786 0 0 0 4.061.847Zm3.302 1.607l-.824-.824a5.932 5.932 0 0 0 .445-.444l.824.824a.314.314 0 1 1-.445.444ZM16.86 14.277l-4.09-4.09l-2.082 2.08l4.09 4.09l2.082-2.08Z" />
                                                                        <path d="M14.243 28.828A4.972 4.972 0 0 1 16 28.1V27a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2v1.1c.638.13 1.233.38 1.757.728l.829-.828A1 1 0 0 1 22 26.586L23.414 28A1 1 0 1 1 22 29.414l-.828.829c.347.524.598 1.119.728 1.757H23a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0h-1.1a4.972 4.972 0 0 1-.728 1.757l.828.829A1 1 0 0 1 23.414 38L22 39.414A1 1 0 0 1 20.586 38l-.829-.828A4.973 4.973 0 0 1 18 37.9V39a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2v-1.1a4.972 4.972 0 0 1-1.757-.728l-.829.828A1 1 0 1 1 12 39.414L10.586 38A1 1 0 0 1 12 36.586l.828-.829A4.972 4.972 0 0 1 12.1 34H11a1 1 0 1 1-2 0v-2a1 1 0 1 1 2 0h1.1c.13-.638.38-1.233.728-1.757L12 29.414A1 1 0 0 1 10.586 28l.697-.698l.01-.01l.01-.008l.697-.698A1 1 0 0 1 13.414 28l.829.828ZM14 33a3 3 0 1 1 6 0a3 3 0 0 1-6 0Z" />
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div style={{ width: "calc(100% - 70px)" }}>
                                                            <p className="mb-0 my-1 ms-3 text-capitalize">
                                                                {item.firstname}&nbsp;{item.lastname}&nbsp;{item.other}
                                                            </p>
                                                            <div className="mb-0 ms-3 d-flex justify-content-between" style={{ color: "rgba(107, 123, 147, .5)" }}>
                                                                <p className="mb-0 my-1">{item.type}</p>
                                                                <p className="mb-0 my-1">
                                                                    {item.date} | {item.time}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="px-3 text-center" style={{ padding: "155px 0", border: "1px solid rgba(149, 170, 201, .3)", width: "95%", color: "rgba(149, 170, 201, .8)", borderRadius: ".5rem" }}>
                                                No Activity Yet
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="rg_f mt-3 d-flex align-items-center justify-content-center" style={{ height: "calc(623px - 68px)" }}>
                    <div style={{ textAlign: "left", width: "60%", margin: "auto", fontSize: "16px" }}>
                        <p className="mb-1">Nothing Here Yet !!!</p>
                        <p>
                            Please click the <span style={{ color: "rgb(44, 123, 229)" }}>ADD USER</span> button above to a User.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListUsers;
