var fs = require('fs-extra');
var resources = [
    'node_modules/core-js/client/shim.min.js',
    'node_modules/core-js/client/shim.min.js.map',
    'node_modules/zone.js/dist/zone.min.js'
];
resources.map(function(f) {
    var path = f.split('/');
    var t = 'dist/' + path[path.length-1];
    fs.createReadStream(f).pipe(fs.createWriteStream(t));
});
fs.createReadStream('src/index-dist.html').pipe(fs.createWriteStream('dist/index.html'));
fs.mkdirSync('dist/assets');
fs.copySync('src/assets/css', 'dist/assets/css');
fs.copySync('src/assets/fonts', 'dist/assets/fonts');
fs.copySync('src/assets/img', 'dist/assets/img');