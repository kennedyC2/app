//  Import dependencies
import React from "react";
import { states } from "../../../../Misc/helper";

// Component
const CompanyForm = (props) => {
    const { saveData, companyData } = props;

    return (
        <form action="#" method="POST" className="pt-3 d-lg-flex justify-content-between" id="formPr" onSubmit={saveData}>
            <div className="inn">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name:
                    </label>
                    <input type="text" className="form-control form-control-sm" name="name" id="name" placeholder="Phantom Solutions" defaultValue={companyData["name"]} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                        Type:
                    </label>
                    <input type="text" className="form-control form-control-sm" name="type" id="type" placeholder="Laboratory" defaultValue={companyData["type"]} readOnly required />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                        Phone:
                    </label>
                    <input type="text" className="form-control form-control-sm" name="phone" id="phone" placeholder="+2340000000000" defaultValue={companyData["phone"]} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input type="email" className="form-control form-control-sm" name="email" id="email" placeholder="Someone@email.com" defaultValue={companyData["email"]} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="reg_no" className="form-label">
                        Registration Number:
                    </label>
                    <input type="text" className="form-control form-control-sm" name="reg_no" id="reg_no" placeholder="Laboratory" defaultValue={companyData["reg_no"]} required />
                </div>
            </div>
            <div className="inn">
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                        Address:
                    </label>
                    <textarea className="form-control" name="address" id="address" placeholder="Imo state Teaching Hospital, Orlu." defaultValue={companyData["address"]} rows="5" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="state" className="form-label">
                        State:
                    </label>
                    <select className="form-select form-select-sm" name="state" id="state" defaultValue={companyData["state"]} required>
                        <option value={companyData["state"]} disabled>
                            {companyData["state"].split(" ")[0]}
                        </option>
                        {states.map((key, index) => (
                            <option key={index} value={key} style={{ display: `${key.toString() === companyData["state"] ? "none" : ""}` }}>
                                {key.split(" ")[0]}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="country" className="form-label">
                        Country:
                    </label>
                    <select className="form-select form-select-sm" name="country" id="country" defaultValue="Nigeria" required>
                        <option value={companyData["country"]} disabled>
                            {companyData["country"]}
                        </option>
                        <option value="Nigeria">Nigeria</option>
                    </select>
                </div>
                <div className="mb-3 text-end">
                    <button type="submit" className="hide">
                        Add
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CompanyForm;
