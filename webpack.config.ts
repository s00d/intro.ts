import * as path from "path";
import * as webpack from 'webpack';
import OptimizeCSSAssetsPlugin  from 'optimize-css-assets-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';

const config: webpack.Configuration = {
  stats: {
    all: false,
    modules: true,
    maxModules: 0,
    errors: true,
    warnings: true,
    moduleTrace: true,
    errorDetails: true
  },
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
  ],
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
            drop_console: true,
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
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /\.js$|\.json$|\.css$/,
          chunks: "all",
          name: "commons",
          // filename: '[name].bundle.js?v=' + pkg.version,
          enforce: true,
          minChunks: 2
        },
        polyfill: {
          name: "polyfill",
          test: /babel-polyfill|fetch-everywhere|whatwg-fetch/,
          // filename: "polyfill.[hash].js",
          chunks: "initial",
          enforce: true,
          minChunks: 1
        }
      }
    }
  },
  entry: {
    intro: path.resolve(__dirname, "src/Intro.ts"),
    hints: path.resolve(__dirname, "src/Hints.ts"),
    plugin_vue: path.resolve(__dirname, "src/plugin_vue.ts")
  },
  output: {
    path: path.resolve(__dirname, "./lib"),
    filename: "[name].js",
    libraryTarget: "var",
    library: "[name]",
    sourceMapFilename: "[name].js.map",
  },
  module: {
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [['@babel/preset-env', {
              targets: {
                browsers: ['last 2 versions', '>= 3%', 'not ie <= 10']
              },
              modules: false,
              forceAllTransforms: false
            }]]
          }
        },
        exclude: /(node_modules|bower_components)/
      },
      {test: /\.tsx?$/, loader: "ts-loader"},
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  },
  node: {
    setImmediate: false,
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    console: true,
    child_process: "empty"
  },
  resolve: {
    extensions: [".js", ".ts"]
  },
  devtool: false,
  performance: {
    hints: false
  }
};

module.exports = config;
