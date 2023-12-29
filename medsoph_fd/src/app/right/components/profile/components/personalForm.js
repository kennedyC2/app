//  Import dependencies
import React from "react";
import { RF_days, months, CalenderYear, sex, states } from "../../../../Misc/helper";

// Component
const UpdatePersonal = (props) => {
    const { saveData, personalData } = props;

    return (
        <form action="#" method="POST" className="pt-3 d-lg-flex justify-content-between" id="formPr" onSubmit={saveData}>
            <div className="inn">
                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">
                        Firstname:
                    </label>
                    <input type="text" className="form-control form-control-sm" name="firstname" id="firstname" placeholder="Amadi" defaultValue={personalData["firstname"]} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">
                        Lastname:
                    </label>
                    <input type="text" className="form-control form-control-sm" name="lastname" id="lastname" placeholder="Precious" defaultValue={personalData["lastname"]} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="other" className="form-label">
                        Other (names):
                    </label>
                    <input type="text" className="form-control form-control-sm" name="other" id="other" placeholder="Chioma" defaultValue={personalData["other"]} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="sex" className="form-label">
                        Sex:
                    </label>
                    <select className="form-select form-select-sm" name="sex" aria-label="Default select" defaultValue={personalData["sex"]} required>
                        {sex.map((key, index) => (
                            <option key={index} value={key.toLowerCase()} style={{ display: `${key === personalData["sex"] ? "none" : ""}` }}>
                                {key}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                        Phone:
                    </label>
                    <input type="text" className="form-control form-control-sm" name="phone" id="phone" placeholder="+2340000000000" defaultValue={personalData["phone"]} required />
                </div>
            </div>
            <div className="inn">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input type="email" className="form-control form-control-sm" name="email" id="email" placeholder="Someone@email.com" defaultValue={personalData["email"]} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">
                        Date of Birth:
                    </label>
                    <div className="input-group">
                        <select className="form-select form-select-sm me-1" name="day" aria-label="Default select" defaultValue={personalData["day"]} required>
                            {RF_days.map((key, index) => (
                                <option key={index} value={key} style={{ display: `${key.toString() === personalData["day"] ? "none" : ""}` }}>
                                    {key}
                                </option>
                            ))}
                        </select>
                        <select className="form-select form-select-sm me-1" name="month" aria-label="Default select" defaultValue={personalData["month"]} style={{ width: "90px" }} required>
                            {months.map((key, index) => (
                                <option key={index} value={key.toLowerCase()} style={{ display: `${key.toString() === personalData["month"] ? "none" : ""}` }}>
                                    {key}
                                </option>
                            ))}
                        </select>
                        <select className="form-select form-select-sm" name="year" aria-label="Default select" defaultValue={personalData["year"]} required>
                            {CalenderYear().map((key, index) => (
                                <option key={index} value={key} style={{ display: `${key.toString() === personalData["year"] ? "none" : ""}` }}>
                                    {key}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="state" className="form-label">
                        State:
                    </label>
                    <select className="form-select form-select-sm" name="state" id="state" defaultValue={personalData["state"]} required>
                        {states.map((key, index) => (
                            <option key={index} value={key.toLowerCase()} style={{ display: `${key.toString() === personalData["state"] ? "none" : ""}` }}>
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
                        <option value="nigeria">Nigeria</option>
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

export default UpdatePersonal;
