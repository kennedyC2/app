const { client, database, ObjectId } = require("../../lib/mongo");
const { saveImages } = require("../../lib/file");

// Update Product
const updateUser = async (data, callback) => {
    // Check Method
    switch (data.method) {
        case "options":
            callback(200, {}, "json");
            break;

        case "update":
            // Validate Data
            const id = typeof data.payload.details.id === "string" && data.payload.details.id.trim().length > 0 ? data.payload.details.id.trim() : false;
            const password = typeof data.payload.details.password === "string" && data.payload.details.password.trim().length > 0 ? data.payload.details.password.trim() : false;

            if (id && password) {
                // Check to database
                try {
                    const directory = client.db(database);
                    const sub_directory = directory.collection("users");
                    const data = await sub_directory.findOne({ _id: new ObjectId(id) });

                    if (data === null || data === undefined) {
                        // Return
                        callback(400, { message: "User with email does not exist, Try Signing Up On Webpage" }, "json");
                    } else {
                        // Hash password
                        const hashedPassword = hash(password)

                        // Delete ID
                        delete data["_id"]

                        // Update Password
                        data["password"] = hashedPassword

                        // Save
                        await sub_directory.replaceOne({ _id: new ObjectId(id) }, { $set: data }, { upsert: true });

                        // Return
                        callback(200, response, "json");
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

module.exports = updateUser
