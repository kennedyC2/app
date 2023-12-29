// Import Dependencies
import React, { Fragment } from "react";
import { useSelector } from "react-redux";

// Component
const ResultEntry = (props) => {
    const { testData } = useSelector((state) => state);
    const { data, position } = props;

    const renderOptions = (x, y) => {
        let options = "";
        testData[x][y].forEach((element) => {
            options += `<option value=${element.split(":")[0]}>
                            ${element.split(":")[0].replaceAll("_", " ")}
                        </option>`;
        });

        return options;
    };

    // Add New Layer Of Input
    const addNewLayer = (e) => {
        e.preventDefault();
        const testIndex = e.target.dataset.index;
        const category = e.target.dataset.cat;

        // Create Div
        const div = document.createElement("div");
        div.setAttribute("class", `input-group mb-2 ${"fvk" + position}`);
        div.setAttribute("data-selected", data[testIndex]);
        div.style.fontSize = "13px";

        // Create Select_One
        const select_One = document.createElement("select");
        select_One.setAttribute("class", "form-select form-select-sm me-1");
        select_One.style.width = "40%";
        select_One.innerHTML = `${renderOptions(category, "parameter")}`;

        // Create Input
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "form-control form-control-sm me-1");
        input.setAttribute("placeholder", "value");
        input.required = true;
        input.style.width = "15%";

        // Create Select_Two
        const select_Two = document.createElement("select");
        select_Two.setAttribute("class", "form-select form-select-sm me-1 text-lowercase");
        select_Two.innerHTML = `${renderOptions(category, "unit")}`;

        // Create Button_One
        const button_One = document.createElement("button");
        button_One.setAttribute("type", "submit");
        button_One.setAttribute("class", "btn btn-sm btn-primary add");
        button_One.setAttribute("data-cat", category);
        button_One.setAttribute("data-index", testIndex);
        button_One.onclick = addNewLayer;
        button_One.innerText = "+";

        // Create Button_Two
        const button_Two = document.createElement("button");
        button_Two.setAttribute("type", "submit");
        button_Two.setAttribute("class", "btn btn-sm btn-danger rmv hide");
        button_Two.setAttribute("data-index", testIndex);
        button_Two.onclick = removeNode;
        button_Two.innerText = "-";

        // Append Layers
        div.insertAdjacentElement("beforeend", select_One);
        div.insertAdjacentElement("beforeend", input);
        div.insertAdjacentElement("beforeend", select_Two);
        div.insertAdjacentElement("beforeend", button_One);
        div.insertAdjacentElement("beforeend", button_Two);

        // Append(div);
        e.target.parentElement.parentElement.append(div);

        // Modify Input Layer
        e.target.classList.add("hide");
        e.target.nextSibling.classList.remove("hide");
    };

    const removeNode = (e) => {
        e.preventDefault();

        // Remove Node
        e.target.parentNode.remove();
    };

    return (
        <Fragment>
            <div className="d-flex align-items-start justify-content-between">
                {/* tab 1 */}
                <div className="nav flex-column nav-pills me-2" id="v-pills-tab" role="tablist" aria-orientation="vertical" style={{ width: "40%" }}>
                    {data.map((key, index) => (
                        <div key={index} className={`nav-link  btn-sm text-capitalize ${index === 0 ? "active" : ""}`} id={`v-pills-${key.split(":")[1]}-services-tab-#${position}-${index}`} data-bs-toggle="tab" data-bs-target={`#v-pills-${key.split(":")[1]}-services-test-${position}-${index}`} type="button" role="tab" aria-controls={`v-pills-${key.split(":")[1]}-services-test-${position}-${index}`} aria-selected="true">
                            {key.split(":")[2].replaceAll("_", " ")}
                        </div>
                    ))}
                </div>
                {/* tab 2 */}
                <div className="tab-content ps-2" id="v-pills-tabContent" style={{ borderLeft: "1px solid rgba(149, 170, 201, .3)", width: "60%", height: "350px", overflow: "hidden auto" }}>
                    {data.map((key, index) => (
                        <div key={index} className={`tab-pane fade show ${index === 0 ? "active" : ""}`} id={`v-pills-${key.split(":")[1]}-services-test-${position}-${index}`} role="tabpanel" aria-labelledby={`v-pills-${key.split(":")[1]}-services-tab-#${position}-${index}`}>
                            <div className={`input-group mb-2 ${"fvk" + position}`} style={{ fontSize: "13px" }} data-cat={key.split(":")[0]} data-selected={data[index]}>
                                <select name="" id="" className="form-select form-select-sm me-1" style={{ width: "40%" }}>
                                    {testData[key.split(":")[0]]["class"][key.split(":")[2]].map((key, index) => (
                                        <option key={index} value={key.split(":")[0]}>
                                            {key.split(":")[0].replaceAll("_", " ")}
                                        </option>
                                    ))}
                                </select>
                                <input type="text" className="form-control form-control-sm me-1" name="" id="" style={{ width: "15%" }} placeholder="value" autoComplete="0" required />
                                <select name="" id="" className="form-select form-select-sm me-1 text-lowercase">
                                    {testData[key.split(":")[0]]["unit"].sort().map((key, index) => (
                                        <option key={index} value={key.split(":")[0]}>
                                            {key.split(":")[0]}
                                        </option>
                                    ))}
                                </select>
                                <button type="button" className={`btn btn-sm btn-primary add ${"fvk" + position}`} onClick={(e) => addNewLayer(e)} data-cat={key.split(":")[0]} data-index={index}>
                                    +
                                </button>
                                <button type="button" className="btn btn-sm btn-danger rmv hide" data-cat={key.split(":")[0]} data-index={index} onClick={(e) => removeNode(e)}>
                                    -
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
};

export default ResultEntry;
