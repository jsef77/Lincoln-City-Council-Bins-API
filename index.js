const dotenv = require('dotenv');
dotenv.config();

const php = require('./src/phpsesh-request');
const fetch = require('./src/fetch-response');
const parse = require('./src/parse-response');
const interpret = require('./src/interpret-parsed');
const led = require('./src/led-controller');
const { onBoardReady } = require('./src/led-controller');



async function run() {

    var boardIsReady = false;
    onBoardReady.on('ready', (isReady) => {
        console.log("BOARD READY!");
        boardIsReady = isReady;    
    })
    

    isJSONValid = await interpret.IsJSONValid()
    
    if (isJSONValid) {
        console.log("Up To Date Response! \n");
        interpret.CheckBins()
        .then(colour => SetLEDColour(colour))
    } else {

        console.error("Outdated or Unavailable Response \n");
        php.GetNewPHPSesh()
        .then(phpSessionID => fetch.Fetch(phpSessionID))
        .then(onComplete => parse.ParseAndSave())
        .then(uprn_json => interpret.CheckBins(uprn_json))
        .then(colour => SetLEDColour(colour))
    }

    function SetLEDColour(colour)
    {
        if (boardIsReady){
            console.log("LED set!");
            led.SetColour(colour);}
        else{
            console.log("Waiting for board...");
            setTimeout(() => {
               SetLEDColour(colour); 
            }, 450);}
    }
}

run();