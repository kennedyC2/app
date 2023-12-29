// ========================================================================
//                             Right
// ========================================================================

// Import libraries
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/main";
import Register from "./components/register/main";
import Unsettled from "./components/unsettled/main";
import Database from "./components/settled/main";
import Users from "./components/users/main";
// import TestKits from "./components/testkits/main";
import Services from "./components/services/main";
import Profile from "./components/profile/main";
import Payments from "./components/payment/main";

// body
const Right = (props) => {
    const { setSpin } = props;

    return (
        <div className="right col-lg-9 col-xl-10">
            <div className="body">
                <Routes>
                    <Route path="/" exact element={<Dashboard setSpin={setSpin} />} />
                    <Route path="/register" exact element={<Register setSpin={setSpin} />} />
                    <Route path="/unsettled" exact element={<Unsettled setSpin={setSpin} />} />
                    <Route path="/settled" exact element={<Database setSpin={setSpin} />} />
                    <Route path="/users" exact element={<Users setSpin={setSpin} />} />
                    {/* <Route path="/testkits" exact element={<TestKits setSpin={setSpin} />} /> */}
                    <Route path="/services" exact element={<Services setSpin={setSpin} />} />
                    <Route path="/profile" exact element={<Profile setSpin={setSpin} />} />
                    <Route path="/payment" exact element={<Payments setSpin={setSpin} />} />
                </Routes>
            </div>
        </div>
    );
};

export default Right;
