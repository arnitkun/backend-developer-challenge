const fetch = require('node-fetch');

/**
 * 
 * @param {string} url URL of the api that fetches the current exchange rates 
 * @param {string} currency Currency with respect to which the conversion is to be done. 
 */
async function getRates(url, currency) {
    
    let link = url + `?base=${currency}`;
    console.log(link);
    let rates = await fetch(link);

    if(rates.ok) {
        let json = await rates.json();
        return json.rates;
    } else {
        console.log("some error");
    }
}
/**
 * Returns an object with 2 lists, one containing supported currency donations and one 
 * containing unsupported currency donations. 
 * @param {list} data 
 * @param {string} url 
 * @param {string} currency 
 */
async function calculate(data, url, currency) {
    let supported = [];
    let unsupported = [];
    let filtered = {};
    let rates = await getRates(url, currency);
    
     data.forEach(element=> {
        if(Object.keys(rates).includes(element["Donation Currency"]) && Object.keys(rates).includes(currency)) {
            let converted = {}
            converted["Donation Amount"] = parseFloat(element["Donation Amount"]) * rates[currency];
            converted["Fee"] = parseFloat(element.Fee) * rates[currency];
            converted.Nonprofit = element.Nonprofit;
            converted["Order Id"] = element["Order Id"];
            converted.currency = currency;
            supported.push(converted);
        } else {
            unsupported.push(element);
        }
    })

        filtered.supported = supported;//contains the list of donations whose currency is supported by exchangeratesapi
        filtered.unsupported = unsupported;//contains the list of donations whose currency is NOT supported by exchangeratesapi
        return filtered;
        
    }

    
    module.exports = {
        calculate
    }