let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

let config = {
  entry: './src/js/app.js',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist', './js')
  },
  module:{
    rules: [
      { test:/\.(js)$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: '../index.html',
      hash: true, // adiciona um hash para evitar cache do script injetado
    }),
  ],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  }
};

if (process.env.NODE_ENV==='production'){
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV) // Esta coisa bizarra muda o ambiente do node para production no código a ser compilado
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  )
}


module.exports = config;