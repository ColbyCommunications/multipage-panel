import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

import packageJson from './package.json';

const main = () => {
  const PROD = process.argv.includes('-p');
  const watching = process.argv.includes('--watch');
  const min = PROD ? '.min' : '';
  const entry = {
    [packageJson.name]: ['./src/js/index.js', './src/css/index.css'],
  };
  const filename = `[name]${min}.js`;
  const plugins = [new ExtractTextPlugin(`[name]${min}.css`)];

  return {
    entry,
    output: {
      filename,
      path: path.resolve(__dirname, 'dist'),
    },
    plugins,
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader'],
          }),
        },
      ],
    },
    target: 'web',
    devtool: PROD ? false : 'source-maps',
  };
};

export default main;
