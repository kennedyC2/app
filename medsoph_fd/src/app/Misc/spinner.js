// Spinner
const Spinner = () => {
    return (
        <div className="text-center m-auto" id="spin">
            <div className="spinner-grow" role="status" style={{ color: "rgb(129 151 185)" }}>
                <span className="visually-hidden ">Loading...</span>
            </div>
            <p className="m-3 ps-3" style={{ fontSize: ".9rem", color: "rgb(129 151 185)" }}>
                Please Wait ...
            </p>
        </div>
    );
};

// Export
export default Spinner;
