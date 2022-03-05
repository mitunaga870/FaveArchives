const getstdata = require("../GUIfunc/searchfunc/gettitleandtime");
const url = new URL(window.location.href);
const params = url.searchParams;
const id = params.get('v');

(async () => {
    console.log(id)
})();