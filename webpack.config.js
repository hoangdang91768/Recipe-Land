const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: "development",
    entry: './client/index.js',

    devServer: {
        static: {
          directory: path.resolve(__dirname, 'build')
        },
        compress: true,
        port: 8000,
        proxy: {
            "/api/**": "http://localhost:3000",
        }
    },

    output: {
        path: path.resolve(__dirname, 'build'),
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

    plugins: [
        new HTMLWebpackPlugin({
            template: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'[name].[contenthash].css',
        })
    ],
}