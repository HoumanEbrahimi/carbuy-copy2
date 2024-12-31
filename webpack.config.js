const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js', // Adjust to your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      querystring: require.resolve('querystring-es3'),
      crypto: false,
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
