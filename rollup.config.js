import { terser } from 'rollup-plugin-terser';

export default {
	input: './lib/index.js',
	output: {
		file: './dist/strve-router.esm.js',
		format: 'esm',
	},
	plugins: [terser()],
};
