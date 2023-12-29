const { client, database, ObjectId } = require("../../lib/mongo");
const { deleteImages } = require("../../lib/file");

// Delete product
const deleteProduct = (data, callback) => {
    // Check Method
    switch (data.method) {
        case "options":
            callback(200, {}, "json");
            break;

        case "delete":
            // Validate Data
            const id = typeof data.query.t === "string" && data.query.t.trim().length > 0 ? data.query.t.trim() : false;
            const collection = typeof data.query.c === "string" && data.query.c.trim().length > 0 ? data.query.c.trim() : false;
            const images = typeof data.payload.images === "object" ? data.payload.images : false;
            const misc = typeof data.payload.misc === "object" ? data.payload.misc : false;

            if (id && collection && images && misc) {
                // delete images
                deleteImages(images, async (err) => {
                    if (!err) {
                        // Fetch
                        try {
                            const directory = client.db(database);
                            const sub_directory = directory.collection("products");
                            await sub_directory.deleteOne({ _id: new ObjectId(id) });

                            if (misc.indexOf("trending") > -1) {
                                const sub_directory_3 = directory.collection("trending");
                                await sub_directory_3.deleteOne({ _id: new ObjectId(id) });
                            }

                            if (misc.indexOf("newArrival") > -1) {
                                const sub_directory_4 = directory.collection("newArrivals");
                                await sub_directory_4.deleteOne({ _id: new ObjectId(id) });
                            }

                            // Return
                            callback(200, {}, "json");
                        } catch (error) {
                            // Return
                            callback(502, { message: "Oops, Something Went Wrong, Try Again Later" }, "json");
                        } finally {
                            client.close;
                        }
                    } else {
                        callback(502, { message: "Oops, Something Went Wrong, Try Again Later" }, "json");
                    }
                })
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
module.exports = deleteProduct;