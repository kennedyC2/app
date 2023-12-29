const { client, database } = require("../../lib/mongo");

// Update Delivery Location
const delivery = async (data, callback) => {
    // Check Method
    switch (data.method) {
        case "options":
            callback(200, {}, "json");
            break;

        case "post":
            // Validate Data
            const id = typeof data.payload.id === "string" && data.payload.id.trim().length > 0 ? data.payload.id.trim() : false;
            const delivery = typeof data.payload.delivery === "string" && data.payload.delivery.trim().length > 0 ? data.payload.delivery.trim() : false;

            if (id && delivery) {
                // Check to database
                try {
                    const directory = client.db(database);
                    const sub_directory = directory.collection("users");
                    const data = await sub_directory.findOne({ _id: id });

                    if (data !== null && data !== undefined) {
                        await sub_directory.updateOne({ _id: id }, { $set: { "delivery": delivery } });

                        data.delivery = delivery
                        // Return
                        callback(200, data, "json");
                    } else {
                        // Return
                        callback(400, { message: "User Account does not exist" }, "json");
                    }
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

module.exports = delivery