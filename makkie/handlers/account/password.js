const { hash } = require("../../lib/helper");
const { client, database } = require("../../lib/mongo");

// Update Delivery Location
const password = async (data, callback) => {
    // Check Method
    switch (data.method) {
        case "options":
            callback(200, {}, "json");
            break;

        case "post":
            // Validate Data
            const id = typeof data.payload.id === "string" && data.payload.id.trim().length > 0 ? data.payload.id.trim() : false;
            const old = typeof data.payload.old === "string" && data.payload.old.trim().length > 0 ? data.payload.old.trim() : false;
            const new1 = typeof data.payload.new1 === "string" && data.payload.new1.trim().length > 0 ? data.payload.new1.trim() : false;

            if (id && old && new1) {
                // Check to database
                try {
                    const directory = client.db(database);
                    const sub_directory = directory.collection("users");
                    const data = await sub_directory.findOne({ _id: id });

                    if (data !== null && data !== undefined) {
                        // Hash Old password
                        const hashedPasswordO = hash(old)

                        // Verify Old Password
                        if (data.password === hashedPasswordO) {
                            // Hash New Password
                            const hashedPasswordN = hash(new1)

                            // Save New Password
                            await sub_directory.updateOne({ _id: id }, { $set: { "password": hashedPasswordN } });

                            // Return
                            callback(200, {}, "json");
                        } else {
                            // Return
                            callback(400, { message: "Wrong Password" }, "json");
                        }
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

module.exports = password