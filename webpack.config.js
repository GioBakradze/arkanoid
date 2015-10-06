var webpack = require('webpack');

module.exports = {
    entry: './app/index.js',
    output: {
        filename: 'bundle.js',
        path: './app'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel!jshint',
            exclude: /node_modules/
        }]
    }
};
