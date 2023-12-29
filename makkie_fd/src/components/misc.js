export const Spinner = (color, spinner, box_width) => {
    return (
        <div className="d-flex justify-content-center" style={{ width: box_width }} >
            <div className="spinner-border" style={{ color: color, width: spinner, height: spinner }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export const Spinner2 = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ width: "100%", height: "500px" }}>
            <div className="spinner-border" style={{ color: "#adc0cf", width: "3rem", height: "3rem" }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}