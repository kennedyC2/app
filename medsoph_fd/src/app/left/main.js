// ========================================================================
//                             Left
// ========================================================================

// Import libraries
import LeftTop from "./components/l-top";
import LeftBottom from "./components/l-bottom";

// body
const Left = (props) => {
    const { setSpin } = props;
    return (
        <div className="left container-fluid col-lg-3 col-xl-2 vh-100 position-fixed top-0 start-0 d-none d-lg-block">
            <LeftTop />
            <LeftBottom tag="desk" setSpin={setSpin} />
        </div>
    );
};

export default Left;
