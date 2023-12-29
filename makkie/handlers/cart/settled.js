const { client, database, ObjectId } = require("../../lib/mongo");

// Create Cart
const closeCart = async (data, callback) => {
    // Check Method
    switch (data.method) {
        case "options":
            callback(200, {}, "json");
            break;

        case "post":
            // Validate Data
            const _data = typeof data.payload === "object" ? data.payload : false;

            if (_data) {
                // Send to database
                try {
                    const directory = client.db(database);
                    const sub_directory_1 = directory.collection("pending");
                    await sub_directory_1.deleteOne({ _id: new ObjectId(_data.product) });
                    const sub_directory_2 = directory.collection("history");
                    await sub_directory_2.updateOne({ _id: new ObjectId(_data.product) }, { $set: { "status": "Processed" } });
                    const sub_directory_3 = directory.collection("user");
                    const datm = await sub_directory_3.findOne({ _id: new ObjectId(_data.user) });

                    // Check pending
                    if (datm.pending.length >= 10) {
                        // Remove oldest
                        datm.pending.shift()

                        delete datm._id

                        // Replace OLd
                        await sub_directory_3.replaceOne({ _id: new ObjectId(_data.user) }, datm, { upsert: true });
                    }

                    // Return
                    callback(200, response, "json");
                } catch (error) {
                    // Return
                    console.log(error)
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

module.exports = closeCart