import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import postcss from 'rollup-plugin-postcss'
import { uglify } from 'rollup-plugin-uglify'

const NODE_ENV = process.env.NODE_ENV || 'development'
const outputFile = NODE_ENV === 'production' ? './dist/index.js' : './lib/index.js'

export default {
	input: 'src/index.js',
	output: {
		file: outputFile,
		format: 'cjs'
	},
	// All the used libs needs to be here
	external: [
		'react-is',
		'react',
		'react-proptypes',
		'react-dom',
		'react-router-dom',
		'redux-form',
		'sm-react-common-loader',
	],
	plugins: [
		postcss({
			plugins: []
		}),
		replace({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
		}),
		resolve(),
		babel({
			exclude: 'node_modules/**',
			plugins: ['external-helpers'],
			runtimeHelpers: true
		}),
		commonjs(),
		uglify()
	]
}
