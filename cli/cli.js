const
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command(require('./searchGame'))
    .command(require('./searchCharacters'))
    .command(require('./gameEngine'))
    .command(require('./searchByGenre'))
    .command(require('./searchPlatforms'))
    .command(require('./popularGames.js'))
    .demandCommand()
    .help('help')
.argv
