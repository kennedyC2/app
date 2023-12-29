import { Fragment } from "react";
import { useSelector } from "react-redux";

const Form1 = ({ data, setData, submit, appData }) => {
    const { categories, sex, appColors } = appData
    const _data = useSelector(state => state)

    const setMisc = (e) => {
        if (data["details"]["misc"].indexOf(e.target.value) < 0) {
            if (!(_data[e.target.value].length > 5)) {
                setData({ ...data, ...data["details"]["misc"].push(e.target.value) });
            } else {
                // Notification
                const notification = document.getElementById("notifA")
                notification.firstChild.innerHTML = "List of trending products cannot be greater than 5, try deleting one to add current product."
                notification.classList.add("showNotif")

                setTimeout(() => {
                    // Close Notification
                    notification.classList.remove("showNotif")
                }, 2000);
            }
        } else {
            setData({ ...data, ...(data["details"]["misc"] = data["details"]["misc"].filter((item) => item !== e.target.value)) });
        }
    };

    return (
        <Fragment>
            <form action="#" method="post" onSubmit={submit}>
                <div className="d-flex justify-content-between fm1div">
                    <div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title:
                            </label>
                            <input type="text" className="form-control" id="title" name="title" onChange={(e) => setData({ ...data, ...(data["details"]["title"] = e.target.value) })} value={data.details.title} required />
                            <div className="invalid-feedback">Please enter product title.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">
                                Brand:
                            </label>
                            <input type="text" className="form-control" id="brand" name="brand" onChange={(e) => setData({ ...data, ...(data["details"]["brand"] = e.target.value) })} value={data.details.brand} required />
                            <div className="invalid-feedback">Please enter product brand.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">
                                Quantity:
                            </label>
                            <input type="text" className="form-control" id="quantity" name="quantity" onChange={(e) => setData({ ...data, ...(data["details"]["quantity"] = e.target.value) })} value={data.details.quantity} required />
                            <div className="invalid-feedback">Please enter product quantity.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">
                                Price:
                            </label>
                            <input type="text" className="form-control" id="price" name="price" onChange={(e) => setData({ ...data, ...(data["details"]["price"] = e.target.value) })} value={data.details.price} required />
                            <div className="invalid-feedback">Please enter product price.</div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category" className="form-label">
                                Sex:
                            </label>
                            <select className="form-select" id="sex" aria-label="select" onChange={(e) => setData({ ...data, ...(data["details"]["sex"] = e.target.value) })} value={data.details.sex} required>
                                {sex && sex.length > 0 ? (
                                    sex.map((sx, index) => {
                                        return (
                                            <option key={index} value={sx}>{sx}</option>
                                        )
                                    })
                                ) : (
                                    <option value={false}>Empty</option>
                                )}
                            </select>
                            <div className="invalid-feedback">Please select product category.</div>
                        </div><div className="mb-4">
                            <label htmlFor="category" className="form-label">
                                Category:
                            </label>
                            <select className="form-select" id="category" aria-label="select" onChange={(e) => setData({ ...data, ...(data["details"]["category"] = e.target.value) })} value={data.details.category} required>
                                {categories && categories.length > 0 ? (
                                    categories.map((catg, index) => {
                                        return (
                                            <option key={index} value={catg}>{catg.replaceAll("_", " ")}</option>
                                        )
                                    })
                                ) : (
                                    <option value={false}>Empty</option>
                                )}
                            </select>
                            <div className="invalid-feedback">Please select product category.</div>
                        </div>
                    </div>
                    <div>
                        <div className="mb-3">
                            <label htmlFor="desc" className="form-label">
                                Primary Colour:
                            </label>
                            <div className="c_list pe-5">
                                {
                                    appColors && Object.keys(appColors).length > 0 ? (
                                        Object.keys(appColors).map((each, index) => {
                                            return (
                                                <input key={index} className="form-check-input" type="checkbox" id="checkboxNoLabel" style={{ backgroundColor: each }} onChange={e => {
                                                    document.querySelectorAll("input[type=checkbox]:checked").forEach(g => {
                                                        g.checked = false
                                                    })

                                                    e.currentTarget.checked = true
                                                    setData({ ...data, ...(data["details"]["dColor"] = each) })
                                                }} checked={each === data["details"]["dColor"]} />
                                            )
                                        })
                                    ) : (" ")
                                }
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="tags" className="form-label">
                                Tags:
                            </label><br></br>
                            <textarea className="form-control" name="tags" id="tags" cols="50" rows="6" onChange={(e) => setData({ ...data, ...(data["details"]["tags"] = e.target.value) })} value={data.details.tags} required ></textarea>
                            <div className="invalid-feedback">Please add tags to current product.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Misc:
                            </label>
                            <div className="form-check">
                                <input className="form-check-input me-3" type="checkbox" value="newArrival" id="new" onChange={(e) => setMisc(e)} checked={data.details.misc.indexOf("newArrival") > -1 ? true : false} />
                                <label className="form-check-label" htmlFor="new">
                                    New Arrivals
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input me-3" type="checkbox" value="trending" id="trend" onChange={(e) => setMisc(e)} checked={data.details.misc.indexOf("trending") > -1 ? true : false} />
                                <label className="form-check-label" htmlFor="trend">
                                    Trending
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-sm btn-primary f1_sub" hidden>
                        Submit
                    </button>
                </div>
            </form>
        </Fragment>
    );
};

export default Form1;
