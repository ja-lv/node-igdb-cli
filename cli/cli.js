const
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command(require('./searchGame'))
    .demandCommand(1, "Please input a command")
    .help('help')
    .argv