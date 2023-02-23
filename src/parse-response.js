const fs = require("fs");
const UPRN = process.env.UPRN;

function ParseAndSave(){
        
    return new Promise((resolve, reject) => {

        let parsedResponse = JSON.parse([fs.readFileSync("./src/response.json")]);
        UPRN_JSON = JSON.stringify(parsedResponse.integration.transformed.rows_data[UPRN]);

        fs.writeFile(`./src/UPRN.json`, UPRN_JSON, function(err) {
            if (err) {
                console.log(err);
            }

            resolve(UPRN_JSON);   
        });
                
     
    });            
};


module.exports = {
    ParseAndSave
}