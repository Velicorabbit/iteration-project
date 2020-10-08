const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'client/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i, // Allows to transpile JSX
        exclude: /(node_modules)/, // Exclude them from compilation because they are already in JS
        use: {
          loader: 'babel-loader', // package name
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'client/template.html'),
      filename: 'index.html',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
    contentBase: path.join(__dirname, 'build'),
    publicPath: '/',
    hot: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/businesses/**': {
        target: 'http://localhost:5000',
        secure: false,
      },
      '/location/**': {
        target: 'http://localhost:5000',
        secure: false,
      },
      '/news/**': {
        target: 'http://localhost:5000',
        secure: false,
      },
      '/weather/**': {
        target: 'http://localhost:5000',
        secure: false,
      },
      '/favorites/**': {
        target: 'http://localhost:5000',
        secure: false,
      },
    },
  },
};
