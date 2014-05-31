var fs = require('fs');
var o = {};
var dir = fs.readdirSync('src');
dir.forEach(function(file){
    file = file.substring(0,file.indexOf('.'));
    var build = 'build/'+file+'.min.js',
        src = 'src/'+file+'.js';
    o[build] = src;
});
console.log(o);