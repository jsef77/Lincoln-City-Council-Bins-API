const https = require('https');
const fs = require('fs');

function WriteResponseToFile(PHPSessionID)
{
    fs.writeFileSync('./src/phpsesh.txt', PHPSessionID);
};

function GetNewPHPSesh(){

  return new Promise((resolve, reject) => {

    console.log("Fetching new PHP Session ID...");

    const options = {
      hostname: 'contact.lincoln.gov.uk',
      path: '/',
      method: 'GET',
    };

    const req = https.request(options, (res) => {

      let PHPSessionID = '';

      PHPSessionID = res.headers['set-cookie'][2].split(';')[0];
      PHPSessionID = PHPSessionID + ";"

      // WriteResponseToFile(PHPSessionID);
      resolve(PHPSessionID);
    });

    req.on('error', (error) => {
      console.error(error);
      reject(error);
    });

    req.write("");
    req.end();    
  });

}

module.exports = {
  GetNewPHPSesh,
}
