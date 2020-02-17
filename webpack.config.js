module.exports = {
	entry: ['./react/main.js', './react/main.scss'],
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
			{ // sass / scss loader for webpack
				test: /\.scss$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '/[name].css',
						}
					},
					{
						loader: 'extract-loader'
					},
					{
						loader: 'css-loader?-url'
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	}
};
