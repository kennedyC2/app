import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import { domain } from "../../helpers";
import { useLocation, useOutletContext } from "react-router-dom";
import { Product_DSP } from "../../dsp";
import { sortData } from "../../filter";
import { Spinner2 } from "../../misc";

const Brooches = ({ FetchData }) => {
    const [selectCatg, filter] = useOutletContext()
    const { pathname } = useLocation()
    const { cart, wishlist, brooches } = useSelector(state => state)
    const Dispatch = useDispatch()
    const collection = pathname.split("/")[2]

    useEffect(() => {
        // Set Brand
        selectCatg(collection)

        return
    }, [selectCatg, collection]);

    useEffect(() => {
        if (brooches.fetched === false) {
            FetchData("products", "brooches", Dispatch, "createBrooches")
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(brooches)

    // Data
    const data = !filter.brand && !filter.color && !filter.sex && !filter.size ? brooches.data : sortData(brooches.data, filter.brand, filter.color, filter.sex, filter.size)

    return (
        <Fragment>
            {/* Cards */}
            <div className="w-100 h-100">
                <button className="btn btn-outline-secondary d-lg-none bg-transparent mb-4 ms-1 p-1" style={{ borderColor: "#adc0cf" }} type="button" data-bs-toggle="offcanvas" data-bs-target="#filter" aria-controls="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.3em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
                        <path fill="#adc0cf " d="M2 4a2 2 0 0 1 2-2h12a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Zm2 6a2 2 0 0 1 2-2h8a2 2 0 1 1 0 4H6a2 2 0 0 1-2-2Zm4 4a2 2 0 1 0 0 4h4a2 2 0 1 0 0-4H8Z" />
                    </svg>
                </button>

                <Fragment>
                    {brooches.fetched ? (
                        data && data.length > 0 ?
                            (
                                <Fragment >
                                    <div className="grid">
                                        {data.map((item, index) => {
                                            return (
                                                Product_DSP(domain, "brooches", index, item, cart, wishlist, Dispatch)
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
            </div >
        </Fragment >
    );
};

export default Brooches;
