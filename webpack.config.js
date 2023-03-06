const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader'

const plugins = [
  new HtmlWebpackPlugin({ template: 'index.html' }),
  new ESLintPlugin({ extensions: ['ts', 'tsx'] }),
  new ForkTsCheckerWebpackPlugin(),
  new webpack.ProvidePlugin({
    three: 'three',
    enable3d: 'enable3d'
  }),
  new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
]

if (!isProduction) {
  plugins.push(new BundleAnalyzerPlugin())
}

const config = {
  entry: {
    main: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    open: true,
    host: 'localhost'
  },
  plugins,
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [{
      test: /\.(ts|tsx)$/i,
      loader: 'swc-loader',
      exclude: ['/node_modules/']
    }, {
      test: /\.s[ac]ss$/i,
      use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader']
    }, {
      test: /\.css$/i,
      use: [stylesHandler, 'css-loader', 'postcss-loader']
    }, {
      test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
      type: 'asset'
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    alias: {
      three$: path.resolve(__dirname, 'node_modules/three/src/Three')
    }
  },
  ignoreWarnings: [/(module has no exports)/],
  optimization: {
    minimize: isProduction,
    splitChunks: {
      chunks: 'all'
    },
    usedExports: true
  },
  devtool: isProduction ? false : 'source-map'
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'

    config.plugins.push(new MiniCssExtractPlugin())

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW())
  } else {
    config.mode = 'development'
  }
  return config
}
