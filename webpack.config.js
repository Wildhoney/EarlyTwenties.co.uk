var path = require('path');

module.exports = {
    entry: {
        maria: ['./src/core.js']
    },
    output: {
        path: path.join(__dirname, 'public/build'),
        filename: '[name].js',
        library: 'Maria',
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader?stage=1'
            }
        ]
    }
};
