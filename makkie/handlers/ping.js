// Ping Server
// See if up and running
// ===================================================================
const ping = (data, callback) => {
    // Return
    callback(200, { message: "Hello, I'm alive and kicking" }, "json");
};

// Export Module
module.exports = ping;
