import { terser } from 'rollup-plugin-terser';
const replace = require('@rollup/plugin-replace');
const version = require('./package.json').version;

const banner =
	'/*!\n' +
	` * Strve Router v${version}\n` +
	` * (c) 2021-${new Date().getFullYear()} maomincoding\n` +
	' * Released under the MIT License.\n' +
	' */';

const config = {
	input: './lib/src/index.js',
	output: {
		banner,
		file: './dist/strve-router.esm.js',
		format: 'esm',
	},
	plugins: [terser()],
};

const vars = {
	__VERSION__: version,
};
config['plugins'].push(replace(vars));

module.exports = config;
