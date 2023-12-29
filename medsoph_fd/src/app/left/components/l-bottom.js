// ========================================================================
//                            left-Top
// ========================================================================

// Import libraries
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LeftBottom = (props) => {
    const { tag, setSpin } = props;
    const Navigate = useNavigate();

    // Confirm log In status
    const [status] = useState(
        () =>
            JSON.parse(localStorage.getItem("status")) || {
                loggedIn: false,
                session: false,
            }
    );

    const logout = (e, type) => {
        e.preventDefault();

        // Spinner
        setSpin(1);

        setTimeout(() => {
            if (type === "admin") {
                // Navigate
                Navigate("/app", { replace: true });
            } else {
                // Update Storage
                localStorage.removeItem("status");

                // Navigate
                Navigate("/login", { replace: true });
            }
        }, 1000);
    };

    return (
        <div className="l-bottom">
            <div className="accordion" id={tag}>
                <div className="accordion-item my-2">
                    <Link to="/app/laboratory/" replace className="accordion-header" id={`dashboard${tag}`}>
                        <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#${tag}One`} aria-expanded="true" aria-controls={`${tag}One`}>
                            <i className="bi bi-house-door"></i> <span>Dashboard</span>
                        </button>
                    </Link>
                    <div id={`${tag}One`} className="accordion-collapse collapse" aria-labelledby={`dashboard${tag}`} data-bs-parent={`#${tag}`} style={{ display: "none" }}>
                        <div className="accordion-body"></div>
                    </div>
                </div>
                <div className="accordion-item my-2">
                    <div className="accordion-header" id={`test${tag}`}>
                        <button className="accordion-button" data-bs-toggle="collapse" data-bs-target={`#${tag}Two`} aria-expanded="false" aria-controls={`${tag}Two`}>
                            <i className="bi bi-file-medical"></i> <span>Test</span>
                        </button>
                    </div>
                    <div id={`${tag}Two`} className="accordion-collapse collapse show" aria-labelledby={`test${tag}`} data-bs-parent={`#${tag}`}>
                        <div className="accordion-body">
                            <ul>
                                <Link to="/app/laboratory/register" replace>
                                    <li>Book A Test</li>
                                </Link>
                                <Link to="/app/laboratory/unsettled" replace>
                                    <li>Pending Tests</li>
                                </Link>
                                <Link to="#" replace>
                                    <li>Check Result</li>
                                </Link>
                                {/* /app/laboratory/settled */}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="accordion-item my-2">
                    <div className="accordion-header" id={`lab${tag}`}>
                        <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#${tag}Three`} aria-expanded="false" aria-controls={`${tag}Three`}>
                            <i className="bi bi-award"></i> <span>Laboratory</span>
                        </button>
                    </div>
                    <div id={`${tag}Three`} className="accordion-collapse collapse" aria-labelledby={`lab${tag}`} data-bs-parent={`#${tag}`}>
                        <div className="accordion-body">
                            <ul>
                                <Link to="/app/laboratory/users" replace>
                                    <li>Users</li>
                                </Link>
                                {/* <Link to="/app/laboratory/testkits" replace>
                                    <li>Test Kits</li>
                                </Link> */}
                                <Link to="/app/laboratory/services" replace>
                                    <li>Services</li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="accordion-item my-2">
                    <div className="accordion-header" id={`setting${tag}`}>
                        <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#${tag}Four`} aria-expanded="false" aria-controls={`${tag}Four`}>
                            <i className="bi bi-gear"></i> <span>Settings</span>
                        </button>
                    </div>
                    <div id={`${tag}Four`} className="accordion-collapse collapse" aria-labelledby={`setting${tag}`} data-bs-parent={`#${tag}`}>
                        <div className="accordion-body">
                            <ul>
                                <Link to="/app/laboratory/profile" replace>
                                    <li>Profile</li>
                                </Link>
                                <Link to="/app/laboratory/payment" replace>
                                    <li>Payment</li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="accordion-item my-2">
                    <div className="accordion-header" id={`logout${tag}`}>
                        <div className="accordion-header" id={`dashboard${tag}`} style={{ display: `${status.ff === "admin" ? "block" : "none"}` }}>
                            <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#${tag}Five`} aria-expanded="true" aria-controls={`${tag}Five`} onClick={(e) => logout(e, "admin")}>
                                <i className="bi bi-box-arrow-right"></i> <span>Quit</span>
                            </button>
                        </div>
                        <div className="accordion-header" id={`dashboard${tag}`} style={{ display: `${status.ff === "admin" ? "none" : "block"}` }}>
                            <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#${tag}Five`} aria-expanded="true" aria-controls={`${tag}Five`} onClick={(e) => logout(e, "user")}>
                                <i className="bi bi-box-arrow-right"></i> <span>Logout</span>
                            </button>
                        </div>
                    </div>
                    <div id={`${tag}Five`} className="accordion-collapse collapse" aria-labelledby={`logout${tag}`} data-bs-parent={`#${tag}`} style={{ display: "none" }}>
                        <div className="accordion-body"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftBottom;
