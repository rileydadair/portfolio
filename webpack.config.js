const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const hash = argv.mode === 'production' ? '.[hash:8]' : '';

  return {
    entry: './src/js/index.js',
    output: {
      filename: `bundle${hash}.js`,
    },
    devtool: 'source-map',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/templates/index.html')
      }),
      new ExtractTextPlugin({
        filename: `style${hash}.css`,
        allChunks: true
      }),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'static'),
          to: '[path][name].[ext]',
          ignore: ['.DS_Store', '.keep']
        }
      ])  
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          enforce: 'pre',
          loader: 'eslint-loader',
          options: {
            emitWarning: true,
          }  
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: { sourceMap: true, url: false }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [require('autoprefixer')({
                  'browsers': ['> 1%', 'last 2 versions']
                })],
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }]
          })
        }
      ]
    }
  }
};
