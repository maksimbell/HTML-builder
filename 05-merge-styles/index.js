const fs = require('fs');
const path = require('path');
const stream = require('stream');

const myWriteStream = fs.createWriteStream(__dirname + '/project-dist/bundle.css', 'utf8');
let myReadStream = null;

fs.readdir(__dirname + '/styles', {
    withFileTypes: true
}, (error, files) => {
    if (error) {
        console.log('Error occured!');
    } else {
        files.forEach((file) => {
            if (file.isFile()) {
                fs.stat(__dirname + '/styles/' + file.name, (err, stats) => {
                    let ext = path.extname(file.name);
                    if (ext == '.css') {
                        myReadStream = fs.createReadStream(__dirname + '/styles/' + file.name, 'utf8');

                        myReadStream.on('data', (chunk) => {
                            myWriteStream.write(chunk + '\n');
                            // console.log(chunk);
                        });
                    }
                });
            }
        })
    }
})