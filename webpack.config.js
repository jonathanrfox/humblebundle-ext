const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');

let devtool = 'inline-source-map';

let plugins = [
    new ExtractTextPlugin('popup.css'),
    new HtmlWebpackPlugin({
        template: path.join(SRC, 'popup', 'index.html'),
        filename: 'popup.html',
        excludeChunks: ['background']
    }),
    new CopyWebpackPlugin([{
        from: './src/manifest.json',
        to: path.join(DIST, 'manifest.json'),
        transform: function(content) {
            let manifest = JSON.parse(content);
            manifest.background = {
                scripts: ['./background.js']
            };
            manifest.page_action.default_icon = {
                19: './icons/icon-19.png',
                38: './icons/icon-38.png'
            };
            manifest.page_action.default_popup = './popup.html';
            return JSON.stringify(manifest);
        }
    }])
];

module.exports = (env = {}) => {
    if (env.production) {
        devtool = 'source-map';
        plugins = plugins.concat([
            new webpack.DefinePlugin({
                PRODUCTION: JSON.stringify(true),
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new UglifyJsPlugin({
                uglifyOptions: {
                    sourceMap: true,
                    mangle: {
                        reserved: ['browser', 'window']
                    }
                }
            })
        ]);
    }
    return {
        entry: {
            background: './src/background/index.js',
            popup: './src/popup/index.js'
        },
        output: {
            path: DIST,
            filename: '[name].js'
        },
        module: {
            rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            }, {
                test: /\.(woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            }, {
                test: /\.png$/,
                loader: 'file-loader',
                options: {
                    name: 'icons/[name].[ext]'
                }
            }]
        },
        devServer: {
            contentBase: path.join(DIST, 'popup')
        },
        devtool: devtool,
        plugins: plugins
    }
};
