const { response } = require("express");
const fs = require("fs");

const POSTCODE = process.env.POSTCODE
const API_PATH = process.env.API_PATH

var myBody = `{"formValues":{"Section 1":{"postcode":{"value":"${POSTCODE}"}}}}`
var myHeaders = new Headers();

var fetchSuccess = false;

function WriteResponseToFile(responseData)
{
  return new Promise((resolve, reject) => {
    fs.writeFile("./src/response.json", responseData, function(err) {
      if (err)
        console.log(err);

        resolve("done")  
  }) 

});
};

function Fetch(phpSessionID){

  myHeaders.append("cookie", phpSessionID);
  myHeaders.append("Content-Type", "text/plain");

  return new Promise((resolve, reject) => {    
    console.log("Fetching New Response...");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort()
      if(fetchSuccess = false)
        throw new Error("Fetch Request Timeout. Ensure that variables are correct in .env file")
      }, 5000);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: myBody,
      redirect: 'follow',
      signal: controller.signal
    };

    fetch(API_PATH, requestOptions)
    .then(response => response.text())
    .then(response => WriteResponseToFile(response))
    .then(response => {fetchSuccess = true})
    .catch(error => console.log('error', error))
    .then(onComplete => resolve("done"))
    
  });
}

module.exports = {
  Fetch
};