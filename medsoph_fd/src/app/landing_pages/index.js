// Import Dependencies
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import hero from "./../../assets/videos/hero.webm";

// Component
const Index = () => {
    return (
        <Fragment>
            <div className="h-100 w-100">
                <video src={hero} preload="true" muted loop autoPlay></video>
                <div className="content d-flex flex-column align-items-center justify-content-center">
                    <div className="m-auto header" style={{ width: "85%", height: "auto" }}>
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <div className="container-fluid px-2">
                                <Link className="navbar-brand text-white" to="#">
                                    <div className="home_logo"></div>
                                </Link>
                                <button className="navbar-toggler d-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                                    <div className="navbar-nav">
                                        <Link className="nav-link me-2" to="#">
                                            <button className="btn btn-outline-light btn-sm px-3">Contact Us</button>
                                        </Link>
                                        <Link className="nav-link" to="/login">
                                            <button className="btn btn-outline-light btn-sm px-4">Login</button>
                                        </Link>
                                    </div>
                                </div>
                                <Link className="nav-link d-lg-none lol" to="/login">
                                    <button className="btn btn-outline-light btn-sm px-4">Login</button>
                                </Link>
                            </div>
                        </nav>
                    </div>

                    <div className="d-flex flex-column justify-content-center mid" style={{ color: "#ffffff" }}>
                        <h2 className="text-uppercase" style={{ color: "#ffffff" }}>
                            Medsoph Solutions
                        </h2>
                        <h3 className="text-uppercase mt-1" style={{ color: "#ffffff" }}>
                            Work Smart and Efficiently
                        </h3>
                        <p className="mt-2" style={{ color: "#ffffff" }}>
                            Harness the power of cloud computing and real time analytics, access and manage your data from anywhere in the world where there’s internet connectivity.
                        </p>

                        <div className="d-flex mt-2">
                            <Link className="" to="/register">
                                <button className="btn btn-sm px-4 py-2 fs-6" style={{ backgroundColor: "#f11414b3", border: "0", color: "#ffffff" }}>
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
        </Fragment>
    );
};

export default Index;
