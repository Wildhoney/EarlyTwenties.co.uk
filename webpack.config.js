var path = require('path');

module.exports = {
    entry: {
        maria: ['./src/js/core.js']
    },
    output: {
        path: path.join(__dirname, 'public/build'),
        filename: '[name].js',
        library: 'Maria',
        libraryTarget: 'var'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                  presets: ['react', 'es2015', 'stage-0']
                }
              }
        ]
    }
};
