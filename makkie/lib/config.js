// Configuration File
// =============================================================================

// Import Dependencies
// *************************************

// Container
const Environments = {};

// Staging Environment
Environments["staging"] = {
    HTTP_port: 5000,
    HTTPS_port: 5001,
    mode: "staging",
    secret: "JEHOVAH REIGNS",
    user: "48577dd1e0c29a",
    pass: "dccd4f98ea78a1"
};

// Production Environment
Environments["production"] = {
    HTTP_port: 5030,
    HTTPS_port: 5031,
    mode: "production",
    secret: "JEHOVAH REIGNS",
};

// Check Current Environment
const currentEnv = typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "";

// Verify Environment
const environment = Environments[currentEnv] !== undefined ? Environments[currentEnv] : Environments["staging"];

// Export module
module.exports = environment;
