// Import Libraries
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Component
const FormBottom = (props) => {
    const { company } = useSelector((state) => state);
    const { data, testData, setData, selectedTestHandler } = props;

    const updateBalance = (e) => {
        setData({ ...data, paid: e.target.value });
        document.getElementById("balance").innerHTML = `${e.target.value > 0 ? "₦" : ""}${e.target.value > 0 ? new Intl.NumberFormat("en-US", {}).format(data.total - e.target.value) : "0.00"}`;
    };

    const pid = () => {
        let data = ""
        if (parseInt(company.pid) < 1000) {
            data = "00" + (company.pid + 1).toString()
        } else {
            data = (company.pid + 1).toString()
        }

        return data
    }

    return (
        <React.Fragment>
            {Object.keys(testData).length > 0 ? (
                <div className="mt-3">
                    <div className="d-flex s_sed align-items-start mt-3 justify-content-between">
                        {/* tab 1 */}
                        <div className="rg_f py-4">
                            <div className="nav nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={{ width: "100%", overflowY: "auto", height: "100%" }}>
                                {Object.keys(testData)
                                    .sort()
                                    .map((key, index) => (
                                        <div key={index} className={`nav-link  btn-sm ${index === 0 ? "active" : ""}`} id={`v-pills-${testData[key]["name"]}-tab`} data-bs-toggle="tab" data-bs-target={`#v-pills-${testData[key]["name"]}`} type="button" role="tab" aria-controls={`v-pills-${testData[key]["name"]}`} aria-selected="true">
                                            {key.replaceAll("_", " ")}
                                        </div>
                                    ))}
                            </div>
                        </div>
                        {/* tab 2 */}
                        <div className="rg_f py-4">
                            <div className="tab-content p-2" id="v-pills-tabContent" style={{ width: "100%", overflowY: "auto", height: "100%" }}>
                                {Object.keys(testData)
                                    .sort()
                                    .map((key, index) => (
                                        <div key={index} className={`tab-pane fade show ${index === 0 ? "active" : ""}`} id={`v-pills-${testData[key]["name"]}`} role="tabpanel" aria-labelledby={`v-pills-${testData[key]["name"]}-tab`}>
                                            {Object.keys(testData[key].testList).map((test, index) => (
                                                <div key={index} className="form-check mb-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title={test["description"]}>
                                                    <input className="form-check-input me-2" type="checkbox" id={test.split(" ")[0] + "_" + index} value={`${key}:${testData[key]["name"]}:${test.trim().replaceAll(" ", "_")}:${testData[key]["testList"][test]["cost"]}`} onChange={selectedTestHandler} />
                                                    <label
                                                        className="form-check-label d-flex justify-content-between"
                                                        htmlFor={test.split(" ")[0] + "_" + index}
                                                        style={{
                                                            textTransform: "capitalize",
                                                            paddingTop: "2px",
                                                        }}
                                                    >
                                                        <div>{test.replaceAll("_", "  ")}</div>
                                                        <div>₦{new Intl.NumberFormat("en-US", {}).format(testData[key]["testList"][test]["cost"])}</div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className="rg_f mt-3 py-2 px-2">
                        <div className="d-flex det ps-2 w-100 justify-content-between">
                            <div className="d-flex">
                                <p className="me-3 mb-0 pt-1">Total:</p>
                                <div id="total" className="pt-1">
                                    0.00
                                </div>
                            </div>
                            <div className="d-flex">
                                <label htmlFor="paid" className="form-label me-3 mb-0 pt-1" style={{ fontSize: "unset" }}>
                                    Paid:
                                </label>
                                <input type="number" className="form-control form-control-sm bg-transparent" id="paid" placeholder="0.00" style={{ width: "80%" }} onChange={(e) => updateBalance(e)} disabled={data.total < 1 ? true : false} max={data.total > 0 ? data.total : ""} />
                            </div>
                            <div className="d-flex">
                                <p className="me-3 mb-0 pt-1">Balance:</p>
                                <div id="balance" className="pt-1">
                                    0.00
                                </div>
                            </div>
                            <div className="d-flex">
                                <p className="me-3 mb-0 pt-1">ID:</p>
                                <div id="identity" className="pt-1">
                                    {"PHDN-" + pid()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rg_f mt-3 py-2 px-2 d-flex justify-content-end">
                        <div className="">
                            <button type="reset" className="btn btn-sm me-4 px-3 btn-outline-primary">
                                Reset form
                            </button>
                            <button type="submit" className="btn btn-sm px-3 btn-outline-primary">
                                Book test
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="rg_f mt-4 d-flex align-items-center justify-content-center" style={{ height: "calc(623px - 230px - 24px)" }}>
                    <div style={{ textAlign: "left", width: "75%", margin: "auto", fontSize: "16px" }}>
                        <p className="mb-1">Nothing Here Yet !!!</p>
                        <p>
                            Please click the{" "}
                            <span style={{ color: "rgb(44, 123, 229)" }}>
                                <Link to="/app/laboratory/services">Services</Link>
                            </span>{" "}
                            tab and add all services currently offered in your laboratory.
                        </p>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default FormBottom;
