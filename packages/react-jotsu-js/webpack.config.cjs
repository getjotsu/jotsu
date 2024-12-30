const path = require('path');
const TypescriptDeclarationPlugin = require('typescript-declaration-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool : 'source-map',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'ReactJotsu',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.module\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]' // Unique class name format
                            }
                        }
                    },
                    'sass-loader'
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    externals: {
        react: 'react',
        'react-dom': 'react-dom',
        'react-hook-form': 'react-hook-form'
    },
    plugins: [
        new TypescriptDeclarationPlugin({
            out: 'react-jotsu-js.d.ts',
            removeMergedDeclarations: true,
            removeComments: true
        })
    ]
};
