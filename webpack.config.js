const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');
const env = process.env.NODE_ENV;
console.log(SRC_DIR);
console.log(DIST_DIR);
module.exports = {
    mode: env == null ? 'development' : env,
    entry: path.resolve(SRC_DIR, 'index.ts'),
    output: {
        filename: 'tuvijs.js',
        library: "tuvi",
        libraryTarget: "umd",
        path: DIST_DIR
    },
    devtool: 'source-map',
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
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
    plugins: [
        new CleanWebpackPlugin(),
    ],
};