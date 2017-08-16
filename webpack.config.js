const webpack = require('webpack');
const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const DIST_DIR = 'dist';

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, DIST_DIR),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            "react": "preact-compat",
            "react-dom": "preact-compat"
        }
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                use: `file-loader?name=[name].[ext]`
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|png|webp)$/,
                use: `file-loader?name=images/[name].[ext]`
            }
        ],
    },
    plugins: [
        new FaviconsWebpackPlugin({
            logo: './src/assets/images/icons/ml-icon.jpg',
            prefix: 'images/icons/[hash]/',
            persistentCache: true,
            inject: true,
            background: '#f1f1f1',
            title: 'Martin Lijanto',
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                favicons: true,
                firefox: true,
                windows: false
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new WorkboxWebpackPlugin({
            globDirectory: DIST_DIR,
            globPatterns: ['**/*.{html,js,css}'],
            swDest: path.join(DIST_DIR, 'sw.js')
        })
    ]
};