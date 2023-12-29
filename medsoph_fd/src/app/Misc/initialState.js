// Initial State Of Store
// =============================================================
import testData from "./testData";

// Component
const InitialState = async (callback) => {
    // Define DAta
    const data = {};

    // Populate
    data["personal"] = {}

    data["company"] = {}

    data["hourly"] = {}

    data["lab_activities"] = {}

    data["admin"] = {}

    data["revenue"] = {}

    data["services"] = {}

    data["stats"] = {}

    data["storage"] = {}

    data["testKits"] = {}

    data["tests"] = {}

    data["top_5"] = {}

    data["users"] = {}

    data["fetched"] = {}

    data["database"] = testData;
};

export default InitialState;
