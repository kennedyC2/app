// Import Dependencies
import React, { Fragment, useEffect } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import { month } from "../../../../Misc/helper";

// Components
const Base = () => {
    const { revenue } = useSelector((state) => state.company);

    useEffect(() => {
        // Get Container
        const monthlyChart = document.getElementById("base").getContext("2d");

        // Chart
        const chart = new Chart(monthlyChart, {
            type: "bar",
            data: {
                labels: revenue.days,
                datasets: [
                    {
                        label: month,
                        data: revenue.amount,
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
                        right: 20,
                        bottom: 10,
                    },
                },

                elements: {
                    bar: {
                        borderRadius: 5,
                    },
                },

                maintainAspectRatio: false,

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

                                if (parseInt(context.label) === 1 || parseInt(context.label) === 21 || parseInt(context.label) === 31) {
                                    return context.parsed.x + 1 + "st " + label + "₦" + new Intl.NumberFormat("en-US", {}).format(context.parsed.y);
                                } else if (parseInt(context.label) === 2 || parseInt(context.label) === 22) {
                                    return context.parsed.x + 1 + "nd " + label + "₦" + new Intl.NumberFormat("en-US", {}).format(context.parsed.y);
                                } else if (parseInt(context.label) === 3 || parseInt(context.label) === 23) {
                                    return context.parsed.x + 1 + "rd " + label + "₦" + new Intl.NumberFormat("en-US", {}).format(context.parsed.y);
                                } else {
                                    return context.parsed.x + 1 + "th " + label + "₦" + new Intl.NumberFormat("en-US", {}).format(context.parsed.y);
                                }
                            },

                            title: function (context) {
                                return "Monthly Revenue";
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
            <div className="bdt">
                <div>
                    <div className="d-flex justify-content-between px-3 py-3">
                        <p className="m-0">Monthly Revenue</p>
                        <p className="m-0">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="22" height="22" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                <path fill="#95aac9" d="M11.999 1.993c-5.514.001-10 4.487-10 10.001s4.486 10 10.001 10c5.513 0 9.999-4.486 10-10c0-5.514-4.486-10-10.001-10.001zM12 19.994c-4.412 0-8.001-3.589-8.001-8s3.589-8 8-8.001C16.411 3.994 20 7.583 20 11.994c-.001 4.411-3.59 8-8 8z" />
                                <path fill="#95aac9" d="M12 10.994H8v2h4V16l4.005-4.005L12 7.991z" />
                            </svg>
                        </p>
                    </div>
                    <div style={{ height: "320px", paddingTop: "5px" }}>
                        <canvas id="base" style={{ display: revenue.total > 0 ? "block" : "none" }}></canvas>
                        <div className="mx-3 text-center" style={{ padding: "137px 0", border: "1px solid rgba(149, 170, 201, .3)", color: "rgba(149, 170, 201, .8)", borderRadius: ".5rem", display: revenue.total > 0 ? "none" : "block" }}>
                            No Recent Activity
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

// Export
export default Base;
