const  
    config = require('./config'),
    igdb = require('igdb-api-node').default,
    client = igdb(config.key)

// client.games({
//     fields: '*', // Return all fields
//     limit: 5, // Limit to 5 results
//     offset: 15 // Index offset for results
// }).then(response => {
//     // response.body contains the parsed JSON response to this query
//     console.log(response)
// }).catch(error => {
//     throw error;
// });



client.characters({
    fields: "*",    
    search: "Snake"
}).then(response => {
    console.log(response.body)

    // // response.body contains the parsed JSON response to this query
    // data.body.map((charData)=>{
    //     client.characters({
    //         id: charData.id
    //     })
    // }).then((response)=>{
    //     console.log(response)
    // })
    // .catch(error =>{
    //     throw error
    // })
}).catch(error => {
    throw error
});

console.log(config)