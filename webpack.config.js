const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: './client/index.js',
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : false,

    devServer: {
        static: {
          directory: path.resolve(__dirname, 'build'),
          publicPath: '/',
        },
        proxy: {
            "/": "http://localhost:3000",
        }
    },

    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js'
    },
    

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_module/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    }, 

    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './client/index.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename:'[name].[contenthash].css',
        })
    ],
}