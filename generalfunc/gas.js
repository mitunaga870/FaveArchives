'use strict';
const {google} = require('googleapis');
const {OAuth2Client} = require('google-auth-library');
//認証情報
const scriptID = '1DXqXfF_FIO4JK_YrUE3PR6I-xIsfDSbDeXtRhHqFztNSlrU8ovIDbF0h';
const auth = new OAuth2Client('914328257447-tb29ar9npsgkf4uusbcnthi9opprt738.apps.googleusercontent.com','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');
auth.setCredentials({
    access_token:'ya29.A0ARrdaM9gi9ZNfDsHhftmU1Fp1g7ys1Oh3XDpGvFoe4ZEVWKB81TBGFejHQVxd2EEPGqk52dnXCub_NtrZYajYZrFnj2WM7ZQm5lZUU2Z4eZ2SuRrXANEPCM5ghysZVNoBGQUFUo_ySxU6Oo7KNb0G5_9o3XS',
    refresh_token:'1//04h2vbeufZAjhCgYIARAAGAQSNwF-L9IrlBcRou4BAELoRqNd7X2jRTXdtW9il_66pScTuSk55OEQxRUtKyercwERYO8oUBzCrbs'
});
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