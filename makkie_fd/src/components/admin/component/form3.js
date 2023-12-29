import { Fragment } from "react";

const Form3 = ({ data, setData, appData }) => {
    const { sizes_1, sizes_2, appColors } = appData

    const updateColors = (id, value) => {
        let _data = id.split("_")
        const _size = _data[1]
        const _color = _data[0]

        // Update Sizes
        if (data["details"]["sizes"][_size]) {
            setData({ ...data, ...data["details"]["sizes"][_size][_color] = value })
        } else {
            setData({ ...data, ...data["details"]["sizes"][_size] = { [_color]: value } })
        }

        // Update Colors
        setData({ ...data, ...data["details"]["colors"][_color] = value })

        // Delete Empty Params
        if ((data["details"]["sizes"][_size].hasOwnProperty(_color) && data["details"]["sizes"][_size][_color] === "0") || (data["details"]["sizes"][_size].hasOwnProperty(_color) && data["details"]["sizes"][_size][_color] === "")) {
            delete data["details"]["sizes"][_size][_color]
            delete data["details"]["colors"][_color]

            // Update
            setData(data)
        }

        if (data["details"]["colors"][_color] === 0 || data["details"]["colors"][_color] === "") {
            delete data["details"]["colors"][_color]

            // Update
            setData(data)
        }

        // Delete Empty Objects
        if (Object.keys(data["details"]["sizes"][_size]).length === 0) {
            delete data["details"]["sizes"][_size]

            // Update
            setData(data)
        }
    }

    return (
        <Fragment>
            {
                sizes_1 && sizes_2 && appColors ? (
                    data.details.category !== "coats" && data.details.category !== "scrubs" && data.details.category !== "shirts" && data.details.category !== "sneakers" && data.details.category !== "crocs" ? (
                        <Fragment>
                            <div className="d-flex justify-content-between flex-wrap ndiv">{
                                Object.entries(appColors).map(([key, value], index) => {
                                    return (
                                        <div key={index} className="input-group mb-3">
                                            <span className="input-group-text" id={`inputGroup-${key}`} style={{ backgroundColor: value, minWidth: "80px" }} ></span>
                                            <input type="number" className="form-control" id={`c${key}`} aria-label={`${key}-color`} aria-describedby={`inputGroup-${key}`} min={0} defaultValue={data["details"]["colors"][key] ? data["details"]["colors"][key] : ""} onChange={e => setData({ ...data, ...data["details"]["colors"][e.target.id.replace("c", "")] = e.target.value })} />
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div className="d-flex align-items-start" id="tab3">
                                <div className="nav flex-column nav-pills me-4" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    {data.details.category === "crocs" || data.details.category === "sneakers" ? (
                                        Object.entries(sizes_2).map(([key, value], index) => {
                                            return (
                                                <button key={"cs" + index} className={`nav-link ${index === 0 ? "active" : ""} text-start`} id={`v-pills-${value}-tab`} data-bs-toggle="pill" data-bs-target={`#v-pills-${value}`} type="button" role="tab" aria-controls={`v-pills-${value}`} aria-selected="false">{key}</button>
                                            )
                                        })
                                    ) : (
                                        Object.entries(sizes_1).map(([key, value], index) => {
                                            return (
                                                <button key={"ot" + index} className={`nav-link ${index === 0 ? "active" : ""} text-start`} id={`v-pills-${value}-tab`} data-bs-toggle="pill" data-bs-target={`#v-pills-${value}`} type="button" role="tab" aria-controls={`v-pills-${value}`} aria-selected="false">{key}</button>
                                            )
                                        })
                                    )}
                                </div>
                                <div className="tab-content" id="v-pills-tabContent">
                                    {data.details.category === "crocs" || data.details.category === "sneakers" ? (
                                        Object.entries(sizes_2).map(([key_1, value_1], index) => {
                                            return (
                                                <div key={"tcs" + index} className={`tab-pane fade ${index === 0 ? "show active" : ""}`} id={`v-pills-${value_1}`} role="tabpanel" aria-labelledby={`v-pills-${value_1}-tab`} tabIndex={index}>
                                                    <form action="#" method="post" className="needs-validation fm3" noValidate>
                                                        <div className="d-flex flex-wrap justify-content-between fm3div">
                                                            {
                                                                Object.entries(appColors).map(([key_2, value_2], index) => {
                                                                    return (
                                                                        <div key={index} className="input-group mb-3">
                                                                            <span className="input-group-text" id={`inputGroup-${key_2}`} style={{ backgroundColor: value_2, minWidth: "80px" }} ></span>
                                                                            <input type="number" className="form-control" id={`${key_2}_${value_1}`} aria-label={`${key_2}-color`} aria-describedby={`inputGroup-${key_2}`} min={0} defaultValue={data["details"]["sizes"] && data["details"]["sizes"][value_1] !== undefined ? data["details"]["sizes"][value_1][key_2] : ""} onChange={e => updateColors(e.target.id, e.target.value)} />
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </form>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        Object.entries(sizes_1).map(([key_1, value_1], index) => {
                                            return (
                                                <div key={"tot" + index} className={`tab-pane fade ${index === 0 ? "show active" : ""}`} id={`v-pills-${value_1}`} role="tabpanel" aria-labelledby={`v-pills-${value_1}-tab`} tabIndex={index}>
                                                    <form action="#" method="post" className="needs-validation fm3" noValidate>
                                                        <div className="d-flex flex-wrap justify-content-between fm3div">
                                                            {
                                                                Object.entries(appColors).map(([key_2, value_2], index) => {
                                                                    return (
                                                                        <div key={index} className="input-group mb-3">
                                                                            <span className="input-group-text" id={`inputGroup-${key_2}`} style={{ backgroundColor: value_2, minWidth: "80px" }} ></span>
                                                                            <input type="number" className="form-control" id={`${key_2}_${value_1}`} aria-label={`${key_2}-color`} aria-describedby={`inputGroup-${key_2}`} min={0} defaultValue={data["details"]["sizes"][value_1] ? data["details"]["sizes"][value_1][key_2] : ""} onChange={e => updateColors(e.target.id, e.target.value)} />
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </form>
                                                </div>
                                            )
                                        })
                                    )}
                                </div>
                            </div>
                        </Fragment>
                    )
                ) : ""
            }
        </Fragment>
    );
};

export default Form3;
