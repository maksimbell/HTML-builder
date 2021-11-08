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
        lineReader.write('/n');
    });
}

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

const myWriteStream = fs.createWriteStream(__dirname + '/project-dist/index.html', 'utf8');

lineReader.on('line', function (line) {
    if (line.includes('{{')) {
        readSpecificFile(line.trim().replace(/[{()}]/g, ''));

    } else {
        myWriteStream.write(line);
        myWriteStream.write('\n');
    }
});