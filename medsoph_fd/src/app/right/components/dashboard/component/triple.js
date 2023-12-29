// Import Dependencies
import React, { Fragment, useEffect } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import { one_layer } from "../../../../Misc/list";

// Component
const Triple = () => {
    const { storage, top_5, users } = useSelector((state) => state.company);

    const doughnutData = (label, data) => {
        const file = [];
        let count = 0;
        if (label) {
            for (const prop in top_5["tests"]) {
                if (count < 4) {
                    file.push(prop.replaceAll("_", " "));
                    count++;
                } else {
                    break;
                }
            }
        }

        if (data) {
            for (const prop in top_5["tests"]) {
                if (count < 4) {
                    file.push(top_5["tests"][prop]);
                    count++;
                } else {
                    break;
                }
            }
        }

        return file;
    };

    useEffect(() => {
        // Get Container
        const doughnut = document.getElementById("doughnut");

        // Chart
        const chart = new Chart(doughnut, {
            type: "doughnut",
            data: {
                labels: doughnutData(true, false),
                datasets: [
                    {
                        label: "My First Dataset",
                        data: doughnutData(false, true),
                        backgroundColor: ["rgb(255, 99, 132)", "rgb(75, 192, 192)", "rgb(255, 205, 86)", "rgb(201, 203, 207)", "rgb(54, 162, 235)"],
                        borderWidth: "4",
                        weight: 100,
                    },
                ],
                hoverOffset: 4,
            },
            options: {
                layout: {
                    padding: {
                        bottom: 65,
                        top: 5,
                    },
                },

                radius: 100,

                plugins: {
                    tooltip: {
                        backgroundColor: "#ffffff",
                        titleColor: "#95aac9",
                        bodyColor: "gray",
                        bodyFontSize: 11,
                        yPadding: 8,
                        displayColors: true,
                        caretPadding: 15,
                        borderColor: "black",
                        borderWidth: 0.1,
                        callbacks: {
                            label: function (context) {
                                var label = context.label || "";

                                if (label) {
                                    label += ": ";
                                }

                                return ` ${label} ${context.parsed}`;
                            },

                            title: function (context) {
                                return null;
                            },
                        },
                    },
                },
            },
        });

        // when component unmounts
        return () => {
            chart.destroy();
        };
    });

    useEffect(() => {
        // Get Container
        const pie = document.getElementById("pie");

        // Chart
        const chart = new Chart(pie, {
            type: "pie",
            data: {
                labels: ["Pending", "Completed", "Test kits"],
                datasets: [
                    {
                        label: "My First Dataset",
                        data: [storage.pending, storage.completed, storage.kits],
                        backgroundColor: ["rgb(255, 99, 132)", "rgb(75, 192, 192)", "rgb(255, 205, 86)"],
                        borderWidth: "4",
                        weight: 100,
                    },
                ],
                hoverOffset: 4,
            },
            options: {
                layout: {
                    padding: {
                        bottom: 65,
                        top: 5,
                    },
                },

                radius: 100,

                plugins: {
                    tooltip: {
                        backgroundColor: "#ffffff",
                        titleColor: "#95aac9",
                        bodyColor: "gray",
                        bodyFontSize: 11,
                        yPadding: 8,
                        displayColors: true,
                        caretPadding: 15,
                        borderColor: "black",
                        borderWidth: 0.1,
                        callbacks: {
                            label: function (context) {
                                var label = context.label || "";

                                if (label) {
                                    label += ": ";
                                }

                                return ` ${label} ${context.parsed} tests`;
                            },

                            title: function (context) {
                                return null;
                            },
                        },
                    },
                },
            },
        });

        // when component unmounts
        return () => {
            chart.destroy();
        };
    });

    return (
        <Fragment>
            <div className="triple d-flex justify-content-between">
                <div>
                    <div className="d-flex justify-content-between px-3 py-3">
                        <p className="m-0">Top 5 Tests Booked</p>
                        <p className="m-0">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="19" height="19" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                                <path fill="#95aac9" fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z" />
                            </svg>
                        </p>
                    </div>
                    <canvas id="doughnut" style={{ display: top_5["sorted"] === true ? "block" : "none" }}></canvas>
                    <div className="mx-3 text-center" style={{ padding: "130px 0", border: "1px solid rgba(149, 170, 201, .3)", color: "rgba(149, 170, 201, .8)", borderRadius: ".5rem", display: top_5["sorted"] === 1 ? "none" : "block" }}>
                        -- no data --
                    </div>
                </div>
                <div>
                    <div className="d-flex justify-content-between px-3 py-3">
                        <p className="m-0">Storage</p>
                        <p className="m-0">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="26" height="26" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                <path fill="#95aac9" d="m17 9l-.351.015A5.967 5.967 0 0 0 11 5c-3.309 0-6 2.691-6 6l.001.126A4.007 4.007 0 0 0 2 15c0 2.206 1.794 4 4 4h5v-4.586l-1.293 1.293a.997.997 0 0 1-1.414 0a.999.999 0 0 1 0-1.414l2.999-2.999a1 1 0 0 1 1.416 0l2.999 2.999a.999.999 0 1 1-1.414 1.414L13 14.414V19h4c2.757 0 5-2.243 5-5s-2.243-5-5-5z" />
                            </svg>
                        </p>
                    </div>

                    <canvas id="pie" style={{ display: storage.completed > 0 && storage.pending > 0 && storage.kits > 0 ? "block" : "none" }}></canvas>
                    <div className="mx-3 text-center" style={{ padding: "130px 0", border: "1px solid rgba(149, 170, 201, .3)", color: "rgba(149, 170, 201, .8)", borderRadius: ".5rem", display: storage.completed > 0 && storage.pending > 0 && storage.kits > 0 ? "none" : "block" }}>
                        -- no data --
                    </div>
                </div>
                <div>
                    <div className="d-flex justify-content-between px-3 py-3">
                        <p className="m-0">Employees</p>
                        <p className="m-0">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="22" height="22" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                <path fill="#95aac9" d="M11.999 1.993c-5.514.001-10 4.487-10 10.001s4.486 10 10.001 10c5.513 0 9.999-4.486 10-10c0-5.514-4.486-10-10.001-10.001zM12 19.994c-4.412 0-8.001-3.589-8.001-8s3.589-8 8-8.001C16.411 3.994 20 7.583 20 11.994c-.001 4.411-3.59 8-8 8z" />
                                <path fill="#95aac9" d="M12 10.994H8v2h4V16l4.005-4.005L12 7.991z" />
                            </svg>
                        </p>
                    </div>
                    <ul className="list-group list-group-flush px-2">
                        {users.length > 0 ? (
                            users.map((item, index) => (
                                <li key={index} className="list-group-item d-flex pt-1 pb-3 px-2">
                                    <div className="pt-1">
                                        <div className="pt-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="25" height="28" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1280 1536">
                                                <path fill="#95aac9" d="M1280 1271q0 109-62.5 187t-150.5 78H213q-88 0-150.5-78T0 1271q0-85 8.5-160.5t31.5-152t58.5-131t94-89T327 704q131 128 313 128t313-128q76 0 134.5 34.5t94 89t58.5 131t31.5 152t8.5 160.5zm-256-887q0 159-112.5 271.5T640 768T368.5 655.5T256 384t112.5-271.5T640 0t271.5 112.5T1024 384z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div style={{ width: "calc(100% - 40px)" }}>
                                        <p className="mb-0 my-1 ms-3 text-capitalize">
                                            {item.lastname}&nbsp;{item.firstname}&nbsp;{item.other}
                                        </p>
                                        <div className="mb-0 ms-3 d-flex justify-content-between" style={{ color: "rgba(107, 123, 147, .5)" }}>
                                            <p className="mb-0 my-1 text-capitalize">{item.account.replaceAll("_", " ")}</p>
                                            <p className="mb-0 my-1">Online</p>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <div className="mx-2 text-center" style={{ padding: "130px 0", border: "1px solid rgba(149, 170, 201, .3)", color: "rgba(149, 170, 201, .8)", borderRadius: ".5rem" }}>
                                -- no data --
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </Fragment>
    );
};

// Export Component
export default Triple;
