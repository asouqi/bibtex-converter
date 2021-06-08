const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const {DefinePlugin} = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CompressionWebpackPlugin()
    ],
});
