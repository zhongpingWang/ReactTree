/* eslint-disable */
const path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash'); 
var HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV=process.env.NODE_ENV && process.env.NODE_ENV.trim() || "";


var Config= { 
 
  entry: {index:'./index.jsx'},
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/dist/",
    filename: 'js/[name].js'
  },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('js/comm.js'), 
        // 给js中剥离的css的文件指定名称
        new ExtractTextPlugin('/css/[name].css'),

        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development')
        }), 

        new webpack.NoErrorsPlugin(),

        new HtmlWebpackPlugin({
              //title: "无效",
            filename: path.resolve(__dirname, 'index.html'),
            template: "./pageTemp/index.html",
            inject: "true", // body  head false 
            //favicon :""
            hash: true,
            minify: { //压缩HTML文件
              removeComments: true //移除HTML中的注释
                //collapseWhitespace: true //删除空白符与换行符
            }
        })        
      
         
    ],

  module: {
    loaders: [
      {test: /\.jsx$/,loader: 'babel', query: {presets: ['es2015',"stage-0",'react']},exclude: [nodeModulesPath]},
      {test: /\.js$/,loader: 'babel', query: {presets: ['es2015',"stage-0"]},exclude: [nodeModulesPath]},
      {test: /\.less$/,loader: ExtractTextPlugin.extract('style', 'css!less')}, 
      {test: /\.(png|jpg|gif)$/,loader: 'url?limit=2048&name=imgs/[name]_[hash:4].[ext]'}  
    ]
  },

   resolve: { 
    extensions: ['', '.js', '.jsx',".less"]   
  },

  devServer: {
    colors: true,
    contentBase: __dirname,
    historyApiFallback: true,
    //hot: true,
    inline: true,
    port: 8889,
    progress: true,
    stats: {
      cached: false
    }   
  }
  
}

//压缩代码
// if (NODE_ENV=="production") {   
//    Config.plugins.push(
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//         warnings: false
//       },
//       output: {
//         comments: false
//       }
//     })
//   )
// }  
 

module.exports= Config;