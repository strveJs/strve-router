import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/index.js',
  output: {
    file: './dist/strve-router.esm.js',
    format: 'esm'
  },
  plugins: [
    terser()
  ]
}