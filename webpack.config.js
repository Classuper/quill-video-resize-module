var path = require('path');
var CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  entry: "./src/VideoResize.js",
  mode: 'production',
  output: {
    path: __dirname,
    library: 'VideoResize',
    libraryTarget: 'umd',
    filename: "video-resize.min.js"
  },
  plugins: [
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
  	}),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            "presets": [
              ["@babel/preset-env", { "modules": false }]
            ],
            "plugins": ["babel-plugin-transform-class-properties"]
          }
        }]
      },
      {
        test: /\.svg$/,
        use: [{
          loader: 'raw-loader'
        }]
      }
    ]
  }
};
