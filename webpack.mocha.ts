import * as path from 'path'
import * as WebpackNodeExternals from 'webpack-node-externals'
import * as WebpackMerge from 'webpack-merge'

import baseFile from './webpack.base'

export default WebpackMerge(baseFile, {

    output: {
        path: path.resolve(__dirname, './dist-mocha'),
    },

    mode: 'development',

    externals: [WebpackNodeExternals()]
})
