const csvParser = require('csv-parser');
const fs = require('fs')
const fetch = require('node-fetch');
var URL = 'https://api.exchangeratesapi.io/latest';
const {calculate} = require('./converter');



function parseCSV(csvFile, currency) {
    let importedData = [];
    // console.log(currency);
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
            let list = {};
            let data = removeEmptyEntries(importedData, currency);
            calculate(data, URL, 'INR')
            .then(data => {
                let ans = aggregate(data.supported);
                console.log(ans)
            })
        })
}

function removeEmptyEntries(data, currency) {
    let collectedData = []
    console.log(currency);
    data.forEach(element => {
        if(element['Order Id'] == '') {
            //do nothing
        } else {
            collectedData.push(element);
        }
    });
    console.log(collectedData.length);
    return collectedData;
}

function aggregate(list) {
    const res = list.reduce((acc, d) => {
        let found = acc.find( a => a.name === d.Nonprofit);
        let donation_amount = d["Donation Amount"]
        let fee = d["Fee"];
        let currency = d.currency;

        if(!found) {
            acc.push({
                name: d.Nonprofit,
                donation: 1, 
                Fee: d["Fee"],
                currency: d.currency,
                Donation_amount: donation_amount
            })
          } else {
              
              acc.forEach(ob=> {
                  if(ob.name === found.name){
                      ob.donation += 1
                      
                      ob["Fee"] += fee
                      ob.Donation_amount += donation_amount
                  }
              })
            }
            return acc;
          }, []);

    return res;
}



module.exports = {
    parseCSV
}