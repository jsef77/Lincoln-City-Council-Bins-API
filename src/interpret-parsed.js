const fs = require("fs");

const TODAY = new Date().getTime();

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

module.exports =  {
    IsJSONValid, 
}
