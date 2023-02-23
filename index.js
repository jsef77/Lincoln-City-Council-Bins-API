const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

const php = require('./src/phpsesh-request');
const fetch = require('./src/fetch-response');
const parse = require('./src/parse-response');
const interpret = require('./src/interpret-parsed');


async function run() {

    isJSONValid = await interpret.IsJSONValid()
        .then(valid => {
            if (valid) {
                console.log("Up To Date Response! See: ./src/UPRN.json");
                process.exit()
            } else {
                console.error("Outdated or Unavailable Response \n");
                php.GetNewPHPSesh()
                .then(phpSessionID => fetch.Fetch(phpSessionID))
                .then(onComplete => parse.ParseAndSave())
                .then(onComplete => process.exit())
            }
        })
}

run();