import * as path from 'path'
import * as WebpackNodeExternals from 'webpack-node-externals'
import * as WebpackMerge from 'webpack-merge'

import baseFile from './webpack.base'

const mochaFile = WebpackMerge(baseFile, {

    output: {
        path: path.resolve(__dirname, './dist-mocha'),
    },

    mode: 'development',
    devtool: false,

    externals: [WebpackNodeExternals()]
})

export default mochaFile
