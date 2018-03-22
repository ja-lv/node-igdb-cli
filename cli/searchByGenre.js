const igdb = require('../api/igdb-api')

const  inquirer = require('inquirer')


const searchByGenre = () => {
    const genre = true    
    getGenre(genre)
    print(genre)

}

// const getGenre = (genre) => {
//     return inquirer.prompt([{
//         type: 'checkbox',
//         message: 'Choose A Genre',
//         name: 'genre',
//         choices: ['violence','sports', 'action','adventure','EXIT'], 
//         validate: (choices) => {
//             if (choices == 'sports' ) {
//                 return 'FIFA'
//             }
//             else if(choices == 'violence') 
//             { 
//                 return 'Mortal Kombat' + " , " + 'Metal Gear Solid'
//             }
//             else if(choices == 'action')
//             {
//                 return 'Fortnite'
//             }
//             else if(choices == 'adventure'){
//                 return 'Minecraft'

//             }
//             else if(choices == 'action' && choices =='adventure'){
//                 return 'Minecrafts'


//             }

//             else if(choices == 'EXIT'){
//                 return true
        
//             }
           
//         }
//     }])
// }
// Displays checklist of drawn cards, and validated user input.
const getGenre = (genre) => {
    return inquirer.prompt([{
        type: 'checkbox',
        message: 'Choose A Genre',
        name: 'igdb',
        choices: () => {
            // Generate an array of drawn cards.
            const getG = [ new inquirer.Separator() ]
            for ( let card of genre.igdb ) {
                getG.push(`${card.value} of ${card.suit}`)
            }
            playingCards.push( new inquirer.Separator() )
            return playingCards
        },
        validate: (answers) => {
            // Validation to check that atmost 4 cards are selected.
            if ( answers.length > 4 ) {
                return "You must choose upto 4 cards."
            }
            // if 0-4 cards are selected, then return true.
            return true
        }
    }])
}
const print = genre => {
    console.log ("--- Genre ---")
    if(genre.choices == 'action')
    {
        return 'Fortnite'
    }
}

module.exports = {
    searchByGenre
}