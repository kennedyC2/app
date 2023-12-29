const { client, database, ObjectId } = require("../../lib/mongo");

// Get Product List
const getTrending = async (data, callback) => {
    // Check Method
    switch (data.method) {
        case "options":
            callback(200, {}, "json");
            break;

        case "get":
            // Validate Data
            const id = typeof data.query.i === "string" && data.query.i.trim().length > 0 ? data.query.i.trim() : false;
            const collection = typeof data.query.c === "string" && data.query.c.trim().length > 0 ? data.query.c.trim() : false;
            const all = typeof data.query.a === "string" && data.query.a.trim().length > 0 && data.query.a.trim() == "true" ? true : false;

            if (id) {
                // Fetch
                if (all && collection) {
                    try {
                        const _data = []
                        const directory = client.db(database);
                        const sub_directory = directory.collection(collection);
                        const data = sub_directory.find({});

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
                    try {
                        const directory = client.db(database);
                        const sub_directory = directory.collection(collection);
                        const data = await sub_directory.findOne({ _id: new ObjectId(id) });

                        // Return
                        callback(200, data, "json");
                    } catch (error) {
                        // Return
                        callback(502, { message: "Oops, Something Went Wrong, Try Again Later" }, "json");
                    } finally {
                        client.close;
                    }
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

module.exports = getTrending