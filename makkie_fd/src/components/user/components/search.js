import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { domain } from "../../helpers";
import { useParams } from "react-router-dom";
import { Product_DSP } from "../../dsp";
import { sortData } from "../../filter";
import { Spinner2 } from "../../misc";

const Search = () => {
    const { query } = useParams()
    const { cart, wishlist, search, appData } = useSelector(state => state)
    const Dispatch = useDispatch()

    useEffect(() => {
        if (search.fetched === false) {
            (async () => {
                const response = await axios.get(domain + "products/search?i=marky&q=" + query);
                Dispatch({ type: "createSearchData", payload: response.data });
            })();
        }

        return
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [filter, setFilter] = useState({
        brand: false,
        color: false,
        sex: false,
        size: false
    })

    // Data
    const { appBrands, appColors, sex } = appData
    const data = !filter.brand && !filter.color && !filter.sex && !filter.size ? search.data : (sortData(search.data, filter.brand, filter.color, filter.sex, filter.size))

    return (
        <Fragment>
            <div className="container category body w_1200 d-flex justify-content-between m-auto">
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
                                        appBrands && appBrands.length > 0 ? (
                                            appBrands.map((each, index) => {
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
                                        appColors && Object.keys(appColors).length > 0 ? (
                                            <div className="c_list">
                                                {Object.entries(appColors).map(([key, value], index) => {
                                                    return (
                                                        <input key={index} className="form-check-input" type="checkbox" style={{ backgroundColor: value }} onClick={e => {
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
                                                                setFilter({ ...filter, color: key })
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
                                        {/* {
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
                                        } */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rgt">
                    {/* Cards */}
                    <div className="pt-2">
                        <button className="btn btn-outline-secondary d-lg-none bg-transparent mb-4 ms-1 p-1" style={{ borderColor: "#adc0cf" }} type="button" data-bs-toggle="offcanvas" data-bs-target="#filter" aria-controls="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.3em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
                                <path fill="#adc0cf " d="M2 4a2 2 0 0 1 2-2h12a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Zm2 6a2 2 0 0 1 2-2h8a2 2 0 1 1 0 4H6a2 2 0 0 1-2-2Zm4 4a2 2 0 1 0 0 4h4a2 2 0 1 0 0-4H8Z" />
                            </svg>
                        </button>

                        <div className="offcanvas offcanvas-start ps-2" tabIndex="-1" id="filter" aria-labelledby="filterLabel">
                            <div className="offcanvas-header pb-0 px-4 mt-2">
                                <h5 className="cartlistLabel heading">FILTERS</h5>
                                <button type="button" className="btn-close text-reset pe-3" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body pt-1">
                                <div className="accordion accordion-flush" id="m_filter">
                                    {/* Brand Selector */}
                                    <div className="accordion-item px-4">
                                        <h2 className="accordion-header" id="brand_hd">
                                            <button className="accordion-button text-uppercase" type="button" data-bs-toggle="collapse" data-bs-target="#flush_brand" aria-expanded="false" aria-controls="flush_brand">
                                                Brand
                                            </button>
                                        </h2>
                                        <div id="flush_brand" className="accordion-collapse collapse show" aria-labelledby="brand_hd" data-bs-parent="#m_filter">
                                            <div className="accordion-body">
                                                <ul className="b_list">
                                                    <li>D&G</li>
                                                    <li>Nike</li>
                                                    <li>Louis Vuitton</li>
                                                    <li>Prada</li>
                                                    <li>Adidas</li>
                                                    <li>Medico</li>
                                                    <li>levenc</li>
                                                    <li>Anna</li>
                                                    <li>Chanel</li>
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
                                        <div id="flush-colour" className="accordion-collapse collapse show" aria-labelledby="colour_hd" data-bs-parent="#m_filter">
                                            <div className="accordion-body">
                                                <ul className="c_list">
                                                    <li style={{ backgroundColor: "silver" }}></li>
                                                    <li style={{ backgroundColor: "purple" }}></li>
                                                    <li style={{ backgroundColor: "pink" }}></li>
                                                    <li style={{ backgroundColor: "yellow" }}></li>
                                                    <li style={{ backgroundColor: "mediumseagreen" }}></li>
                                                    <li style={{ backgroundColor: "black" }}></li>
                                                    <li style={{ backgroundColor: "navy" }}></li>
                                                    <li style={{ backgroundColor: "orchid" }}></li>
                                                    <li style={{ backgroundColor: "blueviolet" }}></li>
                                                    <li style={{ backgroundColor: "brown" }}></li>
                                                    <li style={{ backgroundColor: "orange" }}></li>
                                                </ul>
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
                                        <div id="flush-sex" className="accordion-collapse collapse show" aria-labelledby="sex_hd" data-bs-parent="#m_filter">
                                            <div className="accordion-body">
                                                <div className="form-check py-1">
                                                    <input className="form-check-input me-3" type="checkbox" value="" id="male" />
                                                    <label className="form-check-label" htmlFor="male">
                                                        {" "}
                                                        Male
                                                    </label>
                                                </div>
                                                <div className="form-check py-1">
                                                    <input className="form-check-input me-3" type="checkbox" value="" id="female" />
                                                    <label className="form-check-label" htmlFor="female">
                                                        {" "}
                                                        Female{" "}
                                                    </label>
                                                </div>
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
                                        <div id="flush-size" className="accordion-collapse collapse show" ari-labelledby="size_hd" data-bs-parent="#m_filter">
                                            <div className="accordion-body">
                                                <ul className="s_list">
                                                    <li>S</li>
                                                    <li>M</li>
                                                    <li>L</li>
                                                    <li>XL</li>
                                                    <li>XXL</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Fragment>
                            {search.fetched ? (
                                data && data.length > 0 ?
                                    (
                                        <Fragment >
                                            <div className="grid">
                                                {data.map((item, index) => {
                                                    return (
                                                        Product_DSP(domain, "scrubs", index, item, cart, wishlist, Dispatch)
                                                    )
                                                })}
                                            </div>
                                        </Fragment>
                                    ) : (
                                        <div className="empty">
                                            <p>------- &nbsp;  no data &nbsp; -------</p>
                                        </div>
                                    )
                            ) : (
                                <Spinner2 />
                            )}
                        </Fragment>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Search;
