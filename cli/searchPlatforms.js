const igdb = require('../api/igdb-api')
const chalk = require('chalk');
const inquirer = require('inquirer');

exports.command = ['platform', 'p']

exports.describe = 'search a platform by name'

exports.demandCommand = true

exports.builder = {
    title: {
        alias: ['n'],
        describe: 'name of platform',
        type: 'string'
    },
    id: {
        alias: ['i'],
        describe: 'id of the platform on the IG database',
        type: 'number'
    },
    limit: {
        alias: 'l',
        describe: 'limits the result of the search',
        type: 'number'
    }
}

const platformPicker = (res) => {
   let display =[]
   res.forEach(platform => {
       display.push(chalk`platform: ${platform.name}`)
   })

   return inquirer.prompt([{
       type: 'list',
       message: 'Select platform to get information',
       name: 'platform',

       choices: display

   }])
   .then(answer => {
       let chosenPlatform=res.find((platform) =>{return answer.platform==`platform: ${platform.name}`})
	   console.log(`\nTitle: ${chalk.yellow.bold(chosenPlatform.name)}\nGeneration: ${chalk.yellow.bold(chosenPlatform.generation)  ? chalk.yellow.bold(chosenPlatform.generation) : 'No generation available'}\nID: ${chalk.yellow.bold(chosenPlatform.id)}\nURL: ${chalk.yellow.bold(chosenPlatform.url)}`)
       console.log('------------------------------------------------')
      
     })
     .catch(err => console.log(err))
}

exports.handler = (argv) => {
    if(!argv.id && !argv.title){
        renderMessage("Please specify a platform id or platform")
        return 0
    }

    if(argv.id && argv.title){
        renderMessage("Only a title or an id is allowed")
        return 0
    }

    igdb.getPlatform({
        fields: '*',
        search: argv.title,
        ids: [argv.id],
        limit: argv.limit
    }).then(response =>{
        if(response)
			if(renderPlatformArray(response) != 0){
            platformPicker(response)
			}
    })
    .catch(error=>{
        throw error
    })
}

function renderPlatformArray(arr){
	var n = 0;
    arr.map((system)=>{
		//console.log(`\nTitle: ${chalk.yellow.bold(system.name)}\nGeneration: ${chalk.yellow.bold(system.generation)  ? chalk.yellow.bold(system.generation) : 'No generation available'}\nID: ${chalk.yellow.bold(system.id)}\nURL: ${chalk.yellow.bold(system.url)}`)
        //    console.log('------------------------------------------------')
			n++;
        }
		
    )
	if(n == 0)
		{
			console.log('No results to return');
		}
		return n;
}

function renderMessage(str){
    console.log(str)
}
