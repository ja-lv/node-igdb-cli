const
    config = require('./config'),
    igdb = require('igdb-api-node').default,
    client = igdb(config.key),
    request = require('request')

//takes in args, ex:
// {
//     fields: "*",
//     search: 'metal gear'
// }
//refer to https://igdb.github.io/api/references/ for args


//get game using node wrapper:
exports.getGameWrapper = (args) =>{
    return new Promise(function(fulfill, reject){
        client.games(args).then(response => {
            fulfill(response.body)
        }).catch(error => {
            reject(error)
        });
    })
}

exports.getGame = (args) =>{
    return new Promise(function(fulfill, reject){
        request(
        {
            url: config.url + config.games + argsUrl(args),
            headers: {
                'user-key': config.key,
                'accept': "application/json"
            }
        },
        (error, res, body) =>{
            if(error) reject(error)

            fulfill(JSON.parse(body))
        })
    })
}

exports.getEngine = (args) =>{
    return new Promise(function(fulfill, reject){
        request(
        {
            url: config.url + config.engine + argsUrl(args),
            headers: {
                'user-key': config.key,
                'accept': "application/json"
            }
        },
        (error, res, body) =>{
            if(error) reject(error)

            fulfill(JSON.parse(body))
        })
    })
}

function argsUrl({fields = '', ids = '', search = '', limit = ''}){
    const url = "/"
                + ((Array.isArray(ids) && ids[0]) ? ids.join(',') + "?" : (search && typeof search == "string") ? "?search=" + search : '?')
                + ((Array.isArray(fields) && fields.length) ? "&fields=" + fields.join(',') : (fields == "*") ? "&fields=*" : '')
                + ((typeof limit == "number" && limit > 0) ? "&limit=" + limit : '')

    return url
}
