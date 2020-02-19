module.exports = {
	entry: ['./react/main.js'],
	output: {
		path: __dirname + '/www',
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"]
					}
				}
			},
			{
				test:/\.(scss)$/,
				use:['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.(css|eot|ttf|woff|woff2)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						},
					},
				],
			}
		]
	}
};
