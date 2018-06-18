const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', path.join(__dirname, './src/main.js')],
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, './dist/'),
    filename: 'boudle.js'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
      filename: 'index.html'
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    open: false,
    hot: true,
    contentBase: './',
    port: 3001,
    proxy: {
  		"/api": {
   	 		target: "http://localhost:5000",
   	 		pathRewrite: {"^/api" : ""}
  	}
}
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.(png|gif|jpg|jpeg|bmp)$/, use: 'url-loader?limit=30000&name=[hash:8]-[name].[ext]' },
      { test: /\.vue$/, use: 'vue-loader' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-0'],
            plugins: 'transform-runtime',
            cacheDirectory: true
          }
        }
      }
    ]
  },
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    axios: 'axios',
    lodash: '_'
  }
}
