import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../main";

const User = ({ FetchAppData, CreateCart, CreateUserData, CreateWishlist, UpdateStatus }) => {
    const dispatch = useDispatch()
    const { appData, user, status, cart, wishlist } = useSelector(state => state)

    useEffect(() => {
        // Load appData
        if (Object.keys(appData).length === 0) {
            FetchAppData(dispatch)
        }

        // Load User Data
        if (Object.keys(user).length === 0) {
            CreateUserData(dispatch, store)
        }

        // Load User Status
        if (Object.keys(status).length === 0) {
            UpdateStatus(dispatch, store)
        }

        // Load User Cart
        if (Object.keys(cart).length === 0) {
            CreateCart(dispatch, store)
        }

        // Load User Wishlist
        if (Object.keys(wishlist).length === 0) {
            CreateWishlist(dispatch, store)
        }

        return
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [selectedCatg, setCatg] = useState("")
    const [filter, setFilter] = useState({
        brand: false,
        color: false,
        sex: false,
        size: false
    })

    const { brand, colors, sex, sizes_1, sizes_2 } = appData

    const selectCatg = useCallback((str) => {
        // Set Brand
        setCatg(str)

        // Uncheck all checked colors
        document.querySelectorAll("input[type=checkbox]:checked").forEach(each => {
            each.checked = false
        })

    }, [])

    return (
        <div className="container category body w_1200 d-lg-flex justify-content-between m-auto">
            <div className="lft d-none d-lg-block pt-1">
                <div className="accordion accordion-flush" id="d_filter">
                    {/* Brand Selector */}
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="brand_hd">
                            <button className="accordion-button text-uppercase" type="button" data-bs-toggle="collapse" data-bs-target="#flush_brand" aria-expanded="false" aria-controls="flush_brand">
                                Brand
                            </button>
                        </h2>
                        <div id="flush_brand" className="accordion-collapse collapse show" aria-labelledby="brand_hd" data-bs-parent="">
                            <div className="accordion-body">
                                <ul className="b_list">{
                                    brand && Object.keys(brand).length > 0 && selectedCatg !== "" && brand[selectedCatg].length > 0 ? (
                                        brand[selectedCatg].map((each, index) => {
                                            return (
                                                <li key={index} onClick={e => {
                                                    if (e.currentTarget.classList.contains("selectedBd")) {
                                                        e.currentTarget.classList.remove("selectedBd")
                                                        setFilter({ ...filter, brand: false })
                                                    } else {
                                                        let selectedBd = document.querySelector("li.selectedBd")

                                                        if (selectedBd) {
                                                            selectedBd.classList.remove("selectedBd")
                                                        }

                                                        e.currentTarget.classList.add("selectedBd")

                                                        setFilter({ ...filter, brand: each })
                                                    }
                                                }}>{each}</li>
                                            )
                                        })
                                    ) : (
                                        <div className="empty emptyS">
                                            <p>------- &nbsp;  no data &nbsp; -------</p>
                                        </div>
                                    )
                                }
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Colour Selector */}
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="colour_hd">
                            <button className="accordion-button text-uppercase" type="button" data-bs-toggle="collapse" data-bs-target="#flush-colour" aria-expanded="false" aria-controls="flush-colour">
                                Colour
                            </button>
                        </h2>
                        <div id="flush-colour" className="accordion-collapse collapse show" aria-labelledby="colour_hd" data-bs-parent="">
                            <div className="accordion-body">
                                {
                                    colors && Object.keys(colors).length > 0 && selectedCatg !== "" && colors[selectedCatg].length > 0 ? (
                                        <div className="c_list">
                                            {colors[selectedCatg].map((each, index) => {
                                                return (
                                                    <input key={index} className="form-check-input" type="checkbox" style={{ backgroundColor: each }} onClick={e => {
                                                        if (e.currentTarget.classList.contains("cChecked")) {
                                                            e.currentTarget.checked = false
                                                            e.currentTarget.classList.remove("cChecked")
                                                            setFilter({ ...filter, color: false })
                                                        } else {
                                                            document.querySelectorAll("input.cChecked").forEach(g => {
                                                                g.classList.remove("cChecked")
                                                                g.checked = false
                                                            })

                                                            e.currentTarget.checked = true
                                                            e.currentTarget.classList.add("cChecked")
                                                            setFilter({ ...filter, color: each })
                                                        }
                                                    }} />
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <div className="empty emptyS">
                                            <p>------- &nbsp;  no data &nbsp; -------</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    {/* Sex */}
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="sex_hd">
                            <button className="accordion-button text-uppercase" type="button" data-bs-toggle="collapse" data-bs-target="#flush-sex" aria-expanded="false" aria-controls="flush-sex">
                                Sex
                            </button>
                        </h2>
                        <div id="flush-sex" className="accordion-collapse collapse show" aria-labelledby="sex_hd" data-bs-parent="">
                            <div className="accordion-body">
                                {
                                    sex && sex.length > 0 ? (

                                        sex.map((each, index) => {
                                            return (

                                                <div key={index} className="form-check py-1">
                                                    <input className="form-check-input me-3" type="checkbox" value={each} id={each} onClick={e => {
                                                        if (e.currentTarget.classList.contains("sChecked")) {
                                                            e.currentTarget.checked = false
                                                            e.currentTarget.classList.remove("sChecked")
                                                            setFilter({ ...filter, sex: false })
                                                        } else {
                                                            document.querySelectorAll("input.sChecked").forEach(u => {
                                                                u.classList.remove("sChecked")
                                                                u.checked = false
                                                            })

                                                            e.currentTarget.checked = true
                                                            e.currentTarget.classList.add("sChecked")
                                                            console.log(each)
                                                            setFilter({ ...filter, sex: each })
                                                        }
                                                    }} />
                                                    <label className="form-check-label text-capitalize" htmlFor={each}>
                                                        {" "}
                                                        {each}
                                                    </label>
                                                </div>
                                            )
                                        })

                                    ) : (
                                        <div className="empty emptyS">
                                            <p>------- &nbsp;  no data &nbsp; -------</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    {/* Size Selector */}
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="size_hd">
                            <button className="accordion-button text-uppercase" type="button" data-bs-toggle="collapse" data-bs-target="#flush-size" aria-expanded="false" aria-controls="flush-size">
                                Size
                            </button>
                        </h2>
                        <div id="flush-size" className="accordion-collapse collapse show" ari-labelledby="size_hd" data-bs-parent="">
                            <div className="accordion-body">
                                <ul className="s_list">
                                    {
                                        sizes_1 && sizes_2 && Object.keys(sizes_1).length > 0 && Object.keys(sizes_2).length > 0 ? selectedCatg === "crocs" || selectedCatg === "sneakers" ? (
                                            Object.entries(sizes_2).map(([key, value], index) => {
                                                return (
                                                    <li key={index} onClick={e => {
                                                        if (e.currentTarget.classList.contains("selectedSz")) {
                                                            e.currentTarget.classList.remove("selectedSz")
                                                            setFilter({ ...filter, size: false })
                                                        } else {
                                                            let selectedSz = document.querySelector("li.selectedSz")

                                                            if (selectedSz) {
                                                                selectedSz.classList.remove("selectedSz")
                                                            }

                                                            e.currentTarget.classList.add("selectedSz")

                                                            setFilter({ ...filter, size: value })
                                                        }
                                                    }}>{value}</li>
                                                )
                                            })
                                        ) : (
                                            Object.entries(sizes_1).map(([key, value], index) => {
                                                return (
                                                    <li key={index} onClick={e => {
                                                        if (e.currentTarget.classList.contains("selectedSz")) {
                                                            e.currentTarget.classList.remove("selectedSz")
                                                            setFilter({ ...filter, size: false })
                                                        } else {
                                                            let selectedSz = document.querySelector("li.selectedSz")

                                                            if (selectedSz) {
                                                                selectedSz.classList.remove("selectedSz")
                                                            }

                                                            e.currentTarget.classList.add("selectedSz")

                                                            setFilter({ ...filter, size: value })
                                                        }
                                                    }}>{value}</li>
                                                )
                                            })
                                        ) : (
                                            <div className="empty emptyS">
                                                <p>------- &nbsp;  no data &nbsp; -------</p>
                                            </div>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="offcanvas offcanvas-start ps-2" tabIndex="-1" id="filter" aria-labelledby="filterLabel">
                <div className="offcanvas-header pb-0 px-4 mt-2">
                    <h5 className="cartlistLabel heading">FILTERS</h5>
                    <button type="button" className="btn-close text-reset pe-3" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body pt-4">
                    <div className="accordion accordion-flush" id="m_filter">
                        {/* Brand Selector */}
                        <div className="accordion-item px-4">
                            <h2 className="accordion-header" id="brand_hd">
                                <button className="accordion-button text-uppercase" type="button" data-bs-toggle="collapse" data-bs-target="#flush_brand" aria-expanded="false" aria-controls="flush_brand">
                                    Brand
                                </button>
                            </h2>
                            <div id="flush_brand" className="accordion-collapse collapse show" aria-labelledby="brand_hd" data-bs-parent="">
                                <div className="accordion-body px-1">
                                    <ul className="b_list">{
                                        brand && Object.keys(brand).length > 0 && selectedCatg !== "" && brand[selectedCatg].length > 0 ? (
                                            brand[selectedCatg].map((each, index) => {
                                                return (
                                                    <li key={index} onClick={e => {
                                                        if (e.currentTarget.classList.contains("selectedBd")) {
                                                            e.currentTarget.classList.remove("selectedBd")
                                                            setFilter({ ...filter, brand: false })
                                                        } else {
                                                            let selectedBd = document.querySelector("li.selectedBd")

                                                            if (selectedBd) {
                                                                selectedBd.classList.remove("selectedBd")
                                                            }

                                                            e.currentTarget.classList.add("selectedBd")

                                                            setFilter({ ...filter, brand: each })
                                                        }
                                                    }}>{each}</li>
                                                )
                                            })
                                        ) : (
                                            <div className="empty emptyS">
                                                <p>------- &nbsp;  no data &nbsp; -------</p>
                                            </div>
                                        )
                                    }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Colour Selector */}
                        <div className="accordion-item px-4">
                            <h2 className="accordion-header" id="colour_hd">
                                <button className="accordion-button text-uppercase" type="button" data-bs-toggle="collapse" data-bs-target="#flush-colour" aria-expanded="false" aria-controls="flush-colour">
                                    Colour
                                </button>
                            </h2>
                            <div id="flush-colour" className="accordion-collapse collapse show" aria-labelledby="colour_hd" data-bs-parent="">
                                <div className="accordion-body px-1">
                                    {
                                        colors && Object.keys(colors).length > 0 && selectedCatg !== "" && colors[selectedCatg].length > 0 ? (
                                            <div className="c_list">
                                                {colors[selectedCatg].map((each, index) => {
                                                    return (
                                                        <input key={index} className="form-check-input" type="checkbox" style={{ backgroundColor: each }} onClick={e => {
                                                            if (e.currentTarget.classList.contains("cChecked")) {
                                                                e.currentTarget.checked = false
                                                                e.currentTarget.classList.remove("cChecked")
                                                                setFilter({ ...filter, color: false })
                                                            } else {
                                                                document.querySelectorAll("input.cChecked").forEach(g => {
                                                                    g.classList.remove("cChecked")
                                                                    g.checked = false
                                                                })

                                                                e.currentTarget.checked = true
                                                                e.currentTarget.classList.add("cChecked")
                                                                setFilter({ ...filter, color: each })
                                                            }
                                                        }} />
                                                    )
                                                })}
                                            </div>
                                        ) : (
                                            <div className="empty emptyS">
                                                <p>------- &nbsp;  no data &nbsp; -------</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        {/* Sex */}
                        <div className="accordion-item px-4">
                            <h2 className="accordion-header" id="sex_hd">
                                <button className="accordion-button text-uppercase" type="button" data-bs-toggle="collapse" data-bs-target="#flush-sex" aria-expanded="false" aria-controls="flush-sex">
                                    Sex
                                </button>
                            </h2>
                            <div id="flush-sex" className="accordion-collapse collapse show" aria-labelledby="sex_hd" data-bs-parent="">
                                <div className="accordion-body px-1">
                                    {
                                        sex && sex.length > 0 ? (

                                            sex.map((each, index) => {
                                                return (

                                                    <div key={index} className="form-check py-1">
                                                        <input className="form-check-input me-3" type="checkbox" value={each} id={each} onClick={e => {
                                                            if (e.currentTarget.classList.contains("sChecked")) {
                                                                e.currentTarget.checked = false
                                                                e.currentTarget.classList.remove("sChecked")
                                                                setFilter({ ...filter, sex: false })
                                                            } else {
                                                                document.querySelectorAll("input.sChecked").forEach(u => {
                                                                    u.classList.remove("sChecked")
                                                                    u.checked = false
                                                                })

                                                                e.currentTarget.checked = true
                                                                e.currentTarget.classList.add("sChecked")
                                                                console.log(each)
                                                                setFilter({ ...filter, sex: each })
                                                            }
                                                        }} />
                                                        <label className="form-check-label text-capitalize" htmlFor={each}>
                                                            {" "}
                                                            {each}
                                                        </label>
                                                    </div>
                                                )
                                            })

                                        ) : (
                                            <div className="empty emptyS">
                                                <p>------- &nbsp;  no data &nbsp; -------</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        {/* Size Selector */}
                        <div className="accordion-item px-4">
                            <h2 className="accordion-header" id="size_hd">
                                <button className="accordion-button text-uppercase" type="button" data-bs-toggle="collapse" data-bs-target="#flush-size" aria-expanded="false" aria-controls="flush-size">
                                    Size
                                </button>
                            </h2>
                            <div id="flush-size" className="accordion-collapse collapse show" ari-labelledby="size_hd" data-bs-parent="">
                                <div className="accordion-body px-1">
                                    <ul className="s_list">
                                        {
                                            sizes_1 && sizes_2 && Object.keys(sizes_1).length > 0 && Object.keys(sizes_2).length > 0 ? selectedCatg === "crocs" || selectedCatg === "sneakers" ? (
                                                Object.entries(sizes_2).map(([key, value], index) => {
                                                    return (
                                                        <li key={index} onClick={e => {
                                                            if (e.currentTarget.classList.contains("selectedSz")) {
                                                                e.currentTarget.classList.remove("selectedSz")
                                                                setFilter({ ...filter, size: false })
                                                            } else {
                                                                let selectedSz = document.querySelector("li.selectedSz")

                                                                if (selectedSz) {
                                                                    selectedSz.classList.remove("selectedSz")
                                                                }

                                                                e.currentTarget.classList.add("selectedSz")

                                                                setFilter({ ...filter, size: value })
                                                            }
                                                        }}>{value}</li>
                                                    )
                                                })
                                            ) : (
                                                Object.entries(sizes_1).map(([key, value], index) => {
                                                    return (
                                                        <li key={index} onClick={e => {
                                                            if (e.currentTarget.classList.contains("selectedSz")) {
                                                                e.currentTarget.classList.remove("selectedSz")
                                                                setFilter({ ...filter, size: false })
                                                            } else {
                                                                let selectedSz = document.querySelector("li.selectedSz")

                                                                if (selectedSz) {
                                                                    selectedSz.classList.remove("selectedSz")
                                                                }

                                                                e.currentTarget.classList.add("selectedSz")

                                                                setFilter({ ...filter, size: value })
                                                            }
                                                        }}>{value}</li>
                                                    )
                                                })
                                            ) : (
                                                <div className="empty emptyS">
                                                    <p>------- &nbsp;  no data &nbsp; -------</p>
                                                </div>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rgt">
                <Outlet context={[selectCatg, filter]} />
            </div>
        </div>
    );
};

export default User;