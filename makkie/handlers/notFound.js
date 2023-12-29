// Route Not Found
// ===================================================================
const notFound = (data, callback) => {
    // Return
    callback(400, {}, "json");
};

// Export Module
module.exports = notFound;
