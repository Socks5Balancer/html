// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';

const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
  entry: {
    boot: './boot.ts',
    DelayInfo: './DelayInfo.ts',
  },
  output: {
    path: path.resolve(__dirname/*, 'dist'*/),
    filename: '[name].js',
  },
  devtool: 'source-map',
  target: 'node',
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ['zh-cn'],
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: 'tsconfig.json'
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({
      configFile: 'tsconfig.json'
    })],
    alias: {
      vue: 'vue/dist/vue.js'
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';


  } else {
    config.mode = 'development';
  }
  return config;
};
