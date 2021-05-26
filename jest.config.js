module.exports = {
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testEnvironment: "node",

  globalSetup: (() => {
    process.env.TZ = "UTC";
  })(),
};
