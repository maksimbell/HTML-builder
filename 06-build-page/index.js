const fs = require('fs');
const newDir = '06-build-page/project-dist';
const path = require('path');
const fsPromises = require('fs').promises;
const readline = require('readline');

let lineReader = readline.createInterface({
    input: fs.createReadStream(__dirname + '/template.html')
});

function readSpecificFile(fileName) {
    console.log(fileName);
    var fileReadStream = fs.createReadStream(__dirname + '/components/' + fileName + '.html', 'utf8');

    fileReadStream.on('data', (chunk) => {
        lineReader.write(chunk);
        // lineReader.write('/n');
    });
}

fs.mkdir(newDir, function (err) {
    if (err) {
        //console.log(err)
    } else {
        console.log("New directory successfully created.")
    }
});

const myWriteStream = fs.createWriteStream(__dirname + '/project-dist/index.html', 'utf8');

lineReader.on('line', function (line) {
    if (line.includes('{{')) {
        readSpecificFile(line.trim().replace(/[{()}]/g, ''));

    } else {
        myWriteStream.write(line);
        myWriteStream.write('\n');
    }
});

const stylesWriteStream = fs.createWriteStream(__dirname + '/project-dist/style.css', 'utf8');
let stylesReadStream = null;

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
                        stylesReadStream = fs.createReadStream(__dirname + '/styles/' + file.name, 'utf8');

                        stylesReadStream.on('data', (chunk) => {
                            stylesWriteStream.write(chunk);
                            // console.log(chunk);
                        });
                    }
                });
            }
        })
    }
})

fs.mkdir(newDir + '/assets', function (err) {
    if (err) {
        //console.log(err)
    } else {
        console.log("New directory successfully created.")
    }
});

fs.readdir(__dirname + '/assets', {
    withFileTypes: true
}, (error, dirs) => {
    if (error) {
        console.log('Error occured!');
    } else {
        dirs.forEach((dir) => {
            if (dir.isFile()) {
                fs.mkdir(newDir + '/assets/' + dir.name, function (err) {
                    if (err) {
                        //console.log(err)
                    } else {
                        // console.log("New directory successfully created.")
                    }
                });
            } else {
                fs.readdir(__dirname + '/assets/' + dir.name, {
                    withFileTypes: true
                }, (error, files) => {
                    if (error) {
                        console.log('Error occured!');
                    } else {
                        files.forEach((file) => {
                            fs.mkdir(newDir + '/assets/' + dir.name, function (err) {
                                if (err) {
                                    //console.log(err)
                                } else {
                                    // console.log("New directory successfully created.")
                                }
                            });
                            fs.promises.copyFile(__dirname + '/assets/' + dir.name + '/' + file.name, newDir + '/assets/' + dir.name + '/' + file.name);
                        })
                    }
                })
            }
        })
    }
})