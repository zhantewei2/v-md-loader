const path = require("path");
const HOST_PATH = __dirname;
const Mcp = require("mini-css-extract-plugin");
join = (...args) => path.join(HOST_PATH, ...args);


class Plugin {
    apply(compiler) {
        compiler.hooks.emit.tapAsync("hoho", (compilation, cb) => {
            delete compilation.assets["main.js"];
            cb();
        })
    }
}

module.exports = {
    mode: "production",
    entry: {
        main: join("src/style/main.scss")
    },
    output: {
        publicPath: "/",
        path: join("lib/style"),
        filename: "main.js"
    },
    module: {
        rules: [
            {
                test: /\.scss/,
                use: [
                    Mcp.loader,
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
        new (require("clean-webpack-plugin").CleanWebpackPlugin)(),
        new Mcp({
            filename: "main.css"
        }),
        new Plugin()
    ]
}
;