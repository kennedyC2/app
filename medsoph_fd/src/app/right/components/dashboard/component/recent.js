// Import Dependencies
import React, { Fragment, useEffect } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";

// Components
const Recent = () => {
    const { company } = useSelector((state) => state);

    useEffect(() => {
        // Get Container
        const hourlyChart = document.getElementById("hourly").getContext("2d");

        // Chart
        const chart = new Chart(hourlyChart, {
            type: "line",
            data: {
                labels: ["8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm"],
                datasets: [
                    {
                        label: "2-hourly",
                        data: company.hourly.amount,
                        backgroundColor: ["#95aac9"],
                        borderColor: ["#95aac9"],
                        borderWidth: 2,
                        tension: 0.4,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            borderColor: "transparent",
                            color: "#e3ebf6",
                            tickColor: "transparent",
                        },
                    },

                    x: {
                        beginAtZero: false,
                        grid: {
                            borderColor: "#95aac9",
                            color: "transparent",
                            tickColor: "#95aac9",
                        },
                    },
                },

                layout: {
                    padding: {
                        left: 15,
                        right: 30,
                        bottom: 10,
                        // top: 5,
                    },
                },

                plugins: {
                    legend: {
                        display: false,
                    },

                    tooltip: {
                        backgroundColor: "#ffffff",
                        titleColor: "#95aac9",
                        bodyColor: "gray",
                        bodyFontSize: 11,
                        yPadding: 8,
                        displayColors: false,
                        caretPadding: 15,
                        borderColor: "black",
                        borderWidth: 0.1,
                        callbacks: {
                            label: function (context) {
                                var label = context.dataset.label || "";

                                if (label) {
                                    label += ": ";
                                }

                                return `${context.label}:  ₦${context.parsed.y}`;
                            },

                            title: function (context) {
                                return "2-Hourly Revenue";
                            },
                        },
                    },
                },

                maintainAspectRatio: false,
            },
        });

        // when component unmounts
        return () => {
            chart.destroy();
        };
    });

    return (
        <Fragment>
            <div className="recent d-flex justify-content-between">
                <div className="recent_1">
                    <div className="d-flex justify-content-between px-3 py-3">
                        <p className="m-0">Recent Activities</p>
                        <p className="m-0">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="22" height="22" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                <path fill="#95aac9" d="M11.999 1.993c-5.514.001-10 4.487-10 10.001s4.486 10 10.001 10c5.513 0 9.999-4.486 10-10c0-5.514-4.486-10-10.001-10.001zM12 19.994c-4.412 0-8.001-3.589-8.001-8s3.589-8 8-8.001C16.411 3.994 20 7.583 20 11.994c-.001 4.411-3.59 8-8 8z" />
                                <path fill="#95aac9" d="M12 10.994H8v2h4V16l4.005-4.005L12 7.991z" />
                            </svg>
                        </p>
                    </div>
                    <ul className="list-group list-group-flush px-2">
                        {company.lab_activities.length > 0 ? (
                            company.lab_activities.map((item, index) => (
                                <li key={index} className="list-group-item d-flex pt-1 pb-3 px-2">
                                    <div className="pt-1">
                                        <div className="extend rounded-circle">
                                            {/* Assign svg using activity type */}
                                            {/* =================================================================================================== */}
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48">
                                                <g fill="#95aac9" fillRule="evenodd" clipRule="evenodd">
                                                    <path d="M6.818 12.864A1.157 1.157 0 0 0 8.455 14.5l.818-.819l4.09 4.09l-3.272 3.274a1.157 1.157 0 1 0 1.636 1.636l1.636-1.636l2.076 2.076a10.079 10.079 0 0 1 2.781-.047l-3.443-3.443l5.354-5.354L31.9 26.047l-5.076 5.076a10.058 10.058 0 0 1 .055 3.438l.394.394a5.787 5.787 0 0 0 6.205 1.296l1.158 1.159a2.313 2.313 0 0 0 2.236.599l2.673 2.673a1.157 1.157 0 1 0 1.637-1.637l-2.674-2.673a2.313 2.313 0 0 0-.6-2.235l-1.158-1.159a5.787 5.787 0 0 0-1.295-6.205l-13.91-13.91l1.637-1.637a1.157 1.157 0 0 0-1.637-1.636l-3.272 3.273l-4.09-4.09l.817-.818a1.157 1.157 0 1 0-1.636-1.637l-6.546 6.546Zm25.93 21.524l2.14-2.14a3.787 3.787 0 0 0-.848-4.06l-.504-.505l-5.353 5.354l.504.504a3.786 3.786 0 0 0 4.061.847Zm3.302 1.607l-.824-.824a5.932 5.932 0 0 0 .445-.444l.824.824a.314.314 0 1 1-.445.444ZM16.86 14.277l-4.09-4.09l-2.082 2.08l4.09 4.09l2.082-2.08Z" />
                                                    <path d="M14.243 28.828A4.972 4.972 0 0 1 16 28.1V27a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2v1.1c.638.13 1.233.38 1.757.728l.829-.828A1 1 0 0 1 22 26.586L23.414 28A1 1 0 1 1 22 29.414l-.828.829c.347.524.598 1.119.728 1.757H23a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0h-1.1a4.972 4.972 0 0 1-.728 1.757l.828.829A1 1 0 0 1 23.414 38L22 39.414A1 1 0 0 1 20.586 38l-.829-.828A4.973 4.973 0 0 1 18 37.9V39a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2v-1.1a4.972 4.972 0 0 1-1.757-.728l-.829.828A1 1 0 1 1 12 39.414L10.586 38A1 1 0 0 1 12 36.586l.828-.829A4.972 4.972 0 0 1 12.1 34H11a1 1 0 1 1-2 0v-2a1 1 0 1 1 2 0h1.1c.13-.638.38-1.233.728-1.757L12 29.414A1 1 0 0 1 10.586 28l.697-.698l.01-.01l.01-.008l.697-.698A1 1 0 0 1 13.414 28l.829.828ZM14 33a3 3 0 1 1 6 0a3 3 0 0 1-6 0Z" />
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                    <div style={{ width: "calc(100% - 40px)" }}>
                                        <p className="mb-0 my-1 ms-3 text-capitalize">
                                            {item.firstname}&nbsp;{item.lastname}&nbsp;{item.other}
                                        </p>
                                        <div className="mb-0 ms-3 d-flex justify-content-between" style={{ color: "rgba(107, 123, 147, .5)" }}>
                                            <p className="mb-0 my-1">{item.date}</p>
                                            <p className="mb-0 my-1">{item.time}</p>
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
                <div className="recent_2">
                    <div className="d-flex justify-content-between px-3 py-3">
                        <p className="m-0">2-Hourly Revenue</p>
                        <p className="m-0">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="22" height="22" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                <path fill="#95aac9" d="M11.999 1.993c-5.514.001-10 4.487-10 10.001s4.486 10 10.001 10c5.513 0 9.999-4.486 10-10c0-5.514-4.486-10-10.001-10.001zM12 19.994c-4.412 0-8.001-3.589-8.001-8s3.589-8 8-8.001C16.411 3.994 20 7.583 20 11.994c-.001 4.411-3.59 8-8 8z" />
                                <path fill="#95aac9" d="M12 10.994H8v2h4V16l4.005-4.005L12 7.991z" />
                            </svg>
                        </p>
                    </div>
                    <div style={{ height: "300px", paddingTop: "5px" }}>
                        <canvas id="hourly" style={{ display: company.hourly.total > 0 ? "block" : "none" }}></canvas>
                        <div className="mx-3 text-center" style={{ padding: "130px 0", border: "1px solid rgba(149, 170, 201, .3)", color: "rgba(149, 170, 201, .8)", borderRadius: ".5rem", display: company.hourly.total > 0 ? "none" : "block" }}>
                            -- no data --
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

// Export
export default Recent;
