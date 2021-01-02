const { merge } = require("webpack-merge");

function webpackConfig({ mode = "production", name = "server", presets = [] }) {
  console.log("mode", mode);
  console.log("name", name);
  console.log("presets", presets);
  return merge(
    {
      mode,
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
              },
            },
          },
          {
            test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
            use: "file-loader",
          },
        ],
      },
    },
    modeConfig(mode, name)
  );
}

function modeConfig(mode, name) {
  return name === "server"
    ? require(`./build-utils/webpack.config.server.js`)(name)
    : require(`./build-utils/webpack.config.${mode}`)(mode, name);
}

module.exports = webpackConfig;
