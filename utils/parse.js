const csvParser = require('csv-parser');
const fs = require('fs')



function parseCSV(csvFile, currency) {
    let importedData = [];
    console.log(currency);
    fs.createReadStream(csvFile)
        .on('error', (error) => {
            console.log(error);
        })
        .pipe(csvParser())
        .on('data', (row) => {
            importedData.push(row);
        })
        .on('end', ()=>{
            console.log('CSV processed');
            disburse(importedData, currency);
        })
}

function disburse(data, currency) {
    console.log(currency);
    data.forEach(element => {
        console.log(element);
    });
}

module.exports = {
    parseCSV
}