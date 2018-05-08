
const igdb = require('../api/igdb-api'),
chalk = require("chalk")
exports.command = ['searchCH', 'sC'] //originally -> ['search', '$0', 's'] 

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
    // slug: {
    //     describe: 'slug',
    //     type: 'string'
    // },
    // url: {
    //     describe: 'url',
    //     type: 'string'
    // },
    // created_at:{
    //     describe: 'created number',
    //     type: 'number'
    // },
    // updated_at:{
    //     describe: 'updated number',
    //     type: 'number'
    // },

    // mug_shot:{
    //     describe: 'image of character',
    //     type:'object'
    // },

    // gender:{
    //     describe: 'gender of character',
    //     type:'number'

    // },
    // akas: {
    //     describe: 'alias of character',
    //     type:'array of strings'
    // },

    // species:{
    //     describe: 'species of character',
    //     type:'number'
    // },

    // games:{
    //     describe: 'games of character',
    //     type:'number'
    // },

    // people:{
    //     describe: 'people of character',
    //     type:'number'
    // },

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
        search: argv.c,
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
            console.log(chalk `{cyan.bold Character Name: ${game.name}}\n{bgRed.bold Species: ${game.species ? game.species : 'Not available'}}\n{magenta.bold URL: ${game.url}}\n`)
            console.log(chalk `{white.bold *****************************************************}`)
        }
    )
}