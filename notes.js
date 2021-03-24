
const notes = require('./functions.js')
const yargs = require('yargs')
const { argv } = require('yargs')

//process is a global variable used to access command line arguments.
//yargs is a much better alternative.
//console.log(process.argv)

//customize yargs verion.
yargs.version('1.1.0')

//yarg.command allows us to create a custom command.
//This command will also be added to the list of commands 
//when you type the command node file.js --help.
yargs.command({
    command:'add',
    describe:'Add a new note',
    //the builder property allows you to add options to your command.
    builder: {
        title: {
            describe: 'Note title',
            //When this property is set to true, this option must be run with the command.
            demandOption: true,
            //This is the required value type, null values are not acceptable.
            type: 'string'
        },
        body: {
            descrption: 'Add a body',
            demandOption: true,
            type: 'string'
        }
    },
    //The handler property executes a function if the command ever gets used.
    handler:(argv) => notes.addNote(argv.title, argv.body)
})

yargs.command({
    command:'remove',
    describe: 'Remmoves a note',
    builder: {
        title:{
            describe: 'Note Title',
            demandOption: true,
            type:'string'
        }
    },
    handler:(argv) => notes.removeNote(argv.title)
})

//
//Challenge: Add two new commands
//
// 1. Setup command to support 'list' command (print placeholder message for now)
// 2. Setup command to support 'read' command (print placeholder message for now)
// 3. Test your work by running both commands and ensure correct outpur.

yargs.command({
    command:'read',
    describe: 'Reads a note',
    builder:{
        title:{
            describe: 'Note Title',
            demandOption:true,
            type:'string'
        }
    },
    handler:(argv) => notes.readNote(argv.title)
})

yargs.command({
    command:'list',
    describe: 'lists the notes',
    handler:() => notes.listNotes()
})

//IMPORTANT: When using yargs you must call this at the end of your script.
console.log(yargs.argv)
