const igdb = require('../api/igdb-api'),
    inquirer = require('inquirer')
    chalk = require('chalk')
exports.command = ['popular', 'p']

exports.describe = 'get the popular games'

exports.builder = {
    limit: {
        alias: 'l',
        describe: 'limit search, max is 50',
        type: 'string',
        default: 10
    }
}

exports.handler = (argv) => {
    if(argv.l > 50) {
        console.log("The maximum limit is top 50 games.")
        return 0
    }

    igdb.getGameWrapper({
        fields: '*',
        order: 'popularity:desc',
        limit: argv.l
    }).then(response => {
        if(response)
            renderPopularyArray(response)
    })
    .catch(error => {
        throw error
    })
}

function renderPopularyArray(arr){
    var n = 1
    arr.forEach(game => {8a
        console.log(chalk `{red ${n}}. Title: {blue ${game.name}}, Popularity: {green ${game.popularity}}, Rating: {yellow ${game.rating ? game.rating : 'No Rating Avaible'}}`)
        console.log('------------------------------------------------------------------------------------------')
        n++
    })
}

// function renderPopularyArray(arr){
//     var n = 1
//     var r = [],
//         r2 = []

//     arr.forEach(game => {
//         r.push(`${n}`+`. Title: ${game.name}`)
//         r2.push(`${n}. Title: ${game.name}, Popularity: ${game.popularity}, Ranting: ${game.rating ? game.rating : 'No Rating Avaible'}`)
//         n++
//     })
//     return inquirer.prompt([{
//         type: "list",
//         message: "Select a game to see more info",
//         name: 'pop',
//         choices: r,
//         validate: (answer) => {
//             if(answer.length >= 2)
//                 return 'you can only pick 1 game'
//             return true
//         }
//     }])
//     .then(answer => {
//         printGamesInfo(r2, answer)
//     })

// }
// const printGamesInfo = (r, c) => {
//     console.log(r)
//     console.log(c)
//     console.log(c.pop)
//     }