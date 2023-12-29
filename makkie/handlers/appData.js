const { client, database } = require("../lib/mongo");

// Get appData
const appData = async (data, callback) => {
    // Check Method
    switch (data.method) {
        case "options":
            callback(200, {}, "json");
            break;

        case "get":
            try {
                const directory = client.db(database);
                const sub_directory = directory.collection("misc");
                const data = await sub_directory.find({}, { _id: 0 }).toArray();

                // Remove ID
                delete data[0]._id

                // Return
                callback(200, data[0], "json");
            } catch (error) {
                // Return
                console.log(error);
                callback(502, { error: "Oops, Something Went Wrong, Try Again Later" }, "json");
            } finally {
                client.close;
            }
            break;

        default:
            callback(405, {}, "json");
            break;
    }
};

module.exports = appData