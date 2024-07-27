import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import {uglify} from 'rollup-plugin-uglify';

export default [{
    input: 'src/SmoothMarkerBouncing.js',
    external: ['leaflet'],
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        name: 'bundle',
        globals: {
            leaflet: 'L'
        }
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        postcss({
            extensions: [ '.css' ]
        })
    ]
}, {
    input: 'src/SmoothMarkerBouncing.js',
    external: ['leaflet'],
    output: {
        file: 'dist/bundle.min.js',
        format: 'iife',
        name: 'bundle',
        globals: {
            leaflet: 'L'
        }
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        postcss({
            extensions: [ '.css' ]
        }),
        uglify()
    ]
}];
