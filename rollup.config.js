import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
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
};
