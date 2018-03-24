const igdb = require('../api/igdb-api'),
    inquirer = require('inquirer')
    chalk = require('chalk')
exports.command = ['popular', 'p']

exports.describe = 'get the popular games'

exports.builder = {
    // title: {
    //     alias: 't',
    //     describe: 'title of a game',
    //     type: 'string'
    // }
}

exports.handler = (argv) => {
    igdb.getGame({
        fields: '*',
        order: 'popularity:desc',


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
    arr.forEach(game => {
        console.log(chalk `{red ${n}}. Title: {blue ${game.name}}, Popularity: {green ${game.popularity}}, Rating: {yellow ${game.rating ? game.rating : 'No Rating Avaible'}}`)
        console.log('------------------------------------------------------------------------------------------')
        n++
    })
}

//was trying to make it nicer but didnt work 

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