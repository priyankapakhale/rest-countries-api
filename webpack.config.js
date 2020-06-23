var path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')

let HWPConfig = new HtmlWebpackPlugin({
    template: __dirname + "/index.html",
    file: "index.html",
    inject: "body",
    chunks: ['index']
})

let details = new HtmlWebpackPlugin({
    filename: 'details.html',
    template: __dirname + `/details.html`,
    inject: true,
    chunks: ['details']
})


module.exports = {
    mode: "production",
    entry: {
        index: "./src/index.js",
        details: "./src/details.js"
    },
    output: {
        path: __dirname + '/public',
        filename: '[name].js'
    },
    module: {
        rules: [{ 
            test: /\.css$/, 
            use: ['style-loader', 'css-loader' ]
        },]
    },
    plugins : [
        HWPConfig
      ].concat(details)
}