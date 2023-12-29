// Configuration File
// =============================================================================

// Import Dependencies

// Container
const Environments = {};

// Staging Environment
Environments["staging"] = {
    HTTP_port: 4000,
    HTTPS_port: 4001,
    mode: "staging",
    secret: "JEHOVAH REIGNS",
    email: "",
    key: "",
};

// Production Environment
Environments["production"] = {
    HTTP_port: 4030,
    HTTPS_port: 4031,
    mode: "production",
    secret: "JEHOVAH REIGNS",
    email: "",
    key: "",
};

// Check Current Environment
const currentEnv = typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "";

// Verify Environment
const environment = Environments[currentEnv] !== undefined ? Environments[currentEnv] : Environments["staging"];

// Export module
module.exports = environment;
