/* eslint-disable indent */
module.exports = {
		presets: [
				['@babel/preset-env', { modules: false }],
				['@babel/preset-react', { modules: false }],
		],
		plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-export-default-from']
}
