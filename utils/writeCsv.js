
const fastcsv = require('fast-csv');
const fs = require('fs');
const ws = fs.createWriteStream("out.csv");


function writeCsv(data){
    fastcsv
        .write(data, { headers: true })
        .pipe(ws);
}

module.exports = {
    writeCsv
}