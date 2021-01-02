const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const CURRENT_WORKING_DIR = process.cwd();

function webpackServer(name) {
  return {
    name,
    devtool: "eval-source-map",
    entry: [
      "webpack-hot-middleware/client?reload=true",
      path.join(CURRENT_WORKING_DIR, "client/main.js"),
    ],
    output: {
      path: path.join(CURRENT_WORKING_DIR, "/dist"),
      filename: "bundle.js",
      publicPath: "/dist/",
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
    resolve: {
      alias: {
        "react-dom": "@hot-loader/react-dom",
      },
    },
  };
}

module.exports = webpackServer;
