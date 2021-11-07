const fs = require('fs');
const path = require('path');
const {
    stdin,
    stdout
} = require('process');
const process = require('process');
const stream = require('stream');
var readline = require('readline');

var myWriteStream = fs.createWriteStream(__dirname + '/text.txt', 'utf8');

var myReadLine = readline.createInterface({
    input: stdin,
    output: stdout
});

console.log('Hello! Enter text:');

myReadLine.on('line', (input) => {
    if (input == 'exit') {
        console.log('\nBye, bye!');
        myReadLine.close();
    } else {
        myWriteStream.write(input + '\n');
    }
});