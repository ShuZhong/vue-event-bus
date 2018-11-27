import * as path from 'path'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default {
    entry: path.resolve(__dirname, './src/index.ts'),
    stats: { children: false },

    output: {
        library: 'VueEventBus2', // Only for umd/amd
        libraryTarget: 'umd', // {'var', 'umd', 'comments', 'this' ...}
        filename: './vue-event-bus2.min.js'
    },

    module: {
        rules: [
            {
                test: /\.[jt]s$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    externals: {
        'vue': {
            amd: 'Vue',
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue'
        }
    }
}
