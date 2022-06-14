const Store = require('electron-store');
const schema = {
    client_id:{
        type:'string',
        default:'48d0d6fe32e3486a80abc808d32498d6'
    },
    client_secret:{
        type:'string',
        default:'fe5b6079321d431984437d9fe2119019'
    },
    authorization_code:{
        type:'string',
        default:'AQDEoca0powCp2ayydUO0b7tFkLFIrpathM1psnIXuvhZ26KOBPkw6PFxDFMM6DcER_g2AfC-D-2uSKW1ubxwgv_BaZSfOtZaIiMoayQ8Ff0UJb2BDISTcftg7nbO120qS7q3tM0ROWwPgo1_TfXZP4LWEtJSkGrTSvdx0MFpW13CWboaVAsPC9JoplQtZD_o-CHyyGjjtG3xhSRfA'
    },
    access_token:{
        type:'string',
        default:'BQD9Javwgg01DNKwjmNgpkQboLMI72MDVIjfITq42PpmWsZW_gwJErOyd28uksbgJ85W4RZQteZ1Kf9grldMSPEY_l9ajLx9CAvV59M_8MhLBW5cKcAzv7lM2ENbJGMoy-Xqc--xZQYxPxuj4_0Rt_BShtBkdysYZsCfwBohNX2VhhGUqsulSwyNEysYn1rCQ_CArSQllDC7dgJJSKErWmlNotHLnmiUllOhhLHhggYJGxXViSrEeKTJAk0-k_jxPolWkatv8zt6W_WRI_QQ1c9Ep8QvDdoppEs9Yp-jm6fjtwPOBq5t'
    },
    refresh_token:{
        type: 'string',
        default: 'AQAkYdBbFxi71yzq0wTumTHnfXtiBRlCnhs2tzL8EaEM7uglxUN4uvfZMpRyxSXr_48B2uCog9h0zLqMYQIfkwqFard_NkT2t3B5CKC--UWv3J0-1mWRkq9cvDiRT-g05ww'
    }
};
module.exports = new Store({schema});