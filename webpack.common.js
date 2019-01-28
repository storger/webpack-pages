const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const {
	resolve,
	getEntries,
	getHtmlWebpackPlugins
} = require('./webpack.until.js')
const cfg = require('./webpack.cfg.js')
let otherEntries = {}
// 公共css文件入口
if (cfg.commonCss && cfg.commonCss.entry) {
	otherEntries.common_css = cfg.commonCss.entry
}

module.exports = (env, argv) => {
	console.log(argv.mode, '========================')
	return {
		entry: {
			...otherEntries,
			...getEntries(argv)
		},
		resolve: { //导入的时候不用写拓展名
			extensions: ['.js', '.vue', '.json'],
		},
		resolve: {
			alias: {
				'vue$': 'vue/dist/vue.esm.js',
				'@': resolve('src'),
			}
		},
		output: {
			path: resolve('dist'),
			filename: `${cfg.build.assetsSubDirectory}/js/[name].[chunkhash].js`,
			// chunkFilename: `${cfg.build.assetsSubDirectory}/js/[name].[chunkhash].js`,
			publicPath: argv.mode === 'production' ?
				cfg.build.assetsPublicPath :
				cfg.dev.assetsPublicPath
		},

		module: {
			rules: [{
					test: /\.html$/,
					use: [{
						loader: 'html-loader',
						options: {}
					}]
				},
				{
					test: /\.js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
					}
				},
				{
					test: /\.vue$/,
					use: [{
						loader: 'vue-loader',
					}]
				},
				{
					test: /\.(gif|png|jpe?g|svg)$/i,
					exclude: /(node_modules|bower_components)/,
					use: [{
						loader: 'url-loader',
						options: {
							limit: 8 * 1024,
							name: `${cfg.build.assetsSubDirectory}/img/[name]-[hash:7].[ext]`,
						}
					}]
				},
				{
					test: /\.(woff|svg|eot|ttf)\??.*$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'url-loader',
						options: {
							name: `${cfg.build.assetsSubDirectory}/font/[name].[hash:7].[ext]`,
							limit: 8192
						}
					}
				},
			]
		},

		plugins: [
			new VueLoaderPlugin(),
			// new webpack.HotModuleReplacementPlugin(), // 启用 热更新
			...getHtmlWebpackPlugins(argv),
			new webpack.LoaderOptionsPlugin({
				options: {
					htmlLoader: {
						root: path.resolve(__dirname, './src') // 对于html中的绝对路径进行定位， /assets/a.jpg => path.resolve(__dirname, '/src/assets/a.jpg')
					}
				}
			}),
			new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery",
				Config :[resolve("src/js/_common/config.js"),'default'],
				Msg:[resolve("src/js/_common/msg.js"),'default'],
				Http:[resolve("src/js/_common/http.js"),'default'],
				Tools:[resolve("src/js/_common/tools.js"),'default']
			})
		],
	}
}