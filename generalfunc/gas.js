'use strict';
const {google} = require('googleapis');
const {OAuth2Client} = require('google-auth-library');
//認証情報
const quoth = require('./gas_quoth.json');
const scriptID = quoth.scriptID;
const auth = new OAuth2Client(quoth.OAuth2Client[0],quoth.OAuth2Client[1]);
auth.setCredentials(quoth.setCredentials);
const script = google.script('v1');
const gas = (scam,array) => {
    return new Promise((resolve, reject) => {
        script.scripts.run({
            auth: auth,
            scriptId: scriptID,
            requestBody: {
                function: scam,
                parameters: array,
                devMode: true
            }
        }, (err, result) => {
            if (err) {
                console.log(err);
                reject(new Error(err));
            } else {
                resolve(result);
            }
        });
    });
}
module.exports = gas;