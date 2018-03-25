const igdb = require('../api/igdb-api')

//originally -> ['search', '$0', 's']
exports.command = ['searchGameEngine', 'ge']

exports.describe = 'search GameEngine of a game' //'search a game by title'

exports.builder = {
    title: {
        alias: 'g', 
        describe: 'name(g) of GameEngine', //title of the game
        type: 'string'
    },
    id: {
        describe: 'id of a the GameEngine on the IG database',
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
    if(!argv.id && !argv.title){
        renderMessage("Please specify a game id or game title")
        return ;
    }

    if(argv.id && argv.title){
        renderMessage("Only a title or an id is allowed")
        return ;
    }
    igdb.getGameEngine({
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
            console.log(`GameEngine: ${game.name}\nSpecies: ${game.species ? game.species : 'Not available'}\nURL: ${game.url}\n`)
            console.log('------------------------------------------------')
        }
    )
} 
function renderMessage(str){
    console.log(str)
}