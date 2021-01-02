import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "../webpack.config.js";

function compile(app) {
  Promise.resolve(webpackConfig({ mode: "development", name: "browser" }))
    .then((config) => ({
      compiler: webpack(config),
      publicPath: config.output.publicPath,
    }))
    .then(({ compiler, publicPath }) => {
      return {
        devMiddleware: webpackMiddleware(compiler, {
          publicPath,
        }),
        compiler,
      };
    })
    .then(({ devMiddleware, compiler }) => {
      app.use(devMiddleware);
      app.use(webpackHotMiddleware(compiler));
      return;
    })
    .catch((error) => console.log("error in devBundle", error));
}

export default compile;
