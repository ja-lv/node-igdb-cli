const igdb = require('../api/igdb-api')
const  inquirer = require('inquirer'),
chalk = require('chalk')


exports.command = ['searchGenre', 'g']

exports.describe = 'search genre of a game' //'search a game by title'

exports.builder = {
    title: {
        alias: 'g', //t
        describe: 'name(g) of genre', //title of the game
        type: 'string'
    },
    // id: {
    //     describe: 'id of a the game on the IG database',
    //     type: 'number'
    // },
    limit: {
        alias: 'l',
        default: 10,
        describe: 'limits the result of the search',
        type: 'number'
    }
}
// https://api-2445582011268.apicast.io/genres/?fields=name,games&limit=20
// https://api-endpoint.igdb.com/genres/?fields=name,games&limit=10

exports.handler = (argv) => {
    //if genre search is entered, search that genre
    let search = argv.g ? argv.g : ''
    igdb.getGenre({
        search: search,
        fields: 'name,games'
    }).then(response =>{
        //check if there is a response
        if((Array.isArray(response) && response[[0]])){
            // renderGameArray(response)
            chooseGenre(response, argv.l)
        }
        else console.log("No genres found.")
    })
    
    .catch(error=>{
        throw error
    })
}

const chooseGenre = (res, limit) => {
    let selection =[]
    res.forEach(genre => {
        selection.push(`genre: ${genre.name}`)
    })

    return inquirer.prompt([{
        type: 'list',
        message: 'Select a genre to show some Games',
        name: 'genre',

        choices: selection

    }])
    
    .then(answer => {
        let selectedGenre=res.find((genre) =>{
        return answer.genre==`genre: ${genre.name}`})
        // console.log(selectedGenre)

        //edit the limit. If its above the game count dont use the limit
        size = selectedGenre.games.length < limit ? selectedGenre.games.length : limit
        console.log(size)
        let idstring=selectedGenre.games.slice(0,size);
        // id='66'
        igdb.getGame({
            fields: '*',
            ids: [idstring],
            limit: 1
        }).then(response =>{
            if(response)
                renderGameArray(response)
        })
 
        .catch(error=>{
            throw error
        })

      })
      .catch(err => console.log(err))
}

function renderGameArray(arr){
    arr.map((genre)=>{
            console.log(chalk`Game: {blue.cyan ${genre.name}}\n`)
            console.log(chalk.red('------------------------------------------------'))
        }
    )
}