const { client, database, ObjectId } = require("../../lib/mongo");

// Delete product
const deleteUser = async (data, callback) => {
    // Check Method
    switch (data.method) {
        case "options":
            callback(200, {}, "json");
            break;

        case "delete":
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
                        callback(400, { message: "Invalid User Account" }, "json");
                    } else {
                        // Hash password
                        const hashedPassword = hash(password)

                        if (hashedPassword === data.password) {
                            // Delete User
                            await sub_directory.deleteOne({ _id: new ObjectId(id) });

                            // Return
                            callback(200, data, "json");
                        } else {
                            // Return
                            callback(400, { message: "Wrong Password" }, "json");
                        }
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

// Export Module
module.exports = deleteUser;