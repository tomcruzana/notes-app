const fs = require("fs");
const chalk = require("chalk");

const success_chalk = chalk.bold.inverse.green;
const contents_chalk = chalk.bold.inverse.blue;
const error_chalk = chalk.bold.inverse.red;

//list all notes
const listNotes = () => {
    const notes = loadNotes();
    notes.forEach(note => {
        console.log(contents_chalk(`Title = ${note.title} \nBody = ${note.body} \n`));
    });
}

//add a note
const addNote = (title, body) => {
    const notes = loadNotes();
    //const duplicateTitle = notes.filter(note => note.title === title);
    const duplicateTitle = notes.find(note => note.title === title); //this one is more efficient than array.filter bec it exits after the first match
  
    //if no duplicates are found
    if (!duplicateTitle){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);//save notes
        console.log(success_chalk("Note added"));
    }
    else{console.log(error_chalk("Title already exists! Please try again"));}
}

//remove a note
const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter(note => note.title !== title); //notes to keep

    if(notes.length > newNotes.length){
        console.log(success_chalk("Note removed"));
        saveNotes(newNotes);//save notes
    }
    else{console.log(error_chalk("Nothing found! Please try again"));} 
}


//remove all notes
const removeAll = () =>{
    try{
        fs.writeFileSync("notes.json", "[]");
        console.log(success_chalk("All notes have been removed"));
    }
    catch(e){
        console.log(error_chalk("An error occured" + e));
    }
}

//find and read a note
const readNote = (title) => {
    const notes = loadNotes();
    const readNote = notes.find(note => note.title === title); //find the first match (there shouldn't be any other matches, since there's validation)
    
    (readNote) ? 
        console.log(success_chalk(`Title = ${readNote.title} \nBody = ${readNote.body} \n`))
    : 
        console.log(error_chalk("Nothing found. Please try again."))
    ;
}

//note loader function
const loadNotes = () =>{
    try{
        const dataJSON = fs.readFileSync("notes.json", "utf8");
        return JSON.parse(dataJSON); //convert to json file
    }
    catch(e){
        return e;
    }
}

//update/save the notes
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
}

module.exports = {
    addNote,
    removeNote,
    readNote,
    listNotes,
    removeAll
};