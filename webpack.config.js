const path = require('path')

// 在内存中,根据指定的模板页面,生成一份内存中的首页,同时把打包好的bundle.js注入到页面底部
// 如果需要配置插件,需要在导出的对象中,挂载一个plugin节点
const htmlwebpackplugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')//vue引入这行

module.exports = {

	entry: './src/main.js', //入口文件

	output: {
		path: path.resolve(__dirname, 'dist'), //输出文件
		filename: 'bundle.js'
	},
	plugins: [ //所有webpack的插件的配置节点
		new htmlwebpackplugin({ // 打包输出HTML
			title: 'Hello World app',
			minify: { // 压缩HTML文件
				removeComments: true, // 移除HTML中的注释
				collapseWhitespace: true, // 删除空白符与换行符
				minifyCSS: true // 压缩内联css
			},
			filename: 'index.html',
			template: './src/index.html'
		}),
		new VueLoaderPlugin(),
	],
	module: {
		rules: [{
				test: /\.css$/,
				use: [{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',

					}
				]
			},
			{
				test: /\.png|jpg|jpeg|gif|bmp$/,
				use: {
					loader: 'url-loader?limit=9000&name=[name].[ext]'
				}
			},
			{
				test: /\.ttf|eot|svg|woff|woff2$/,
				use: {
					loader: 'url-loader'
				}
			},
			{
				// 各个包的作用如下 　　

				// babel-loader：加载器
				// @babel/core：babel核心包,babel-loader的核心依赖
				// @babel/preset-env：ES语法分析包
				// @babel/runtime和@babel/plugin-transform-runtime：babel 编译时只转换语法，几乎可以编译所有时新的 JavaScript 语法，但并不会转化BOM（浏览器）里面不兼容的API。比如 Promise,Set,Symbol,Array.from,async 等等的一些API。这2个包就是来搞定这些api的。
				// @babel/plugin-proposal-class-properties：用来解析类的属性的。
				// 　　3.配置webpack.config.js。由于“babel-lodaer”包名字没变，api写法也没变，还是那么写 　　

				// 　　{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},//处理高级ES语法的babel_lodaer

				//  　　4.添加.babelrc配置文件，并在该文件中写下如下配置信息 　　

				// 　　  {

				//     　　　"presets": ["@babel/preset-env"],

				//    　　　"plugins": ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-class-properties"]

				// 　　  }
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{test:/\.vue$/,loader:"vue-loader"}
		]
	},
		
	resolve:{
		alias:{  //配置vue结尾文件调用包的地址
			// "vue$":"vue/dist/vue.js"
		}
	}
}
