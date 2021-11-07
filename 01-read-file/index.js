const fs = require('fs');
const path = require('path');
const stream = require('stream');

var myReadStream = fs.createReadStream(__dirname + '/text.txt', 'utf8');

myReadStream.on('data',(chunk)=>{console.log(chunk)});