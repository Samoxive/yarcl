import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import scss from 'rollup-plugin-scss';
import pkg from './package.json';

const globals = {
    'react': 'React',
    'react-dom': 'ReactDOM'
};

export default [
    {
        input: 'build/index.js',
        output: [
            { name: 'yarcl', file: pkg.browser, format: 'umd', globals },
            { file: pkg.main, format: 'cjs', globals },
            { file: pkg.module, format: 'es', globals }
        ],
        external: [
            'react',
            'react-dom'
        ],
        plugins: [
            resolve(),
            commonjs()
        ]
    }
];