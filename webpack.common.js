const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            favicon: "./src/icons/favicon.ico"
        }),
        new WebpackManifestPlugin({
            fileName: 'manifest.json'
        }),
        new CopyPlugin({patterns:[
                { from: 'public/css', to: 'css' },
                { from: 'public/fonts', to: 'fonts' },
                { from: 'public/js', to: 'js' },
                { from: 'public/assets', to: 'assets' }
            ]}),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.json$/,
                use: ['json-loader'],
                type: 'javascript/auto'
            },
            {
                test: /\.worker\.js$/,
                use: { loader: "worker-loader" },
            },
            {
                test: /\.(svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'files/[name].[ext]',
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json'],
    },
};