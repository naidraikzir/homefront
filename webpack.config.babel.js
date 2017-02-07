import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const PRODUCTION = process.env.NODE_ENV === 'production'
const DEFINE_PRODUCTION = new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' }})
const EXTRACT_CSS = new ExtractTextPlugin({ filename: 'css/app.css' })
const COMMONS_CHUNK = new webpack.optimize.CommonsChunkPlugin({ name: [ 'vendor', 'manifest' ] })
const UGLIFY = new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, output: { comments: false }})
const STATS_ANALYZER = new BundleAnalyzerPlugin({ generateStatsFile: true })

const CONFIG = {
	entry: {
		app: __dirname + '/src/js/app.js',
		vendor: ['vue', 'vue-resource', 'vue-router', 'vuex', 'hammerjs', 'marked']
	},
	output: {
		path: __dirname + '/dist',
		// publicPath: 'http://localhost:8088'
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: 'babel-loader',
			exclude: /node_modules/
		}, {
			test: /\.vue$/,
			use: 'vue-loader'
		}, {
			test: /\.json$/,
			use: 'json-loader'
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'images/[name].[ext]?[hash]'
				}
			}]
		}, {
			test: /\.(eot|otf|svg|ttf|woff|woff2)$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]'
				}
			}]
		}]
	},
	resolve: {
		extensions: [ '.js', '.vue', '.scss', '.json' ],
		modules: [ 'node_modules', __dirname + '/src/' ]
	},
	plugins: [
		COMMONS_CHUNK
	],
	devServer: {
		port: 8088,
		historyApiFallback: true
	}
}

if (PRODUCTION) {
	CONFIG.output.filename = `js/[name].js`
	// CONFIG.devtool = '#cheap-module-source-map'
	CONFIG.output.publicPath = '/'
	CONFIG.module.rules = (CONFIG.module.rules || []).concat([
		{
			test: /\.scss$/,
			use: EXTRACT_CSS.extract({
				fallback: 'style-loader',
				use: [
					{
						loader: 'css-loader',
						options: {
							minimize: true,
							discardComments: {
								removeAll: true
							},
							colormin: true
						}
					},
					'postcss-loader',
					'sass-loader'
				]
			})
		}
	])
	CONFIG.plugins = (CONFIG.plugins || []).concat([
		DEFINE_PRODUCTION,
		EXTRACT_CSS,
		UGLIFY,
		STATS_ANALYZER
	])
}
else {
	CONFIG.output.filename = `js/[name].js`
	CONFIG.devtool = '#cheap-module-eval-source-map'
	CONFIG.output.publicPath = '/dist/'
	CONFIG.module.rules = (CONFIG.module.rules || []).concat([
		{
			test: /\.scss$/,
			use: [
				'style-loader?sourceMap',
				'css-loader?sourceMap',
				'postcss-loader?sourceMap',
				'sass-loader?sourceMap'
			]
		}
	])
}

export default CONFIG
