// Import Dependencies
import React, { Fragment } from "react";

// Component
const renderResults = (props) => {
    const { result } = props;

    const Render = () => {
        const compiled = {};

        for (const category in result) {
            compiled[category] = [];
            for (const item in result[category]) {
                if (compiled[category] !== undefined) {
                    compiled[category].push(`${item}:${result[category][item]}`);
                } else {
                    compiled[category] = [];
                    compiled[category].push(`${item}:${result[category][item]}`);
                }
            }
        }

        return compiled;
    };

    return (
        <Fragment>
            <div className="my-4">{Object.keys(result).length < 1 ? "" : <h6 className="text-decoration-underline text-center text-uppercase mt-5">Result</h6>}</div>
            {Object.keys(Render()).map((key, index) => (
                <div key={index}>
                    <p style={{ marginBottom: ".8rem" }}>{key.replaceAll("_", " ")}:</p>
                    <table key={index} className="table table-bordered" style={{ width: "90%" }}>
                        <tbody>
                            {Render()[key].map((items, index) => (
                                <tr key={index} style={{ fontSize: "13px" }}>
                                    <td>{index + 1}</td>
                                    <td>{items.split(":")[0].replaceAll("_", " ")}</td>
                                    <td>{items.split(":")[1]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </Fragment>
    );
};

export default renderResults;
