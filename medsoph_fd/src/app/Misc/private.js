import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

// Component
const Private = () => {
    // Authentication status
    const [status] = useState(
        () =>
            JSON.parse(localStorage.getItem("status")) || {
                loggedIn: false,
                token: false,
                path: {
                    type: false,
                    companyID: false,
                },
            }
    );

    // Return
    return status.loggedIn === true ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

// Export
export default Private;
