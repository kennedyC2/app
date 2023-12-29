// Import Dependencies
import React, { Fragment } from "react";
import { useSelector } from "react-redux";

// Component
const Company = () => {
    const { personal } = useSelector((state) => state);

    return (
        <Fragment>
            <li className="list-group-item">
                <div className="me-3">Name:</div>
                <div className="text-capitalize">{personal.company["name"]}</div>
            </li>
            <li className="list-group-item">
                <div className="me-3">Type:</div>
                <div className="text-capitalize">{personal.company["type"]}</div>
            </li>
            <li className="list-group-item">
                <div className="me-3">Registration no:</div>
                <div className="text-uppercase">{personal.company["reg_no"]}</div>
            </li>
            <li className="list-group-item">
                <div className="me-3">Phone:</div>
                <div className="text-capitalize">{personal.company["phone"]}</div>
            </li>
            <li className="list-group-item">
                <div className="me-3">Email:</div>
                <div>{personal.company["email"].charAt(0).toUpperCase() + personal.company["email"].replace(personal.company["email"][0], "")}</div>
            </li>
            <li className="list-group-item">
                <div className="me-3">Address:</div>
                <div className="text-capitalize">{personal.company["address"]}</div>
            </li>
            <li className="list-group-item">
                <div className="me-3">State:</div>
                <div className="text-capitalize">{personal.company["state"]}</div>
            </li>
            <li className="list-group-item">
                <div className="me-3">Country:</div>
                <div className="text-capitalize">{personal.company["country"]}</div>
            </li>
        </Fragment>
    );
};

export default Company;
