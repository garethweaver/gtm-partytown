const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const partytown = require('@builder.io/partytown/utils')

const PATHS = {
  dist: path.join(__dirname, '/dist/'),
  src: path.join(__dirname, '/src/'),
}

module.exports = {
  mode: 'production',
  entry: [path.join(PATHS.src, 'app.js')],
  output: {
    path: PATHS.dist,
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(PATHS.src, 'index.html'),
      minify: { collapseWhitespace: true },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: partytown.libDirPath(),
          to: path.join(PATHS.dist, '~partytown'),
        },
      ],
    }),
  ],
}
