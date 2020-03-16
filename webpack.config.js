const path = require("path");
const HOST_PATH = __dirname;
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const join = (...args) => path.join(HOST_PATH, ...args);
const VMDPlugin = require("./lib/vmd.plugin.js");

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        main: join("src/main.js")
    },
    output: {
        filename: "[name].js",
        path: join("dist"),
        publicPath: "/"
    },
    devServer: {
        port: 8868,
        historyApiFallback: true,
        publicPath: "/"
    },
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.vue/,
                use: ["vue-loader"]
            },
            {
                test: /\.v\.md$/,
                use: [
                    join("lib/vmd.loader.js")
                ]
            },

            {
                test: /\.css/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.scss/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require("autoprefixer")()
                            ]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("dart-sass")
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new VMDPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            title: "title"
        })
    ],
    optimization: {}
};