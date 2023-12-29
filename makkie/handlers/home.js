const { client, database } = require("../lib/mongo");

// MongoDB
const getFile = async (collection, callback) => {
    try {
        const directory = client.db(database);
        const sub_directory = directory.collection(collection);
        const data = await sub_directory.find({}).toArray();

        // Return
        callback(false, data);
    } catch (error) {
        callback(true, error);
    } finally {
        client.close;
    }
};

const multiple = async (num, collection, callback) => {
    try {
        const directory = client.db(database);
        const sub_directory = directory.collection(collection);
        const data = await sub_directory.find({}, { limit: num }).toArray();

        // Return
        callback(false, data);
    } catch (error) {
        callback(true, error);
    } finally {
        client.close;
    }
};

// Get Product List
const home = (data, callback) => {
    // Check Method
    switch (data.method) {
        case "options":
            callback(200, {}, "json");
            break;

        case "get":
            // Define Data
            const data = {}

            // Get New Arrival
            getFile("newArrival", (err, newArrival) => {
                if (!err && newArrival) {
                    // Update
                    data["newArrival"] = newArrival !== null ? newArrival : []

                    // Get Trending
                    getFile("trending", (err, trending) => {
                        if (!err && trending) {
                            // Update
                            data["trending"] = trending !== null ? trending : []

                            // Get Scrubs
                            multiple(10, "scrubs", (err, scrubs) => {
                                if (!err && scrubs) {
                                    // Update
                                    data["scrubs"] = scrubs !== null ? scrubs : []

                                    // Get Coats
                                    multiple(10, "ward_coats", (err, coats) => {
                                        if (!err && coats) {
                                            // Update
                                            data["coats"] = coats !== null ? coats : []

                                            // Get Crocs
                                            multiple(10, "crocs", (err, crocs) => {
                                                if (!err && crocs) {
                                                    // Update
                                                    data["crocs"] = crocs !== null ? crocs : []

                                                    // Get Brooches
                                                    multiple(10, "brooches", (err, brooches) => {
                                                        if (!err && brooches) {
                                                            // Update
                                                            data["brooches"] = brooches !== null ? brooches : []

                                                            // Get Sneakers
                                                            multiple(10, "sneakers", (err, sneakers) => {
                                                                if (!err && sneakers) {
                                                                    // Update
                                                                    data["sneakers"] = sneakers !== null ? sneakers : []

                                                                    // Get T-Shirts
                                                                    multiple(10, "inscription_shirts", (err, tShirts) => {
                                                                        if (!err && tShirts) {
                                                                            // Update
                                                                            data["shirts"] = tShirts !== null ? tShirts : []

                                                                            // Return
                                                                            callback(200, data, "json")
                                                                        } else {
                                                                            console.log(err);
                                                                            callback(502, { error: "Oops, Something Went Wrong, Try Again Later" }, "json");
                                                                        }
                                                                    })
                                                                } else {
                                                                    console.log(err);
                                                                    callback(502, { error: "Oops, Something Went Wrong, Try Again Later" }, "json");
                                                                }
                                                            })
                                                        } else {
                                                            console.log(err);
                                                            callback(502, { error: "Oops, Something Went Wrong, Try Again Later" }, "json");
                                                        }
                                                    })
                                                } else {
                                                    console.log(err);
                                                    callback(502, { error: "Oops, Something Went Wrong, Try Again Later" }, "json");
                                                }
                                            })
                                        } else {
                                            console.log(err);
                                            callback(502, { error: "Oops, Something Went Wrong, Try Again Later" }, "json");
                                        }
                                    })
                                } else {
                                    console.log(err);
                                    callback(502, { error: "Oops, Something Went Wrong, Try Again Later" }, "json");
                                }
                            })
                        } else {
                            console.log(err);
                            callback(502, { error: "Oops, Something Went Wrong, Try Again Later" }, "json");
                        }
                    })
                } else {
                    console.log(err);
                    callback(502, { error: "Oops, Something Went Wrong, Try Again Later" }, "json");
                }
            })

            break;

        default:
            callback(405, {}, "json");
            break;
    }
};

// Export Module
module.exports = home;