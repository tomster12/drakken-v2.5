
const path = require("path");


module.exports = {
  mode: "development",
  devtool: 'inline-source-map',

  entry: "./src/ts/index.ts",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "index.js"
  },

  module: {
    rules: [
      { test: /\.tsx?$/i, use: "ts-loader" },
      { test: /\.css$/i, use: [ "style-loader", "css-loader" ]}
      { test: /\.(png|jpg|jpeg)$/i, type: 'asset/resource' },
    ]
  }
};