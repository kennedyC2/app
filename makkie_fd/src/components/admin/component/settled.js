import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AdminPending_DSP } from "../../dsp";
import { domain } from "../../helpers";
import { Spinner2 } from "../../misc";

const SettledList = () => {
    const Dispatch = useDispatch()
    const { user, completed } = useSelector(state => state)
    const [targetD, setTargetD] = useState(0)

    return (
        <Fragment>
            <div className="mt-4 sub_list">
                <div className="d-flex justify-content-between">
                    <div className="lft">
                        <ul className="d_list">
                            {completed.fetched ? (
                                completed.data.length > 0 ? (
                                    completed.data.map((each, index) => {
                                        return (
                                            <li key={"cdc" + index} onClick={() => setTargetD(index)}>
                                                <p className="my-0">{each._id.toUpperCase()}</p>
                                                <p className="my-0 pe-2 text-capitalize text-end">Processed - {each.date}</p>
                                            </li>
                                        )
                                    })
                                ) : (
                                    <div className="empty">
                                        <p>---- &nbsp;  no data &nbsp; ----</p>
                                    </div>
                                )
                            ) : (
                                <Spinner2 />
                            )}
                        </ul>
                    </div>
                    <div className="rgt  px-3">
                        {completed && completed.length > 0 ? AdminPending_DSP(completed, user, domain, targetD, Dispatch) : ""}
                    </div>
                </div>
            </div>

            <Link className="btn btn-primary rounded-circle" title="Go to Home" to="/" role="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" className="bi bi-house rounded-circle" viewBox="0 0 16 16">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                </svg>
            </Link>

        </Fragment >
    );
};

export default SettledList;
