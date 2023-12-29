const { client, database, ObjectId } = require("../../lib/mongo");
const { saveImages } = require("../../lib/file");

// Create Product
const createProduct = (data, callback) => {
    // Check Method
    switch (data.method) {
        case "options":
            callback(200, {}, "json");
            break;

        case "post":
            // Validate Data
            const title = typeof data.payload.details.title === "string" && data.payload.details.title.trim().length > 0 ? data.payload.details.title.trim() : false;
            const brand = typeof data.payload.details.brand === "string" && data.payload.details.brand.trim().length > 0 ? data.payload.details.brand.trim() : false;
            const dColor = typeof data.payload.details.dColor === "string" && data.payload.details.dColor.trim().length > 0 ? data.payload.details.dColor.trim() : false;
            const sold = typeof data.payload.details.sold === "string" && data.payload.details.sold.trim().length > 0 ? data.payload.details.sold.trim() : false;
            const sex = typeof data.payload.details.sex === "string" && data.payload.details.sex.trim().length > 0 ? data.payload.details.sex.trim() : false;
            const quantity = typeof data.payload.details.quantity === "string" && data.payload.details.quantity.trim().length > 0 ? data.payload.details.quantity.trim() : false;
            const price = typeof data.payload.details.price === "string" && data.payload.details.price.trim().length > 0 ? data.payload.details.price.trim() : false;
            const colors = typeof data.payload.details.colors === "object" ? data.payload.details.colors : false;
            const category = typeof data.payload.details.category === "string" && data.payload.details.category.trim().length > 0 ? data.payload.details.category.trim() : false;
            const tags = typeof data.payload.details.tags === "string" && data.payload.details.tags.trim().length > 0 ? data.payload.details.tags.trim() : false;
            const sizes = typeof data.payload.details.sizes === "object" ? data.payload.details.sizes : false;
            const misc = typeof data.payload.details.misc === "object" ? data.payload.details.misc : false;
            const main = typeof data.payload.images.main === "string" && data.payload.images.main.trim().length > 0 ? data.payload.images.main.trim() : false;

            if (title && brand && dColor && sex && quantity && sold && price && colors && category && tags && sizes && misc) {
                // Check Images
                if (main) {
                    // Sav Images
                    saveImages(data.payload.images, async (err, file) => {
                        if (!err && file) {
                            // Define Response
                            const response = {
                                _id: new ObjectId(Date.now()),
                                title: title,
                                brand: brand,
                                dColor: dColor,
                                sold: sold,
                                sex: sex,
                                sizes: sizes,
                                quantity: quantity,
                                order: {
                                    title: title,
                                    brand: brand,
                                    category: category,
                                    quantity: 1,
                                    size: "",
                                    color: "",
                                    sex: sex,
                                    price: price,
                                    image: file.main
                                },
                                price: price,
                                colors: colors,
                                tags: tags.split(", "),
                                category: category,
                                misc: misc,
                                images: file,
                            };

                            let target_1 = "brand." + category
                            let target_2 = "colors." + category

                            // Send to database
                            try {
                                const directory = client.db(database);
                                const sub_directory_1 = directory.collection("products");
                                await sub_directory_1.insertOne(response);
                                const sub_directory_2 = directory.collection("misc");
                                await sub_directory_2.updateOne({ _id: new ObjectId("64a317d76b65613a27902143") }, { $addToSet: { [target_1]: brand, [target_2]: { $each: Object.keys(colors) }, appBrands: brand } });

                                if (misc.indexOf("trending") > -1) {
                                    const sub_directory_3 = directory.collection("trending");
                                    await sub_directory_3.insertOne(response);
                                }

                                if (misc.indexOf("newArrival") > -1) {
                                    const sub_directory_4 = directory.collection("newArrivals");
                                    await sub_directory_4.insertOne(response);
                                }

                                // Return
                                callback(200, response, "json");
                            } catch (error) {
                                console.warn(error)
                                // Return
                                callback(502, { message: "Oops, Something Went Wrong, Try Again Later" }, "json");
                            } finally {
                                client.close;
                            }
                        } else {
                            callback(400, { message: file.error }, "json");
                        }
                    });
                } else {
                    callback(400, { message: "Main Image Missing" }, "json");
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

module.exports = createProduct