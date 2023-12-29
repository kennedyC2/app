const { client, database, ObjectId } = require("../../lib/mongo");

// Delete product
const deleteNewArrivals = async (data, callback) => {
    // Check Method
    switch (data.method) {
        case "options":
            callback(200, {}, "json");
            break;

        case "delete":
            // Validate Data
            const id = typeof data.query.t === "string" && data.query.t.trim().length > 0 ? data.query.t.trim() : false;
            const collection = typeof data.query.c === "string" && data.query.c.trim().length > 0 ? data.query.c.trim() : false;

            if (id && collection) {
                // Fetch
                try {
                    const directory = client.db(database);
                    const sub_directory = directory.collection(collection);
                    await sub_directory.deleteOne({ _id: new ObjectId(id) });
                    const sub_directory_2 = directory.collection("products");
                    await sub_directory_2.updateOne({ _id: new ObjectId(id) }, { $pull: { misc: "newArrival" } });

                    // Return
                    callback(200, {}, "json");
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

// Export Module
module.exports = deleteNewArrivals;