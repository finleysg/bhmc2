// import rollup      from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify';

export default {
    entry: 'src/app/main-aot.js',
    dest: 'tmp/bhmc.min.js', // output a single application bundle
    sourceMap: true,
    // sourceMapFile: 'tmp/bhmc.min.js.map',
    format: 'iife',
    onwarn: (warning) => {
        if ( warning.code === 'THIS_IS_UNDEFINED' ) return;
    },
    plugins: [
        nodeResolve({jsnext: true, module: true}),
        commonjs({
            include: ['node_modules/**'],
            namedExports: {
                'node_modules/ng2-cookies/index.js': ['Cookie'],
                'node_modules/ng2-bootstrap/index.js': ['ModalDirective', 'TypeaheadModule', 'ModalModule', 'DropdownModule'],
                'node_modules/raven-js/src/singleton.js': ['captureException', 'captureMessage', 'config'],
                'node_modules/lodash/lodash.js': ['merge', 'clone', 'cloneDeep'],
                'node_modules/showdown/dist/showdown.js': ['Converter']
            }
        }),
        uglify()
    ]
}
