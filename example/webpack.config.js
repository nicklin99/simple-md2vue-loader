const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      }, {
        test: /\.md$/,
        use: [
          'vue-loader',
          {
            loader: path.join(__dirname, '../src/loader')
          },
        ]
      },{
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      }]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 9000
  }
};