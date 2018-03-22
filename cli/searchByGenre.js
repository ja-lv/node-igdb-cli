

const igdb = require('../api/igdb-api')
// const  inquirer = require('inquirer')

exports.command = ['searchGenre', 'g']

exports.describe = 'search genre of a game' //'search a game by title'

exports.builder = {
    title: {
        alias: 'g', //t
        describe: 'name(g) of genre', //title of the game
        type: 'string'
    },
    id: {
        describe: 'id of a the game on the IG database',
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
    igdb.getGenre({
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
            console.log(`Genre: ${game.name}\nSpecies: ${game.species ? game.species : 'Not available'}\nURL: ${game.url}\n`)
            console.log('------------------------------------------------')
        }
    )
}