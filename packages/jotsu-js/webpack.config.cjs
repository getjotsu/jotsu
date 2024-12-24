const path = require('path');
const Dotenv = require('dotenv-webpack');
const TypescriptDeclarationPlugin = require('typescript-declaration-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool : 'source-map',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'jotsu.js',
        globalObject: 'this',
        library: 'jotsu',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    plugins: [
        new Dotenv(),
        new TypescriptDeclarationPlugin({
            out: 'jotsu.d.ts',
            removeMergedDeclarations: true,
            removeComments: true
        })
    ]
};
