import * as path from 'path'
import { Configuration } from 'webpack'

const baseFile: Configuration = {
    entry: path.resolve(__dirname, './src/index.ts'),
    stats: { children: false },

    output: {
        path: path.resolve(__dirname, './dist-prod'),
        library: 'VueEventBus2', // Only for umd/amd
        libraryTarget: 'umd', // {'var', 'umd', 'comments', 'this' ...}
        filename: './vue-event-bus2.min.js'
    },

    module: {
        rules: [
            {
                test: /\.[jt]s$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    compilerOptions: {
                        /* 前端项目需要配置模块系统为 ES2015（默认为 CommonJS 供 ts-node 使用） */
                        module: 'ES2015'
                    }
                }
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.js']
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

export default baseFile