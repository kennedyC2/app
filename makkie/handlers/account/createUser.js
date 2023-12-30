const { client, database, ObjectId } = require("../../lib/mongo");
const { createRandomString, hash } = require("../../lib/helper")
// const message = require("../../lib/mailing")

// Create Product
const createUser = async (data, callback) => {
    // Check Method
    switch (data.method) {
        case "options":
            callback(200, {}, "json");
            break;

        case "post":
            // Validate Data
            const firstname = typeof data.payload.firstname === "string" && data.payload.firstname.trim().length > 0 ? data.payload.firstname.trim() : false;
            const lastname = typeof data.payload.lastname === "string" && data.payload.lastname.trim().length > 0 ? data.payload.lastname.trim() : false;
            const delivery = typeof data.payload.delivery === "string" && data.payload.delivery.trim().length > 0 ? data.payload.delivery.trim() : false;
            const email = typeof data.payload.email === "string" && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false;
            const phone = typeof data.payload.phone === "string" && data.payload.phone.trim().length > 0 ? data.payload.phone.trim() : false;
            const password = typeof data.payload.password === "string" && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

            if (firstname && email && phone && password && lastname && delivery) {
                // Check to database
                try {
                    const directory = client.db(database);
                    const sub_directory = directory.collection("users");
                    const data = await sub_directory.findOne({ email: email });

                    if (data === null || data === undefined) {
                        // Hash password
                        const hashedPassword = hash(password)

                        // Generate Verification Code
                        const vCode = createRandomString(8)

                        const response = {
                            _id: new ObjectId(Date.now()),
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            phone: phone,
                            password: hashedPassword,
                            delivery: "imo",
                            verified: true,
                            active: false,
                            admin: false,
                            code: vCode.toUpperCase(),
                            pending: [],
                            history: [],
                            cards: []
                        };

                        await sub_directory.insertOne(response);

                        // Delete Password
                        delete response.password

                        // Delete Code
                        delete response.code

                        // Return
                        callback(200, response, "json");
                    } else {
                        // Return
                        callback(400, { message: "User with email already exist, Try Signing in" }, "json");
                    }
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

module.exports = createUser