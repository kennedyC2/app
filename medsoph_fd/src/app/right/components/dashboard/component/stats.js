// Import Dependencies
import React, { Fragment } from "react";
import { useSelector } from "react-redux";

// Component
const Stats = () => {
    const { company } = useSelector((state) => state);

    return (
        <Fragment>
            <div className="stats d-flex justify-content-between">
                <div className="stat d-flex justify-content-between">
                    <div className="m-3">
                        <p className="mt-1 mb-0" style={{ fontSize: ".85rem", color: "#95aac9" }}>
                            TESTS
                        </p>
                        <p className="ps-2 pt-1" style={{ fontSize: "1.2rem" }}>
                            {new Intl.NumberFormat("en-US", {}).format(company.stats.test)} <span style={{ fontSize: ".7rem" }}>Today</span>
                        </p>
                    </div>
                    <div className="mx-3 my-4">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="27" height="27" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
                            <path fill="#95aac9" d="M4.5 3h.75v4.747a2.5 2.5 0 0 1-.296 1.18l-2.606 4.865A1.5 1.5 0 0 0 3.67 16h5.805c.11-.362.283-.7.51-1H3.67a.5.5 0 0 1-.44-.736L4.71 11.5h6.58l.75 1.402l.74-.739l-1.734-3.235a2.5 2.5 0 0 1-.296-1.181V3h.75a.5.5 0 0 0 0-1h-7a.5.5 0 0 0 0 1Zm1.75 4.747V3h3.5v4.747a3.5 3.5 0 0 0 .415 1.653l.59 1.1h-5.51l.59-1.1a3.5 3.5 0 0 0 .415-1.653Zm4.73 7.63l4.83-4.83a1.87 1.87 0 1 1 2.644 2.646l-4.83 4.829a2.197 2.197 0 0 1-1.02.578l-1.498.374a.89.89 0 0 1-1.079-1.078l.375-1.498a2.18 2.18 0 0 1 .578-1.02Z" />
                        </svg>
                    </div>
                </div>
                <div className="stat d-flex justify-content-between">
                    <div className="m-3">
                        <p className="mt-1 mb-0" style={{ fontSize: ".85rem", color: "#95aac9" }}>
                            REVENUE
                        </p>
                        <p className="ps-2 pt-1" style={{ fontSize: "1.2rem" }}>
                            ₦{new Intl.NumberFormat("en-US", {}).format(company.stats.revenue)} <span style={{ fontSize: ".7rem" }}>Today</span>
                        </p>
                    </div>
                    <div className="mx-3 my-4">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                            <path fill="#95aac9" fillRule="evenodd" d="M1.5 1.75a.75.75 0 0 0-1.5 0v12.5c0 .414.336.75.75.75h14.5a.75.75 0 0 0 0-1.5H1.5V1.75zm14.28 2.53a.75.75 0 0 0-1.06-1.06L10 7.94L7.53 5.47a.75.75 0 0 0-1.06 0L3.22 8.72a.75.75 0 0 0 1.06 1.06L7 7.06l2.47 2.47a.75.75 0 0 0 1.06 0l5.25-5.25z" />
                        </svg>
                    </div>
                </div>
                <div className="stat d-flex justify-content-between">
                    <div className="m-3">
                        <p className="mt-1 mb-0" style={{ fontSize: ".85rem", color: "#95aac9" }}>
                            SERVICES
                        </p>
                        <p className="ps-2 pt-1" style={{ fontSize: "1.2rem" }}>
                            {new Intl.NumberFormat("en-US", {}).format(company.stats.services)} <span style={{ fontSize: ".7rem" }}>Total</span>
                        </p>
                    </div>
                    <div className="mx-3 my-4">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24px" height="24px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                            <path fill="#95aac9" d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 16H4V8h16v12z" />
                            <path fill="#95aac9" d="M13 10h-2v3H8v2h3v3h2v-3h3v-2h-3z" />
                        </svg>
                    </div>
                </div>
                <div className="stat d-flex justify-content-between">
                    <div className="m-3">
                        <p className="mt-1 mb-0" style={{ fontSize: ".85rem", color: "#95aac9" }}>
                            EMPLOYEES
                        </p>
                        <p className="ps-2 pt-1" style={{ fontSize: "1.2rem" }}>
                            {new Intl.NumberFormat("en-US", {}).format(company.stats.employees)}
                            {/* <span style={{ fontSize: ".9rem" }}>/{new Intl.NumberFormat("en-US", {}).format(company.employees.total)}</span> <span style={{ fontSize: ".7rem" }}> Online</span> */}
                        </p>
                    </div>
                    <div className="mx-3 my-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#95aac9" className="bi bi-people" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1h7.956a.274.274 0 0 0 .014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 0 0 .022.004zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

// Export Component
export default Stats;
