//  Import dependencies
import React from "react";

// Component
const AddForm = (props) => {
    const { testData, services } = props;

    return (
        <div className="d-flex align-items-start justify-content-between serv">
            {/* tab 1 */}
            <div className="nav nav-pills me-2 serv_1" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                {Object.keys(testData).map((key, index) => (
                    <div key={index} className={`nav-link  btn-sm text-capitalize ${index === 0 ? "active" : ""}`} id={`v-pills-tab-#${testData[key]["name"]}`} data-bs-toggle="tab" data-bs-target={`#v-pills-test-${testData[key]["name"]}`} type="button" role="tab" aria-controls={`v-pills-test-${testData[key]["name"]}`} aria-selected="true" style={{ display: `${services[key] !== undefined && Object.keys(services[key]["testList"]).length === Object.keys(testData[key]["class"]).length ? "none" : ""}` }}>
                        {key.replaceAll("_", " ")}
                    </div>
                ))}
            </div>
            {/* tab 2 */}
            <div className="tab-content serv_2" id="v-pills-tabContent" style={{ overflow: "hidden auto" }}>
                {Object.keys(testData).map((key, index) => (
                    <div key={index} className={`tab-pane fade show ${index === 0 ? "active" : ""}`} id={`v-pills-test-${testData[key]["name"]}`} role="tabpanel" aria-labelledby={`v-pills-tab-#${testData[key]["name"]}`}>
                        <div className="lvl_4 p-2">
                            {Object.keys(testData[key]["class"])
                                .sort()
                                .map((item, index) => (
                                    <div key={index} className="form-check form-check-inline parent" data-cat={key} style={{ width: "98%", display: `${services[key] && services[key]["testList"] && services[key]["testList"][item] !== undefined ? "none" : ""}` }}>
                                        <input className="form-check-input specimen" type="checkbox" id={`inlineCheckbox-${testData[key]["name"]}${index}`} value={item} />
                                        <label className="form-check-label ms-2" htmlFor={`inlineCheckbox-${testData[key]["name"]}${index}`} style={{ width: "98%" }}>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id={`${testData[key]["name"]}${index}`}>
                                                    {item.replaceAll("_", " ")}
                                                </span>
                                                <input type="number" className="form-control" placeholder="₦5000" aria-label="Cost of test" aria-describedby={`${testData[key]["name"]}${index}`} />
                                            </div>
                                        </label>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddForm;
