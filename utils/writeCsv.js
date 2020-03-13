
const fastcsv = require('fast-csv');
const fs = require('fs');
const ws = fs.createWriteStream("Disbursed.csv");


function writeCsv(data){
    fastcsv
        .write(data, { headers: true })
        .pipe(ws);
}

module.exports = {
    writeCsv
}