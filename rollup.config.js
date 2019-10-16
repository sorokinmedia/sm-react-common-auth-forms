import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize';

const NODE_ENV = process.env.NODE_ENV || 'development'
const outputFile = NODE_ENV === 'production' ? './dist/index.js' : './lib/index.js'

export default {
	input: 'src/index.js',
	output: [
		{
			file: 'dist/index.js',
			format: 'es',
		}
	],
	// All the used libs needs to be here
	external: [
		'react-is',
		'react',
		'react-dom',
		'react-proptypes',
		'react-router-dom',
		'redux-form',
		'redux-saga',
		'react-redux',
		'sm-react-common-loader',
	],
	plugins: [
		resolve(),
		babel({
			exclude: '**/node_modules/**',
			runtimeHelpers: true
		}),
		replace({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
		}),
		commonjs(),
		postcss({
			plugins: []
		}),
		terser(),
		filesize()
	]
}
