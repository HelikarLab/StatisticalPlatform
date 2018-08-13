var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname,
  node: {
  fs: 'empty'
},
  mode: 'development',
   entry: [
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './StatisticalPlatform/StatisticalPlatform/static/js/app.js'
   ],
   output: {
     path: path.join(__dirname, './StatisticalPlatform/StatisticalPlatform/static/js/bundle/'),
     filename: "[name]-[hash].js",
     publicPath: 'http://localhost:3000/assets/bundles/',
   },
   plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new BundleTracker({filename: './StatisticalPlatform/webpack-stats.json'}),
  ],

   module: {
     rules: [{
       loader: 'babel-loader',
       test: /.\js$/,
       exclude: /node_modules/
     }]
   }
};
