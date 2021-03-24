const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) =>{

    const notes = loadNotes()

    //Once a duplicate is found it will stop searching the array.
    const duplicateNote = notes.find((note) => note.title === title)

    //debugger is a keyword used to inspect our code.
    //debugger

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log('A new note has been added.')
    }else{
        console.log('Title is already in use.')
    }

}

const removeNote = (title) =>{

    const notes = loadNotes()

    const listToKeep = notes.filter((note) => note.title !== title)

    if(notes.length > listToKeep.length){
        console.log(chalk.inverse.green("Note Removed"))
        saveNotes(listToKeep)

    }else{
        console.log(chalk.inverse.red("No note found"))
    }

}

const saveNotes = (dataObject) =>{

    const JSONData = JSON.stringify(dataObject)
    fs.writeFileSync('notes.json', JsONData)

}

const loadNotes = () =>{
    
    try{

        const dataBuffer = fs.readFileSync('notes.json')
        const dataString = dataBuffer.toString()
        const dataObject = JSON.parse(dataString)
        return dataObject

    }catch(error){

        return []

    }

} 

const listNotes = () =>{
    const notes = fs.readFileSync('notes.json')
    const dataObject = JSON.parse(notes)

    dataObject.filter((object) => {
        console.log(chalk.blue.bold(object.title))
        console.log(object.body)
        console.log('')
    })
}

const readNote = (title) =>{

    const dataObject = loadNotes()

    const titleFound = dataObject.find((object) => object.title === title)

    if(titleFound){
        dataObject.forEach((object) => {
            if(object.title === title){
            console.log(chalk.bold(object.title))
            console.log(object.body)
            }
        })
    }else{
        console.log(chalk.red.bold('Title does not exist.'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};