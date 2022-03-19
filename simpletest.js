const gas = require("./generalfunc/gas");
const quary = require('./generalfunc/sqlfanc/query');
var scan = require('./generalfunc/scan');
require('dotenv').config();
var  SpotifyWebApi  =  require('spotify-web-api-node' );
const client_id = "48d0d6fe32e3486a80abc808d32498d6";
const client_secret = "fe5b6079321d431984437d9fe2119019";
const authorization_code = "AQDEoca0powCp2ayydUO0b7tFkLFIrpathM1psnIXuvhZ26KOBPkw6PFxDFMM6DcER_g2AfC-D-2uSKW1ubxwgv_BaZSfOtZaIiMoayQ8Ff0UJb2BDISTcftg7nbO120qS7q3tM0ROWwPgo1_TfXZP4LWEtJSkGrTSvdx0MFpW13CWboaVAsPC9JoplQtZD_o-CHyyGjjtG3xhSRfA";


(async () => {
    var spotifyApi = new SpotifyWebApi({
        clientId: client_id,
        clientSecret: client_secret,
        redirectUri: 'http://localhost:8888/callback'
    });
    process.env.aa="fdas"
    var token = process.env.access_token;
    var refresh = process.env.refresh_token;
    console.log(token)
    spotifyApi.setAccessToken(token);
    spotifyApi.setRefreshToken(refresh);
    try {
        await spotifyApi.searchTracks('テスト',{"Accept-Language": "ja" });
    }catch (e){
        spotifyApi.refreshAccessToken().then(data=>{
            spotifyApi.setAccessToken(data.body['access_token']);
        })
    }
    let temp = await quary('select * from songlist');
    for(var value of temp){
        if (value.spotifyid != null){
            continue;
        }
        console.log(value.songname+"の検索結果")
        let num = 0;
        let res = await spotifyApi.searchTracks(value.songname,{"Accept-Language": "ja" });
        for(var item of res.body.tracks.items) {
            console.log("結果"+num++);
            console.log("   タイトル:" + item.name);
            let artists = "";
            for(var artist of item.artists) {
                artists += String(artist.name)
                artists += ",";
            }
            console.log("   アーティスト" + artists);
            let sctemp = await scan();
            if (sctemp.match("y")) {
                await quary('update songlist set songname = \''+await ajust(item.name)+'\',spotifyid =\''+await ajust(item.id)+'\',singer=\''+await ajust(artists)+'\' where songid= \''+await ajust(value.songid)+'\';');
                break;
            }
        }
    }
})();

async function ajust(txt){
    let res = String(txt).replace(/\'/g,"\\\'");
    return res;
}
