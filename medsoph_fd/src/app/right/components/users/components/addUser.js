//  Import dependencies
import React from "react";
import { RF_days, months, CalenderYear, date, month, year, sex } from "../../../../Misc/helper";

// Component
const AddUser = (props) => {
    const { saveUsers } = props;

    return (
        <form action="#" method="POST" className="pt-3 d-lg-flex justify-content-between" id="formL" onSubmit={saveUsers}>
            <div className="inn">
                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">
                        Firstname:
                    </label>
                    <input type="text" className="form-control form-control-sm" name="firstname" id="firstname" placeholder="Amadi" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">
                        Lastname:
                    </label>
                    <input type="text" className="form-control form-control-sm" name="lastname" id="lastname" placeholder="Precious" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="other" className="form-label">
                        Other (names):
                    </label>
                    <input type="text" className="form-control form-control-sm" name="other" id="other" placeholder="Chioma" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="sex" className="form-label">
                        Sex:
                    </label>
                    <select className="form-select form-select-sm" name="sex" aria-label="Default select" required>
                        {sex.map((key, index) => (
                            <option key={index} value={key}>
                                {key}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                        Phone:
                    </label>
                    <input type="text" className="form-control form-control-sm" name="phone" id="phone" placeholder="+2340000000000" required />
                </div>
            </div>
            <div className="inn">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input type="email" className="form-control form-control-sm" name="email" id="email" placeholder="Someone@email.com" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">
                        Date of Birth:
                    </label>
                    <div className="input-group">
                        <select className="form-select form-select-sm me-1" name="day" aria-label="Default select" defaultValue={date} required>
                            {RF_days.map((key, index) => (
                                <option key={index} value={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                        <select className="form-select form-select-sm me-1" name="month" aria-label="Default select" defaultValue={month} style={{ width: "90px" }} required>
                            {months.map((key, index) => (
                                <option key={index} value={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                        <select className="form-select form-select-sm" name="year" aria-label="Default select" defaultValue={year} required>
                            {CalenderYear().map((key, index) => (
                                <option key={index} value={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                        Account Type:
                    </label>
                    <select className="form-select form-select-sm" name="type" id="type" defaultValue="Administrator" required>
                        <option value="Receptionist">Type 1 (Receptionist)</option>
                        <option value="Laboratory_Scientist">Type 2 (Laboratory Scientist)</option>
                        <option value="Radiologist">Type 3 (Radiologist)</option>
                        <option value="Receptionist,_Laboratory Scientist">Type 4 (Receptionist + Laboratory Scientist)</option>
                        <option value="Receptionist,_Technician">Type 5 (Receptionist + Technician)</option>
                        <option value="Administrator">Type 6 (Administrator)</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Access Code (minimum of 8 characters):
                    </label>
                    <input type="text" className="form-control form-control-sm" name="password" id="password" placeholder="*************" minLength="8" maxLength="10" autoComplete="0" required />
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

export default AddUser;
