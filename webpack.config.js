module.exports = {
  context: __dirname,
  entry: "./app/client/client.js",
  output: {
    path: "./dist",
    filename: "client-built.js"
  },
  devtool: "source-map",
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel" },
      { test: /\.less$/, loader: "style!css!cssnext!less" }
    ]
  }
};
