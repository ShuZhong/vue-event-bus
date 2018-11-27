import * as path from 'path'
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import * as WebpackMerge from 'webpack-merge'

const baseFile = require('./webpack.base')

export default WebpackMerge(baseFile, {

    output: {
        path: path.resolve(__dirname, './dist-prod'),
    },

    mode: 'production',

    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                // sourceMap: true // set to true if you want JS source maps
            })
        ]
    }
})
