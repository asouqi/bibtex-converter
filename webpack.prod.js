const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const {DefinePlugin} = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CopyPlugin({patterns:[
            { from: 'public/google86229b14d00bfabe.html', to: 'google86229b14d00bfabe.html' },
            { from: 'public/robots.txt', to: 'robots.txt' }
        ]}),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
            }),
        ],
    },
});
