/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'src/app',
            core: 'src/app/core',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

            // other libraries
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
            'ng2-cookies': 'npm:ng2-cookies',
            'angular2-toaster': 'npm:angular2-toaster/bundles/angular2-toaster.umd.js',
            'showdown': 'npm:showdown/dist',
            'moment': 'npm:moment',
            'ng2-bootstrap': 'npm:ng2-bootstrap/bundles/ng2-bootstrap.umd.js',
            'sweetalert2': 'npm:sweetalert2',
            'ng2-slim-loading-bar': 'npm:ng2-slim-loading-bar/bundles/index.umd.js',
            'raven-js': 'npm:raven-js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            core: {
                main: './index.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'ng2-cookies': {
                main: 'ng2-cookies.js',
                defaultExtension: 'js'
            },
            'angular2-toaster': {
                defaultExtension: 'js'
            },
            'showdown': {
                main: 'showdown.js',
                defaultExtension: 'js'
            },
            'moment': {
                main: 'moment',
                defaultExtension: 'js'
            },
            'ng2-bootstrap': {
                defaultExtension: 'js'
            },
            'sweetalert2': {
                main: 'dist/sweetalert2.js',
                defaultExtension: 'js'
            },
            'raven-js': {
                main: 'dist/raven.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);
