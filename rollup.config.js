import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import sass from 'rollup-plugin-sass';
import pkg from './package.json';
import gzip from 'rollup-plugin-gzip';
import filesize from 'rollup-plugin-filesize';

const globals = {
    'react': 'React',
    'react-dom': 'ReactDOM'
};

export default [
    {
        input: 'src/index.js',
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
            commonjs(),
            uglify(),
            sass({ output: 'lib/style.css' }),
            gzip(),
            filesize(),
        ]
    }
];