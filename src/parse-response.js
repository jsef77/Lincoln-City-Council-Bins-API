const fs = require("fs");
const UPRN = process.env.UPRN;

function ParseAndSave(){
        
    return new Promise((resolve, reject) => {

        let parsedResponse = JSON.parse([fs.readFileSync("./src/response.json")]);
        UPRN_JSON = JSON.stringify(parsedResponse.integration.transformed.rows_data['000235028267'], null, "\t");

        fs.writeFile(`./src/UPRN.json`, UPRN_JSON, function(err) {
            console.log("Writing to /src/UPRN.json...");
            if (err) {
                console.log(err);
            }

            resolve("done");
        });
                
                
    });            
};


module.exports = {
    ParseAndSave
}