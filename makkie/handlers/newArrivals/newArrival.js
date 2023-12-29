const { client, database, ObjectId } = require("../../lib/mongo");

// Create Product
const createNewArrival = async (data, callback) => {
    // Check Method
    switch (data.method) {
        case "options":
            callback(200, {}, "json");
            break;

        case "post":
            // Validate Data
            const title = typeof data.payload.title === "string" && data.payload.title.trim().length > 0 ? data.payload.title.trim() : false;
            const brand = typeof data.payload.brand === "string" && data.payload.brand.trim().length > 0 ? data.payload.brand.trim() : false;
            const dColor = typeof data.payload.dColor === "string" && data.payload.dColor.trim().length > 0 ? data.payload.dColor.trim() : false;
            const sold = typeof data.payload.sold === "string" && data.payload.sold.trim().length > 0 ? data.payload.sold.trim() : false;
            const sex = typeof data.payload.sex === "string" && data.payload.sex.trim().length > 0 ? data.payload.sex.trim() : false;
            const sizes = typeof data.payload.sizes === "object" ? data.payload.sizes : false;
            const quantity = typeof data.payload.quantity === "string" && data.payload.quantity.trim().length > 0 > 0 ? data.payload.quantity : false;
            const id = typeof data.payload._id === "string" && data.payload._id.trim().length > 0 ? data.payload._id.trim() : false;
            const price = typeof data.payload.price === "string" && data.payload.price.trim().length > 0 ? data.payload.price.trim() : false;
            const colors = typeof data.payload.colors === "object" ? data.payload.colors : false;
            const tags = typeof data.payload.tags === "string" && data.payload.tags.trim().length > 0 ? data.payload.tags.trim() : false;
            const category = typeof data.payload.category === "string" && data.payload.category.trim().length > 0 ? data.payload.category.trim() : false;
            const misc = typeof data.payload.misc === "object" ? data.payload.misc : false;
            const file = typeof data.payload.images === "object" ? data.payload.images : false;

            if (title && brand && dColor && sex && quantity && id && sold && price && colors && category && tags && sizes && misc) {
                // Check Images
                if (file) {
                    // Define Response
                    const response = {
                        _id: new ObjectId(id),
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
                        tags: tags,
                        category: category,
                        misc: misc,
                        images: file,
                    };

                    // Send to database
                    try {
                        const directory = client.db(database);
                        const sub_directory_1 = directory.collection("newArrivals");
                        await sub_directory_1.insertOne(response);
                        const sub_directory_2 = directory.collection("products");
                        await sub_directory_2.updateOne({ _id: new ObjectId(id) }, { $addToSet: { misc: "newArrival" } });

                        // Return
                        callback(200, response, "json");
                    } catch (error) {
                        // Return
                        callback(502, { message: "Oops, Something Went Wrong, Try Again Later" }, "json");
                    } finally {
                        client.close;
                    }
                } else {
                    callback(400, { message: "Image Are Missing" }, "json");
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

module.exports = createNewArrival