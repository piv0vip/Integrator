const helpers = require("./helpers"),
  CopyWebpackPlugin = require('copy-webpack-plugin');

let config = {
  entry: {
    "main": helpers.root("/src/main.ts"),
  },
  output: {
    path: helpers.root("/dist/js"),
    filename: "[name].js"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js", ".html"],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: {
      //       loaders: {
      //       },
      //       // other vue-loader options go here
      //   }
      // },
      {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
      },
      {test: /\.ts$/, exclude: /node_modules/, enforce: 'pre', loader: 'tslint-loader'},
      {test: /\.ts$/, exclude: /node_modules/, loader: "awesome-typescript-loader"},
      {
        test: /\.(jpe?g|png|gif)$/i,   //to support eg. background-image property 
        loader:"file-loader",
        query:{
          name:'[name].[ext]',
          outputPath:'images/'
          //the images will be emmited to public/assets/images/ folder 
          //the images will be put in the DOM <style> tag as eg. background: url(assets/images/image.png); 
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,    //to support @font-face rule 
        loader: "url-loader",
        query:{
          limit:'10000',
          name:'[name].[ext]',
          outputPath:'fonts/'
          //the fonts will be emmited to public/assets/fonts/ folder 
          //the fonts will be put in the DOM <style> tag as eg. @font-face{ src:url(assets/fonts/font.ttf); }  
        }
      },
      {
        test: /\.css$/,
        loaders: ["style-loader","css-loader"]
      },
      {test: /\.html$/, loader: 'raw-loader', exclude: ['./src/index.html']},
    ],
  },
  plugins: [
    
    new CopyWebpackPlugin([
      {from: 'src/assets', to: '../assets'},
      {from: 'src/css', to: '../css'}
    ]),
  ]
};

module.exports = config;
