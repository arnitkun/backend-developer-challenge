
## Installation:
1. Run `https://github.com/arnitkun/backend-developer-challenge`
2. In the root directory, run `npm install`

## Steps to run
1. `npm start`
2. Go to `localhost:3000`
3. select a `.csv` file and the currency from the dropdown.
4. A `Disbursed.csv` file will be generated in the root directory of the project. 

## Note: 
1. The base currencies supported by the exchangeratesapi.io is rather limited, so the calculations are only done for the 
supported currencies.
2. The filtered donations with unsupported currencies can be found in the `filtered.unsupported` list in `/utils/converter.js`. 

## Other projects:

**Subscription service:** https://github.com/arnitkun/payment-api-server