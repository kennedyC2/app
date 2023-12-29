// Import Dependencies
import React, { Fragment } from "react";

// Component
const Personal = (props) => {
    const { personalData } = props;

    return (
        <Fragment>
            <li className="list-group-item">
                <div className="me-3">Name:</div>
                <div className="d-lg-none text-capitalize">
                    {personalData["lastname"]} {personalData["firstname"]} {personalData["other"][0].toUpperCase()}.
                </div>
                <div className="d-none d-lg-block text-capitalize">
                    {personalData["lastname"]} {personalData["firstname"]} {personalData["other"]}
                </div>
            </li>
            <li className="list-group-item">
                <div className="me-3">Sex:</div>
                <div className="text-capitalize">{personalData["sex"]}</div>
            </li>
            <li className="list-group-item">
                <div className="me-3">Phone:</div>
                <div className="text-capitalize">{personalData["phone"]}</div>
            </li>
            <li className="list-group-item">
                <div className="me-3">Email:</div>
                <div>{personalData["email"].charAt(0).toUpperCase() + personalData["email"].replace(personalData["email"][0], "")}</div>
            </li>
            <li className="list-group-item">
                <div className="me-3">State:</div>
                <div className="text-capitalize">{personalData["state"]}</div>
            </li>
            <li className="list-group-item">
                <div className="me-3">Country:</div>
                <div className="text-capitalize">{personalData["country"]}</div>
            </li>
        </Fragment>
    );
};

export default Personal;
