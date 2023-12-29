const { client, database } = require("../../lib/mongo");

// Get Product List
const getUnsettled = async (data, callback) => {
    // Check Method
    switch (data.method) {
        case "options":
            callback(200, {}, "json");
            break;

        case "get":
            // Fetch
            try {
                const _data = []
                const directory = client.db(database);
                const sub_directory = directory.collection("pending");
                const data = sub_directory.find({})

                for await (const each of data) {
                    _data.push(each)
                }

                // Return
                callback(200, _data, "json");
            } catch (error) {
                // Return
                callback(502, { message: "Oops, Something Went Wrong, Try Again Later" }, "json");
            } finally {
                client.close;
            }

            break;

        default:
            callback(405, {}, "json");
            break;
    }
};

module.exports = getUnsettled