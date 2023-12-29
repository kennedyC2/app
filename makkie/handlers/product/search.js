const { client, database, ObjectId } = require("../../lib/mongo");

// Get Product List
const searchProduct = async (data, callback) => {
    // Check Method
    switch (data.method) {
        case "options":
            callback(200, {}, "json");
            break;

        case "get":
            // Validate Data
            const query = typeof data.query.q === "string" && data.query.q.trim().length > 0 ? data.query.q.trim() : false;

            // console.log(data.query.q)
            if (query) {
                // Fetch
                try {
                    const _data = []
                    const directory = client.db(database);
                    const sub_directory = directory.collection("products");
                    const data = sub_directory.find({ tags: query })

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
            } else {
                callback(400, { message: "Missing Required Fields" }, "json");
            }

            break;

        default:
            callback(405, {}, "json");
            break;
    }
};

module.exports = searchProduct