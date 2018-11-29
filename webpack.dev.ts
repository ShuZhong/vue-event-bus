import * as path from 'path'
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import * as WebpackMerge from 'webpack-merge'

import baseFile from './webpack.base'

const devFile = WebpackMerge(baseFile, {
    mode: 'development',
    devtool: false
})

export default devFile