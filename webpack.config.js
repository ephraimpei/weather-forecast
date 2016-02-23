module.exports = {
  entry: './src/main.js',
  output: {
    path: './static/javascript',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [ 'es2015', 'react', 'stage-0' ]
      }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ["style", "css"]
      }
  ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
