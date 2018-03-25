const
    igdb = require('../api/igdb-api'),
    inquirer = require('inquirer'),
    chalk = require('chalk');

exports.command = ['engine']
exports.describe = 'find game engine info of searched game or engine id'

exports.builder = {
    gameName: {
        alias: 't',
        describe: 'game',
        type: 'string'
    },
    ids: {
        alias: ['i'],
        describe: 'id of a the game on the IG database',
        type: 'number'
    }
}

exports.handler = (argv) => {
    // if there were no ids or game titles passed in then exit
    if(!argv.ids && !argv.gameName){
        console.log("Please specify a engine id (command: -i) or game title (command:-t)")
        return 0
    }

    // if both id and game title are passed in then exit
    if(argv.ids!=null&& (argv.gameName!=null)){
        console.log("Only a game title OR an engine id is allowed")
        return 0
    }

    // if there is no game title passed in
    if(argv.gameName==null){
        // there was an id or ids passed in
        let currentIds=[]

        // if argv.ids is not array, meaning only one Id is passed in
        if(!Array.isArray(argv.ids)){
            // let argv.ids be the first element in currentIds array
            currentIds[0] = (argv.ids)
        }
        else{
            // let currentIds equal to the array argv.ids
            currentIds=argv.ids
        }
        // use our custom module and pass in the currentIds so
        // we get the game engine(s) info and print it
        getEngineInfo(currentIds)
    }
    else {
        // a game name was passed in and set equal to argv.gameName
        // use our custom module to pass the game that will be searched for
        igdb.getGame({
            fields: '*',
            search: argv.gameName,
            limit: 50
        }).then(response =>{
            if(response){
                // From the response, filter out the games that have an engine id(s) listed
                let gamesWithEngine=response.filter(game=> game.game_engines!=null)
                // if there are no games with an engine
                if(gamesWithEngine.length==0){
                    console.log('No games with game engine information')
                } else{
                    //print the games that have an engine id array that is not empty
                    renderGameArray(gamesWithEngine)
                    //let user choose a game and print information about that game's engine
                    gamePicker(gamesWithEngine)
                }
            }
        })
        .catch(error=>{
            throw error
        })
    }
}

// Uses inquirer to give user a list of games to choose from
const gamePicker = (res) => {
    let display =[]
    res.forEach(game => {
        display.push(chalk`game: ${game.name}`)
    })

    return inquirer.prompt([{
        type: 'list',
        message: 'Select game to get Engine',
        name: 'game',

        choices: display

    }])
    .then(answer => {
        // finds and sets the game object that matches the chosne game
        let chosenGame=res.find((game) =>{return answer.game==`game: ${game.name}`})
        console.log(chalk`\nEngine id(s) of selected game: {redBright.bold ${chosenGame.game_engines}}\n`)
        console.log('------------------------------------------------')
        //get info the the chosen game's engine(s)
        getEngineInfo(chosenGame.game_engines)
      })
      .catch(err => console.log(err))
}


// use our custom module and pass in the currentIds so
// we get the game engine(s) info
const getEngineInfo = engineId =>{

    igdb.getEngine({
        fields: '*',
        ids: engineId
    }).then(engines =>{
        if(engines){
            renderEngineArray(engines)
        }
    })
    .catch(error=>{
        throw error
    })
}

// prints engine info using chalk module to color
function renderEngineArray(arr){
    arr.map((engine)=>{
            console.log(chalk`{redBright.bold id: ${engine.id}} \nEngine: {magenta.bold ${engine.name}} \nurl: {yellow ${engine.url}} \ncreated: {green ${new Date(engine.created_at)}}\nupdated: {green ${new Date(engine.updated_at)}}\n`)
            console.log('------------------------------------------------')
        }
    )
}

// prints game info using chalk module to color
function renderGameArray(arr){
    arr.map((game)=>{
            console.log(chalk`Title: {blue.bold ${game.name}}\n`)
            console.log('------------------------------------------------')
        }
    )
}
