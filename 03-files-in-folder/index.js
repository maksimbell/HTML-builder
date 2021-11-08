const fs = require('fs');
const path = require('path');

fs.readdir(__dirname + '/secret-folder', {
    withFileTypes: true
}, (error, files) => {
    if (error) {
        console.log('Error occured!');
    } else {
        files.forEach((file) => {
            if (file.isFile()) {
                fs.stat(__dirname + '/secret-folder/' + file.name, (err, stats) => {
                    size = stats.size;
                    let ext = path.extname(file.name);
                    let base = path.basename(file.name, ext);
                    console.log(base + ' - ' + ext.slice(1) + ' - ' + (stats.size / 1024) + 'kb');
                });
            }
        })
    }
})