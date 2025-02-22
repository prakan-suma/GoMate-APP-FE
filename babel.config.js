module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@components": "./components",
            "@screens": "./screens",
            "@assets": "./assets",
            "@utils": "./utils",
            "@context":"./context",
          },
        },
      ],
    ],
  };
};