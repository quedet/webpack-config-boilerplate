const path = require('path')
const Webpack = require('webpack')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

const dirApp = path.resolve(__dirname, 'app')
const dirStyles = path.resolve(__dirname, 'styles')

module.exports = {
    entry: [
        path.join(dirApp, 'index.js'),
        path.join(dirStyles, 'index.scss')
    ],
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new Webpack.DefinePlugin({
            IS_DEVELOPMENT
        }),
        new Webpack.ProgressPlugin({

        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'shared',
                    to: 'assets'
                }
            ]
        }),
        new HTMLWebpackPlugin({
            title: 'Awwwards - Merging WebGL and HTML Worlds',
            template: path.resolve(__dirname, 'views/layout.html'),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin
    ],
    optimization: {
        minimize: true,
        minimizer: [ new TerserWebpackPlugin]
    },
    module: {
        rules: [
            {
                test: /\.(sass|css|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-preset-env']
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(svg|png|jpe?g|webp|gif|woff2?)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            // {
            //     test: /\.ejs$/,
            //     loader: 'ejs-loader',
            //     exclude: /node-modules/,
            //     // query: {
            //     //     interpolate : /\{\{(.+?)\}\}/g,
            //     //     evaluate    : /\[\[(.+?)\]\]/g
            //     // }
            // }
        ]
    }
}