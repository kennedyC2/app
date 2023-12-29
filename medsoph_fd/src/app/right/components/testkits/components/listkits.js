// Import Dependencies

// Component
const ListKits = (props) => {
    const { data } = props;

    return (
        <div className="tab-pane s_sel fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            {Object.keys(data).length > 0 ? (
                <div className="d-flex s_sed align-items-start mt-3 justify-content-between">
                    {/* tab 1 */}
                    <div className="rg_f py-4">
                        <div style={{ width: "100%", overflowY: "auto", height: "100%" }}>
                            <div className="nav nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                {Object.keys(data).map((key, index) => (
                                    <div key={index} className={`nav-link text-capitalize mb-1 d-flex btn-sm ${index === 0 ? "active" : ""}`} id={`v-pills-${index}-services-tab`} data-bs-toggle="tab" data-bs-target={`#v-pills-${index}-services`} type="button" role="tab" aria-controls={`v-pills-${index}-services`} aria-selected="true">
                                        {/* <div className="me-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="1.3em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1792 1536">
                                                <path fill="currentColor" d="M1280 992V800q0-14-9-23t-23-9h-224V544q0-14-9-23t-23-9H800q-14 0-23 9t-9 23v224H544q-14 0-23 9t-9 23v192q0 14 9 23t23 9h224v224q0 14 9 23t23 9h192q14 0 23-9t9-23v-224h224q14 0 23-9t9-23zM640 256h512V128H640v128zm-384 0v1280h-32q-92 0-158-66T0 1312V480q0-92 66-158t158-66h32zm1184 0v1280H352V256h160V96q0-40 28-68t68-28h576q40 0 68 28t28 68v160h160zm352 224v832q0 92-66 158t-158 66h-32V256h32q92 0 158 66t66 158z" />
                                            </svg>
                                        </div> */}
                                        <div style={{ paddingTop: ".09rem", fontSize: ".9rem" }}>{key.replaceAll("_", " ").replaceAll("-", "/")}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* tab 2 */}
                    <div className="rg_f py-4">
                        <div className="tab-content p-2" id="v-pills-tabContent" style={{ width: "100%", overflowY: "auto", height: "100%", fontSize: "13.5px" }}>
                            {Object.keys(data).map((key, index) => (
                                <div key={index} className={`tab-pane fade show ${index === 0 ? "active" : ""}`} id={`v-pills-${index}-services`} role="tabpanel" aria-labelledby={`v-pills-${index}-services-tab`}>
                                    <p className="text-capitalize">Test Kit: &nbsp;{data[key]["details"].title.replaceAll("_", " ").replaceAll("-", "/")}</p>
                                    <p className="text-capitalize">
                                        {/* add last updated option to the quantity */}
                                        Quantity: &nbsp;{data[key]["details"].quantity}
                                    </p>
                                    <p className="text-capitalize">Category: &nbsp;{data[key]["details"].test.split(":")[0].replaceAll("_", " ")}</p>
                                    <p className="text-capitalize">Test: &nbsp;{data[key]["details"].test.split(":")[1].replaceAll("_", " ")}</p>
                                    <div>
                                        <p>Recent Activities:</p>
                                        {data[key]["activities"].length > 0 ? (
                                            <table key={index} className="table table-bordered">
                                                <tbody>
                                                    {key["activity"].map((items, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{items.split(":")[0]}</td>
                                                            <td>{items.split(":")[1]}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="px-3 text-center" style={{ padding: "8.9rem 0", border: "1px solid rgba(149, 170, 201, .3)", width: "95%", color: "rgba(149, 170, 201, .8)", borderRadius: ".5rem" }}>
                                                No Activity Yet
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="rg_f mt-3 d-flex align-items-center justify-content-center" style={{ height: "calc(623px - 68px)" }}>
                    <div style={{ textAlign: "left", width: "60%", margin: "auto", fontSize: "1rem" }}>
                        <p className="mb-1">Nothing Here Yet !!!</p>
                        <p>
                            Please click the <span style={{ color: "rgb(44, 123, 229)" }}>ADD KIT</span> button above to add Test Kits.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListKits;
