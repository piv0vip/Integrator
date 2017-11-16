const UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
  CompressionPlugin = require('compression-webpack-plugin'),
  webpackConfig = require("./webpack.config.base"),
  helpers = require("./helpers"),
  DefinePlugin = require('webpack/lib/DefinePlugin'),
  env = require('../environment/prod.env');

webpackConfig.entry["main.min"] = helpers.root("/src/main.ts");

webpackConfig.plugins = [...webpackConfig.plugins,
  new UglifyJsPlugin(),
  new CompressionPlugin({
    asset: "[path].gz[query]",
    test: /\.min\.js$/
  }),
  new DefinePlugin({
    'process.env': env
  })
];

module.exports = webpackConfig;