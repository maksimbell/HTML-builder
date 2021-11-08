const fs = require('fs');
const newDir = '04-copy-directory/files-copy';
const path = require('path');
const fsPromises = require('fs').promises;


fs.access(__dirname + newDir, function (error) {
    if (error) {
        fs.mkdir(newDir, function (err) {
            if (err) {
                //console.log(err)
            } else {
                console.log("New directory successfully created.")
            }
        });
    } else {
        console.log("Directory exists.")
    }
})

fs.readdir(__dirname + '/files', {
    withFileTypes: true
}, (error, files) => {
    if (error) {
        console.log('Error occured!');
    } else {
        files.forEach((file) => {
            if (file.isFile()) {
                fs.stat(__dirname + '/secret-folder/' + file.name, (err, stats) => {
                    let ext = path.extname(file.name);
                    let base = path.basename(file.name, ext);
                    fs.promises.copyFile(__dirname + '/files/' + file.name, newDir + '/' + file.name);
                });
            }
        })
    }
})