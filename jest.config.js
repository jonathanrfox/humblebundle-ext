module.exports = {
    setupFilesAfterEnv: ["./jestSetup.js"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    testEnvironment: "node"
};
