const SpotifyWebApi = require("spotify-web-api-node");
const spstore = require("./spotityqouth");
module.exports = async () =>{
    var spotifyApi = new SpotifyWebApi({
        clientId: spstore.get('client_id'),
        clientSecret: spstore.get('client_secret'),
        redirectUri: 'http://localhost:8888/callback'
    });
    spotifyApi.setAccessToken(spstore.get('access_token'));
    spotifyApi.setRefreshToken(spstore.get('refresh_token'));
    await spotifyApi.refreshAccessToken().then(data => {
        spotifyApi.setAccessToken(data.body['access_token']);
        spstore.set('access_token', data.body['access_token']);
    })
    return  spotifyApi;
}