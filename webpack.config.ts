import * as path from "path";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    minimize: true,
    concatenateModules: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        sourceMap: false,
        cache: true,
        exclude: ["babel-polyfill", "whatwg-fetch"],
        terserOptions: {
          warnings: true,
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: false,
            unsafe: false,
            global_defs: {
              DEBUG: false,
              "alert": "console.log"
            }
          },
          mangle: true,
          ie8: true,
          safari10: true,
          output: {
            comments: false,
          },
        },
        extractComments: false
      })
    ]
  },
  entry: {
    index: path.resolve(__dirname, "src/index.ts"),
    intro: path.resolve(__dirname, "src/Intro.ts"),
    hints: path.resolve(__dirname, "src/Hints.ts"),
    plugin_vue: path.resolve(__dirname, "src/plugin_vue.ts")
  },
  output: {
    path: path.resolve(__dirname, "./lib/bandle"),
    filename: "[name].js",
  },
  module: {
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
    rules: [
      {test: /\.tsx?$/, loader: "ts-loader"},
      {
        test:/.(s*)css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false
            }
          },
          "sass-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './style.min.css',
    }),
  ],
  resolve: {
    extensions: [".js", ".ts"]
  },
  devtool: false,
};
