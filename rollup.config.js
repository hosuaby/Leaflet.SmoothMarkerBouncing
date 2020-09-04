import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import {uglify} from "rollup-plugin-uglify";

export default [{
    input: 'src/SmoothMarkerBouncing.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        name: 'bundle'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        commonjs()
    ]
}, {
    input: 'src/SmoothMarkerBouncing.js',
    output: {
        file: 'dist/bundle.min.js',
        format: 'iife',
        name: 'bundle'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        commonjs(),
        uglify()
    ]
}];
