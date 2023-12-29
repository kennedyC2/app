// import Dependencies
// =================================================================================
const { readFile, writeFileSync, openSync, unlinkSync } = require("fs");
const path = require("path");

// Container
const misc = {};

// Base Directory
misc["image_base_directory"] = path.join(__dirname, "./../.data/images/");

// Fetch Images
misc["getImages"] = (data, callback) => {
    // Check Method
    switch (data.method) {
        case "options":
            callback(200, {}, "json");
            break;

        case "get":
            // Get file name
            const filename = data.path.replace("image", "").trim();

            if (filename && filename.length > 0) {
                //  Read File
                readFile(misc.image_base_directory + filename, (err, image) => {
                    if (!err && image) {
                        // JPG
                        if (filename.indexOf(".jpg") > -1) {
                            // Return
                            callback(200, image, "jpg");
                        }

                        // PNG
                        if (filename.indexOf(".png") > -1) {
                            // Return
                            callback(200, image, "png");
                        }
                    } else {
                        callback(404, {}, "json");
                    }
                });
            } else {
                callback(400, {}, "json");
            }
            break;

        default:
            callback(405, {}, "json");
            break;
    }
};

// Save Images
misc["saveImages"] = (obj, callback) => {
    // Validate data
    const data = typeof obj === "object" ? obj : false;

    if (data) {
        // Define Response
        const _data = {};

        // Loop and save
        for (const prop in data) {
            const filename = Date.now() + ".jpg";

            // Get Payload
            const base64_file = data[prop].toString("base64");

            // Define Filename
            const _file = base64_file.split(",")[1];

            // Write data
            writeFileSync(misc.image_base_directory + filename, _file, "base64");

            // Update
            _data[prop] = filename;
        }

        // Send
        callback(false, _data);
    } else {
        callback(true, { error: "Inappropriate Data" });
    }
};

// Update Images
misc["updateImages"] = (oldImages, newImages, callback) => {
    // Validate data
    const data1 = typeof oldImages === "object" ? oldImages : false;
    const data2 = typeof newImages === "object" ? newImages : false;

    if (data1 && data2) {
        // check and delete
        if (newImages.main !== "") {
            const filename = Date.now() + ".jpg";

            try {
                // delete data
                unlinkSync(misc.image_base_directory + oldImages.main);

                // Get Payload
                const base64_file = newImages.main.toString("base64");

                // Define Filename
                const _file = base64_file.split(",")[1];

                // Write data
                writeFileSync(misc.image_base_directory + filename, _file, "base64");

                // Update filename
                oldImages.main = filename
            } catch (error) {
                // Get Payload
                const base64_file = newImages.main.toString("base64");

                // Define Filename
                const _file = base64_file.split(",")[1];

                // Write data
                writeFileSync(misc.image_base_directory + filename, _file, "base64");

                // Update filename
                oldImages.main = filename
            }
        }

        if (newImages.image_1 !== "") {
            const filename = Date.now() + ".jpg";

            try {
                // delete data
                unlinkSync(misc.image_base_directory + oldImages.image_1);

                // Get Payload
                const base64_file = newImages.image_1.toString("base64");

                // Define Filename
                const _file = base64_file.split(",")[1];

                // Write data
                writeFileSync(misc.image_base_directory + filename, _file, "base64");

                // Update filename
                oldImages.image_1 = filename
            } catch (error) {
                // Get Payload
                const base64_file = newImages.image_1.toString("base64");

                // Define Filename
                const _file = base64_file.split(",")[1];

                // Write data
                writeFileSync(misc.image_base_directory + filename, _file, "base64");

                // Update filename
                oldImages.image_1 = filename
            }
        }

        if (newImages.image_2 !== "") {
            const filename = Date.now() + ".jpg";

            try {
                // delete data
                unlinkSync(misc.image_base_directory + oldImages.image_2);

                // Get Payload
                const base64_file = newImages.image_2.toString("base64");

                // Define Filename
                const _file = base64_file.split(",")[1];

                // Write data
                writeFileSync(misc.image_base_directory + filename, _file, "base64");

                // Update filename
                oldImages.image_2 = filename
            } catch (error) {
                // Get Payload
                const base64_file = newImages.image_2.toString("base64");

                // Define Filename
                const _file = base64_file.split(",")[1];

                // Write data
                writeFileSync(misc.image_base_directory + filename, _file, "base64");

                // Update filename
                oldImages.image_2 = filename
            }
        }

        // Send
        callback(false, oldImages);
    } else {
        callback(true, { error: "Inappropriate Data" });
    }
};

// Delete Images
misc["deleteImages"] = (obj, callback) => {
    // Validate data
    const data = typeof obj === "object" ? obj : false;

    if (data) {
        // Loop and delete
        for (const prop in data) {
            const filename = data[prop];

            try {
                // Write data
                unlinkSync(misc.image_base_directory + filename);
            } catch (error) {
                continue
            }
        }

        // Send
        callback(false, {});

    } else {
        callback(true, { error: "Inappropriate Data" });
    }
};

// Export Module
module.exports = misc;
