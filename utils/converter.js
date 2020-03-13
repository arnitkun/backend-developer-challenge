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

    async function calculate(data, url, currency) {
        let supported = [];
        let unsupported = [];
        let filtered = {};
        let rates = await getRates(url, currency);
        console.log(rates);
        console.log("The target:" + rates[currency]);
        // console.log(typeof jsonData)
        data.forEach(element=> {
            // element = JSON.parse(ele);
            if(Object.keys(rates).includes(element["Donation Currency"]) && Object.keys(rates).includes(currency)) {
                let converted = {}
                converted["Donation Amount"] = parseFloat(element["Donation Amount"]) * rates[currency];
                converted["Fee"] = parseFloat(element.Fee) * rates[currency];
                // converted["Date"] = element["Date"];
                // console.log(converted["Date"]);
                converted.Nonprofit = element.Nonprofit;
                converted["Order Id"] = element["Order Id"];
                converted.currency = currency;
                supported.push(converted);

            } else {
                console.log("Unknown currency: " + element["Donation Currency"]);
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

    