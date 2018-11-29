const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: path.resolve(__dirname, './src/main.js'),

    mode: 'development',
    devtool: false,
    stats: { children: false },

    output: {
        path: path.resolve(__dirname, './dist-test'),
        libraryTarget: 'var', // {'var', 'umd', 'comments', 'this' ...}
        filename: './[name].bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    hotReload: false
                }
            },

            {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' }
                ]
            },

            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' }
                ]
            },

            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },

            {
                test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },

            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    emitFile: true,
                    outputPath: './img/',
                    useRelativePath: false,
                    name: '[name].[ext]'
                }
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.vue'],
        alias: {
            'vue-event-bus2': path.resolve(__dirname, '../dist-prod/vue-event-bus2.min.js')
        }
    },

    externals: {
        'vue': 'Vue'
    },

    plugins: [
        new VueLoaderPlugin(),

        new MiniCssExtractPlugin({
            filename: './[name].bundle.css'
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './src/index.html'),
            hash: true,
        })
    ]

}
