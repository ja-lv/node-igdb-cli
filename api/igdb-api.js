const  
    config = require('./config'),
    igdb = require('igdb-api-node').default,
    client = igdb(config.key)

//takes in args, ex:
// {
//     fields: "*",   
//     search: 'metal gear'
// }
//refer to https://igdb.github.io/api/references/ for args
exports.getGame = (args) =>{
    return new Promise(function(fulfill, reject){
        client.games(args).then(response => {
            fulfill(response.body)
        }).catch(error => {
            reject(error)
        });  
    })
}