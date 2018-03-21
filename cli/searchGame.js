const igdb = require('../api/igdb-api')

exports.command = ['search', '$0', 's']

exports.describe = 'search a game by title'

exports.builder = {
    title: {
        alias: 't',
        describe: 'title of a game',
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
    igdb.getGame({
        fields: '*',
        search: argv.title,
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
            console.log(`Title: ${game.name}\nSummary: ${game.summary ? game.summary : 'Not available'}\n`)
            console.log('------------------------------------------------')
        }
    )
}