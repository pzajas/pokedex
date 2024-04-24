module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["babel-plugin-module-resolver", {
      "alias": {
        "@components": "./src/components",
        "@constants": "./src/constants",
        "@styles": "./src/styles",
        "@typescript": "./typescript",
        "@typography": "./src/typography",
        "@utils": "./src/utils",
      }
    }],
    "react-native-reanimated/plugin"
    ]
  };
};
