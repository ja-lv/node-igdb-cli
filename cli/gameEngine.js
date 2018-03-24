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
    if(!argv.ids && !argv.gameName){
        console.log("Please specify a engine id (command: -i) or game title (command:-t)")
        return 0
    }

    if((Array.isArray(argv.ids)||argv.ids!=null)&& (argv.gameName!=null)){
        console.log("Only a game title OR an engine id is allowed")
        return 0
    }

    if(argv.gameName==null){
        let currentIds=[]
        if(!Array.isArray(argv.ids)){
            currentIds[0] = (argv.ids)
        }
        else{
            currentIds=argv.ids
        }
        igdb.getEngine({
            fields: '*',
            ids: currentIds
        }).then(response =>{
            if(response){
                renderEngineArray(response)
            }
        })
        .catch(error=>{
            throw error
        })
    }
    else {
        igdb.getGame({
            fields: '*',
            search: argv.gameName,
            limit: 50
        }).then(response =>{
            if(response){

                let gamesWithEngine=response.filter(game=> game.game_engines!=null)
                renderGameArray(gamesWithEngine)
                gamePicker(gamesWithEngine)
            }
        })
        .catch(error=>{
            throw error
        })
    }
}


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
        let chosenGame=res.find((game) =>{return answer.game==`game: ${game.name}`})
        console.log(chalk`\nEngine id(s) of selected game: {redBright.bold ${chosenGame.game_engines}}\n`)
        console.log('------------------------------------------------')
        getEngineInfo(chosenGame.game_engines)
      })
      .catch(err => console.log(err))
}



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

function renderEngineArray(arr){
    arr.map((engine)=>{
            console.log(chalk`\n{redBright.bold id: ${engine.id}} \nEngine: {magenta.bold ${engine.name}} \nurl: {yellow ${engine.url}} \ncreated: {green ${new Date(engine.created_at)}}\n`)
            console.log('------------------------------------------------')
        }
    )
}

function renderGameArray(arr){
    arr.map((game)=>{
            console.log(chalk`Title: {blue.bold ${game.name}}\n`)
            console.log('------------------------------------------------')
        }
    )
}
