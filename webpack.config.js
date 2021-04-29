
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  mode: "development",
  devtool: 'inline-source-map',

  entry: "./src/ts/index.ts",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "index.js"
  },

  resolve: { extensions: [ ".ts" ]},
  module: {
    rules: [
      { test: /\.css$/i, use: [ "style-loader", "css-loader" ]},
      { test: /\.(png|jpg|ico|ttf|mp3)$/i, type: 'asset/resource' },
      { test: /\.tsx?$/i, use: "ts-loader" }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      favicon: "./src/assets/favicon.ico"
    })
  ]
};