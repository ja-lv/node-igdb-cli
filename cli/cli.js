const
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command(require('./searchGame'))
    .demandCommand(1, "Please input a command")
    .command(require('./searchCharacters'))
    .demandCommand(1, "Please input a command")
    .command(require('./searchByGenre'))
    .command(require('./searchGameEngine'))
    // .command({
    //     command:'searchByGenre',
    //     desc:'play a game ',
    //     handler:(argv) => { igdb-api.searchByGenre()}
    // })
    .demandCommand()
    .help('help')
.argv
