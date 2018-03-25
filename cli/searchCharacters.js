/*
To be edited to get characters instead of games
*/
<<<<<<< HEAD
const igdb = require('../api/igdb-api'),
chalk = require("chalk")
exports.command = ['searchCH', 'sC'] //originally -> ['search', '$0', 's'] 
=======

const igdb = require('../api/igdb-api')

exports.command = ['searchCH', '$0', 'sC'] //originally -> ['search', '$0', 's']
>>>>>>> origin/genres

exports.describe = 'search a character by name' //'search a game by title'

exports.builder = {
<<<<<<< HEAD
    character: {
=======
    title: {
>>>>>>> origin/genres
        alias: 'c', //t
        describe: 'name(c) of the character', //title of the game
        type: 'string'
    },
    id: {
<<<<<<< HEAD
        describe: 'id of a game on the IG database',
=======
        describe: 'id of a the game on the IG database',
>>>>>>> origin/genres
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
<<<<<<< HEAD
        search: argv.c,
        ids: [argv.id],
=======
        search: argv.name,
        id: argv.id,
>>>>>>> origin/genres
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
<<<<<<< HEAD
            console.log(chalk `{cyan.bold Character Name: ${game.name}}\n{bgRed.bold Species: ${game.species ? game.species : 'Not available'}}\n{magenta.bold URL: ${game.url}}\n`)
            console.log(chalk `{white.bold *****************************************************}`)
=======
            console.log(`Character Name: ${game.name}\nSpecies: ${game.species ? game.species : 'Not available'}\nURL: ${game.url}\n`)
            console.log('------------------------------------------------')
>>>>>>> origin/genres
        }
    )
}