import * as path from "path";
import * as webpack from 'webpack';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const config: webpack.Configuration = {
  optimization: {
    minimize: true,
    concatenateModules: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        exclude: ["babel-polyfill", "whatwg-fetch"],
        terserOptions: {
          compress: {
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
    path: path.resolve(__dirname, "./lib"),
    filename: "[name].js",
  },
  devtool: 'source-map',
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
};

module.exports = config;
