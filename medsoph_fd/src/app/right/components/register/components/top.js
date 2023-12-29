// Import Libraries
import React from "react";
import { CalenderYear, RF_days, months, specimen, religion, tribe, sex, date, month, year } from "../../../../Misc/helper";

// Components
const FormTop = (props) => {
    const { data, setData, specimenHandler } = props;

    return (
        <React.Fragment>
            <div className="top rg_f p-1">
                <div className="lvl_1 d-flex p-2 justify-content-between">
                    <div className="mb-3">
                        <label htmlFor="firstname" className="form-label">
                            Firstname:
                        </label>
                        <input type="text" className="form-control form-control-sm" name="firstname" id="firstname" placeholder="Amadi" onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastname" className="form-label">
                            Lastname:
                        </label>
                        <input type="text" className="form-control form-control-sm" name="lastname" id="lastname" placeholder="Precious" onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="other" className="form-label">
                            Other (names):
                        </label>
                        <input type="text" className="form-control form-control-sm" name="other" id="other" placeholder="Chioma" onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} required />
                    </div>
                </div>
                <div className="lvl_2 d-flex p-2 justify-content-between">
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">
                            Date of Birth:
                        </label>
                        <div className="input-group">
                            <select className="form-select form-select-sm me-1" name="day" aria-label="Default select" defaultValue={date} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} required>
                                {RF_days.map((key, index) => (
                                    <option key={index} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                            <select className="form-select form-select-sm me-1" name="month" aria-label="Default select" defaultValue={month} style={{ width: "90px" }} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} required>
                                {months.map((key, index) => (
                                    <option key={index} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                            <select className="form-select form-select-sm" name="year" aria-label="Default select" defaultValue={year} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} required>
                                {CalenderYear().map((key, index) => (
                                    <option key={index} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sex" className="form-label">
                            Sex:
                        </label>
                        <select className="form-select form-select-sm" name="sex" aria-label="Default select" onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} required>
                            {sex.map((key, index) => (
                                <option key={index} value={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="religion" className="form-label">
                            Religion:
                        </label>
                        <select className="form-select form-select-sm" name="religion" aria-label="Default select" onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} required>
                            {religion.map((key, index) => (
                                <option key={index} value={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tribe" className="form-label">
                            Tribe:
                        </label>
                        <select className="form-select form-select-sm" name="tribe" aria-label="Default select" onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} required>
                            {tribe.map((key, index) => (
                                <option key={index} value={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="lvl_3 d-flex p-2 justify-content-between">
                    <div className="mb-3">
                        <label htmlFor="tel" className="form-label">
                            Phone:
                        </label>
                        <input type="tel" className="form-control form-control-sm" name="phone" id="tel" placeholder="+2348178359407" onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email:
                        </label>
                        <input type="email" className="form-control form-control-sm" name="email" id="email" placeholder="someone@email.com" onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="diagnosis" className="form-label">
                            Provisional Diagnosis:
                        </label>
                        <input type="text" className="form-control form-control-sm" name="diagnosis" id="diagnosis" placeholder="Malaria" onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} required />
                    </div>
                </div>
                <div>
                    <p className="m-0 ps-2" style={{ fontSize: ".8rem" }}>
                        Specimen:
                    </p>
                    <div className="lvl_4 d-flex p-2 justify-content-between">
                        {specimen.sort().map((key, index) => (
                            <div key={index} className="form-check form-check-inline">
                                <input className="form-check-input specimen" type="checkbox" id={"inlineCheckbox" + (index + 1)} onChange={specimenHandler} value={key} />
                                <label className="form-check-label ms-2" htmlFor={"inlineCheckbox" + (index + 1)}>
                                    {key}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default FormTop;
