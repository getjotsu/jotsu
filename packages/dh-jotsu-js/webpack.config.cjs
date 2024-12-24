const path = require('path');

module.exports = {
    mode: 'development',
    devtool : 'source-map',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'dh-gauged.js',
        globalObject: 'this',
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
        alias: {
            'react': path.resolve(__dirname, 'node_modules', 'preact/compat'),
            'react-dom/test-utils': path.resolve(__dirname, 'node_modules', 'preact/test-utils'),
            'react-dom': path.resolve(__dirname, 'node_modules', 'preact/compat'),
            'react/jsx-runtime': path.resolve(__dirname, 'node_modules', 'preact/jsx-runtime'),
        },
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    }
};
