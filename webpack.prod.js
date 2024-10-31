/* eslint-disable */
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
  // plugin: [
  //   new WorkboxWebpackPlugin.GenerateSW({
  //     swDest: "./sw.bundle.js",
  //     runtimeCaching: [
  //       {
  //         urlPattern: ({ url }) =>
  //           url.href.startsWith("https://api.themoviedb.org/3/"),
  //         handler: "StaleWhileRevalidate",
  //         options: {
  //           cacheName: "themoviedb-api",
  //         },
  //       },
  //       {
  //         urlPattern: ({ url }) =>
  //           url.href.startsWith("https://image.tmdb.org/t/p/w500/"),
  //         handler: "StaleWhileRevalidate",
  //         options: {
  //           cacheName: "themoviedb-image-api",
  //         },
  //       },
  //     ],
  //   }),
  // ],
  plugin: [
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: path.resolve(__dirname, "src/scripts/sw.js"),
      swDest: "./sw.bundle.js",
    }),
  ],
});
