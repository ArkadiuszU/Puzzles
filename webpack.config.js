const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (mode) => 
{
  const envConfig = {};
  if(mode.WEBPACK_SERVE)
  {
    envConfig.domain= 'https://localhost:5001'
  }
  else if (mode.WEBPACK_BUILD)
  {
    envConfig.domain= 'https://puzzlesapi.azurewebsites.net'
  }
return(   
{
  entry: {
    main: path.resolve(__dirname, './App/src/index.js'),
  },
  // Where files should be sent once they are bundled
 output: {
   path: path.join(__dirname, '/dist'),
   filename: 'index.js',
   assetModuleFilename: 'images/[hash]-[name].[ext]',
   publicPath: '/'
 },
  // webpack 5 comes with devServer which loads in development mode
 devServer: {
   port: 3000,
   watchContentBase: true,
   open: true,
   historyApiFallback: true
 },
  // Rules of how webpack will take our files, complie & bundle them for the browser 
 module: {
   rules: [
     // JavaScript
     {
       test: /\.(js|jsx)$/,
       exclude: /nodeModules/,
       use: {
         loader: 'babel-loader'
       }
     },
     // CSS and SCSS
     {
      test: /\.s[ac]ss$/i,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',],
    },
     // Images
     {
      test: /\.(?:ico|gif|png|svg|jpg|jpeg)$/i,
      type: 'asset/resource',
    },
   ]
 },
 plugins: [new HtmlWebpackPlugin({ template: './App/index.html',  favicon: './App/Favicon.ico' }), 
          new MiniCssExtractPlugin(),
          new webpack.DefinePlugin({
              BASEURL: JSON.stringify(envConfig.domain),
          }),
          
],
});
}
