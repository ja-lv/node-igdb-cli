const igdb = require('../api/igdb-api')

exports.command = ['search', 's']

exports.describe = 'search a game by title'

exports.demandCommand = true

exports.builder = {
    title: {
        alias: ['t'],
        describe: 'title of a game',
        type: 'string'
    },
    id: {
        alias: ['i'],
        describe: 'id of a the game on the IG database',
        type: 'number'
    },
    limit: {
        alias: 'l',
        default: 5,
        describe: 'limits the result of the search',
        type: 'number'
    }
}

exports.handler = (argv) => {
    if(!argv.id && !argv.title){
        renderMessage("Please specify a game id or game title")
        return 0
    }

    if(argv.id && argv.title){
        renderMessage("Only a title or an id is allowed")
        return 0
    }

    igdb.getGame({
        fields: '*',
        search: argv.title,
        ids: [argv.id],
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
            console.log(`\nTitle: ${game.name}\nSummary: ${game.summary ? game.summary : 'Not available'}\n`)
            console.log('------------------------------------------------')
        }
    )
}

function renderMessage(str){
    console.log(str)
}