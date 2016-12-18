'use strict';

module.exports = {
  //server: './src',
  server: {
    baseDir: ['./', './src'],
    index: 'index.html'
  },
  files: './src/**/*.{js, html, css}',
  open: false,
  // server: {
  //     //'baseDir': './',
  //     middleware: {
  //         2: lessMiddleware
  //     }
  // },
  notify: false,
  browser: ['chrome']
};
