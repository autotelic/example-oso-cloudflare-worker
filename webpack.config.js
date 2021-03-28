// wrangler.toml must have:
// type = "webpack"
// webpack_config = "webpack.config.js"

// Install https://www.npmjs.com/package/raw-loader
// to import the .polar file as a string
module.exports = {
  target: 'webworker',
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.polar$/i,
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false
            }
          }
        ]
      }
    ]
  }
}
