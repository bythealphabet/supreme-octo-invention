const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CURRENT_WORKING_DIR = process.cwd();

function webpackServer(name) {
  return {
    entry: [path.join(CURRENT_WORKING_DIR, "client/main.js")],
    output: {
      path: path.join(CURRENT_WORKING_DIR, "/dist"),
      filename: "bundle.js",
      publicPath: "/dist/",
    },
  };
}

module.exports = webpackServer;
