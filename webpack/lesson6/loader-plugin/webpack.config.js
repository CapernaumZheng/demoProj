const path = require('path');
module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    // 解析自定义的loader
    resolveLoader: {
        modules: ['node_modules','./myLoaders']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'myLoader2',
                    {
                        loader: 'myLoader',
                        options: {
                            name: 'zack'
                        }
                    }
                ]
                
            },
            {
                test: /\.less$/,
                use: [
                    'my-style-loader',
                    'my-less-loader'
                ]
            }
        ]
    }
}