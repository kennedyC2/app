const { client, database, ObjectId } = require("../../lib/mongo");
const { date, month, monthN, year } = require("./../../lib/helper")

// Create Cart
const createCart = async (data, callback) => {
    // Check Method
    switch (data.method) {
        case "options":
            callback(200, {}, "json");
            break;

        case "post":
            // Validate Data
            const _data = typeof data.payload === "object" ? data.payload : false;

            if (_data) {
                // Define Response
                const response = {
                    _id: new ObjectId(Date.now()),
                    ticket: Date.now(),
                    user: new ObjectId(_data.user),
                    email: _data.email,
                    date: date + "/" + monthN + "/" + year,
                    month: month,
                    cart: _data.cart,
                    total: _data.total,
                    delivery: _data.delivery,
                    status: "processing"
                };

                // Send to database
                try {
                    const directory = client.db(database);
                    const sub_directory_1 = directory.collection("pending");
                    await sub_directory_1.insertOne(response);
                    const sub_directory_2 = directory.collection("history");
                    await sub_directory_2.insertOne(response);
                    const sub_directory_3 = directory.collection("users");
                    await sub_directory_3.updateOne({ _id: new ObjectId(_data.user) }, { $addToSet: { pending: new ObjectId(response._id) } });

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

module.exports = createCart