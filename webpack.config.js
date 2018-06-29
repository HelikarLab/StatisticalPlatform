const path = require('path');
console.log(path.join(__dirname, '/StatisticalPlatform/StatisticalPlatform/static/js/bundle/'));
module.exports = {
  node: {
  fs: 'empty'
},
  mode: 'development',
   entry: './StatisticalPlatform/StatisticalPlatform/static/js/app.js',
   output: {
     path: path.join(__dirname, '/StatisticalPlatform/StatisticalPlatform/static/js/bundle/'),
     filename: 'bundle.js'
   },
   module: {
     rules: [{
       loader: 'babel-loader',
       test: /.\js$/,
       exclude: /node_modules/
     }]
   }
};
