const fs = require('fs-extra');
const crypto = require('crypto');
const replaceStream = require('replacestream');
const version = require('./package.json').version;

fs.emptyDirSync('dist');

// NPM resources to copy to the distribution directory
const npm_resources = [
    'node_modules/core-js/client/shim.min.js',
    'node_modules/core-js/client/shim.min.js.map',
    'node_modules/zone.js/dist/zone.min.js'
];
npm_resources.map(function(f) {
    const path = f.split('/');
    const t = 'dist/' + path[path.length-1];
    fs.createReadStream(f).pipe(fs.createWriteStream(t));
});

// Source assets
fs.createReadStream('src/200.html').pipe(fs.createWriteStream('dist/200.html'));
fs.createReadStream('src/404.html').pipe(fs.createWriteStream('dist/404.html'));
fs.copySync('src/assets/fonts', 'dist/assets/fonts');
fs.copySync('src/assets/img', 'dist/assets/img');

// Javascript bundles to hash and inject
let jsInject = [];
const js_resources = [
    'tmp/bhmc.min.js',
    'tmp/bhmc.min.js.map'
];

js_resources.map(function(f) {
    const path = f.split('/');
    const t = 'dist/' + path[path.length-1];
    const contents = fs.readFileSync(f);
    const hash = crypto.createHash('md5').update(contents).digest('hex');
    if (!t.endsWith('.map')) {
        jsInject.push(`<script src="${path[path.length-1]}?${hash.substring(0, 10)}"></script>`);
    }
    fs.createReadStream(f).pipe(fs.createWriteStream(t));
});

// CSS files to hash and inject
let cssInject = [];
const css_resources = [
    'src/assets/css/app.css',
    'src/assets/css/vendor.css'
];
fs.mkdir('./dist/assets/css');
css_resources.map(function(f) {
    const path = f.split('/');
    const t = 'dist/assets/css/' + path[path.length-1];
    const contents = fs.readFileSync(f);
    const hash = crypto.createHash('md5').update(contents).digest('hex');
    if (!t.endsWith('.map')) {
        cssInject.push(`<link rel="stylesheet" href="assets/css/${path[path.length-1]}?${hash.substring(0, 10)}">`);
    }
    fs.createReadStream(f).pipe(fs.createWriteStream(t));
});

// Version number to inject
const displayVersion = `v${version}`;

// Inject and copy the index page to this distribution directory
fs.createReadStream('src/index-dist.html')
    .pipe(replaceStream(/(<!\-\- inject:js \-\->)([\s\S]*?)(<!\-\- endinject \-\->)/gm, jsInject.join('\n')))
    .pipe(replaceStream(/(<!\-\- inject:css \-\->)([\s\S]*?)(<!\-\- endinject \-\->)/gm, cssInject.join('\n')))
    .pipe(replaceStream('INJECT-VERSION', displayVersion))
    .pipe(fs.createWriteStream('dist/index.html'));

fs.emptyDir('tmp');
