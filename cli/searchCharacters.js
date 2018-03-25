/*
To be edited to get characters instead of games
*/
const igdb = require('../api/igdb-api'),
chalk = require("chalk")
exports.command = ['searchCH', '$0', 'sC'] //originally -> ['search', '$0', 's']

exports.describe = 'search a character by name' //'search a game by title'

exports.builder = {
    character: {
        alias: 'c', //t
        describe: 'name(c) of the character', //title of the game
        type: 'string'
    },
    id: {
        describe: 'id of a game on the IG database',
        type: 'number'
    },
    limit: {
        alias: 'l',
        default: 1,
        describe: 'limits the result of the search',
        type: 'number'
    }
}

exports.handler = (argv) => {
    igdb.getCharacters({
        fields: '*',
        search: argv.name,
        id: argv.id,
        limit: argv.limit
    }).then(response =>{
        if(response)
            renderGameArray(response)
    })
    .catch(error=>{
        throw error
    })
}

function renderGameArray(arr){
    arr.map((game)=>{
            console.log(chalk `{cyan.bold Character Name: ${game.name}}\n{bgRed.bold Species: ${game.species ? game.species : 'Not available'}}\n{magenta.bold URL: ${game.url}}\n`)
            console.log(chalk `{white.bold *****************************************************}`)
        }
    )
}