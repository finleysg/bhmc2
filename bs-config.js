'use strict';

// module.exports = {
//     server: {
//         baseDir: ['./', './src'],
//         index: 'index.html'
//     },
//     files: './src/**/*.{js, html, css}',
//     notify: false,
//     open: false
// };

module.exports = {
    port: 8080,
    files: './dist/**/*.{js, html, css}',
    server: {
        'baseDir': './dist',
    },
    notify: false,
    browser: ['chrome']
};
