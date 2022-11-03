const package = require('root-require')('package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const log = require('log-beautify');
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const object = {
  name: package.name,
  description: package.description,
}

console.clear()
module.exports = {
  entry: __dirname + '/src/index.js',
  stats: 'errors-only',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:  __dirname + '/public/index.html',
      templateParameters: object,
    }),
    new CopyPlugin({
      patterns: [
        path.resolve(__dirname, "public", "robots.txt"),
        path.resolve(__dirname, "public", "favicon.ico")
      ],
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
           loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ],
        include: /\.sc\.s[ac]ss$/
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          }
        ],
        include: /\.sc\.css$/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
        exclude: /\.sc\.s[ac]ss$/
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader"
        ],
        exclude: /\.sc\.css$/
      },
      {
        test: /\.(?:ico|png|jpg|jpeg|svg|gif)$/,
          loader: "file-loader",
          options: {
            outputPath: "assets/images",
            name() {
              return "[name].[hash].[ext]";
            },
          },
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      }
    ]
  },
  devServer: {
    allowedHosts: "all",
    port: "auto", 
    compress: true,
    magicHtml: true,
    historyApiFallback: true,
    liveReload: true,
    client: {
      logging: 'warn',
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    onListening: async function (devServer) {
      const port = devServer.server.address().port;
      const ipv4 = await WebpackDevServer.internalIP('v4');
      const ipv6 = await WebpackDevServer.internalIP('v6');
      console.clear()
      console.log("Simple-reactive start")
      log.success("server start on port :" + port);
      console.log()
      console.log(`\tlocal: \t\thttp://localhost:${port}`);
      console.log(`\tlocal ip-v4: \thttp://${ipv4}:${port}`);
      console.log(`\tlocal ip-v6: \thttp://[${ipv6}]:${port}`)
    }
  },
  resolve: {
    alias: {
      "@" : path.resolve(__dirname, './src/'),
    },
  },
}