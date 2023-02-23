const fs = require("fs");
const lodash = require("lodash");

const TODAY = new Date().getTime();
const UPRN = process.env.UPRN;
const LED_REFUSE_COLOUR = process.env.LED_REFUSE_COLOUR || 'blue'
const LED_RECYCLE_COLOUR = process.env.LED_RECYCLE_COLOUR || 'green'

function DefineJsonVar(){
    return file = fs.readFileSync(`./src/UPRN.json`);
}

async function GetDateFromFile()
{
    try{ 
        UPRN_FILE = DefineJsonVar();
        UPRN_JSON = JSON.parse(UPRN_FILE);
        return new Date(UPRN_JSON.refusenextdate).getTime()
    } catch {
        console.error("Could not read UPRN.json file!");
    }
}

function IsJSONValid() {

    return GetDateFromFile()
    .then(function(jsonDate){
        if (TODAY < jsonDate)
            return true;
        else
            return false;
    })
    .catch(function(){        
        return false;
    })
}

function CheckBins(UPRN_JSON) {

    if (UPRN_JSON == undefined)
        UPRN_JSON = DefineJsonVar();

    console.log("Checking Bins...");
    
    UPRN_JSON = JSON.parse(UPRN_JSON);
    return new Promise((resolve, reject) => {

        if (UPRN_JSON.refusenextcount && lodash.isEqual(UPRN_JSON.refusenextcount, UPRN_JSON.recyclenextcount)) {
            console.log("Both Bins!");
            console.log(`Days until bin day: ${UPRN_JSON.refusenextcount}`);
            resolve(LED_RECYCLE_COLOUR);
        } else if (UPRN_JSON.refusenextdate) {
            console.log("Black Bins only!");
            resolve(LED_REFUSE_COLOUR);
        } else {
            throw new Error("Failed to compare bin day values!");
        }

    });
}


module.exports =  {
    IsJSONValid,
    CheckBins    
}
