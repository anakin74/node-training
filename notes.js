console.log('Starting notes.js');
const fs = require('fs');

// code to add a note to the json file

// here we create new functions for fetching and saving notes. these are use many times and are therefore better suited to be a function that can be called.

var fetchNotes = () => {
  // The file might not exist or be empty, this is where we try that. if it fails then it fails safe. if the file does exist, no problem either

  try {
      var notesString = fs.readFileSync('notes-data.json');
      return JSON.parse(notesString);
  } catch (e) {
    console.log('someting went wrong reading the file. Returning an empty array.');
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};



var addNote = (title, body) => {
  console.log('Adding note: ', title, body);
  var notes = fetchNotes();
  var note  = {
    title,
    body
  };

// here we check for duplicate values of the note. based on its title. the variable duplicateNotes is filled with the result of the filter function.
// that will check if the title of the note between brackets which are the elements of the notes array is the same as the title value of the new note. if it is,
// the duplicate notes variable is filled.
//
// next, only if duplicateNotes is equal to 0 will we write the new value to the notes array, and save the file

  var duplicateNotes = notes.filter((note) => note.title === title);
  console.log('de lengte van de duplicate notes array is: ', duplicateNotes.length);
  console.log(duplicateNotes);

  if (duplicateNotes.length===0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }




};
//hoort bij de list optie
var getAll =() => {
  console.log('Getting all Notes');
  var notes = fetchNotes();
  console.log();
  console.log('************************');
  console.log(notes);
  console.log('************************');
  console.log();

};

var readNote = (title) => {
  console.log('Reading note: ', title);
  //title komt binnen via argument
  //alle notes ophalen met fetchNotes

  var notes = fetchNotes();


  //zoeken naar notes met dezelfde title, via filter optie.
  var theOne = notes.filter(function (el) {
    return (el.title === title);
  });
// het resultaat is een array met de note die we zochten.
  //console.log(theOne);
  return theOne[0];

  //als die note gevonden is, dan via console.log afdrukken
  //console.log(theOne);
  //return theOne;

};

var deleteNote = (title) => {
  console.log();
  console.log('************************');
  console.log('Deleting note with title: ', title);
  console.log('************************');
  console.log();

  //fetch notes
  var notes = fetchNotes();
  console.log();


  //filter notes, removing the one with title of the argument
  var keep = notes.filter(function (el) {
    return (el.title != title);
  });
  console.log();



    //save notes back to filesystem
    saveNotes(keep);

    //inform the user that a note was actually removed. we do this by comparing the  length of the original array with the length of the new one.
    return keep.length !== notes.length;
    // if (keep.length < notes.length) {
    //   console.log();
    //   console.log('************************');
    //   console.log('Your message was deleted')
    //   console.log('************************');
    //   console.log();
    // } else {
    //   console.log();
    //   console.log('************************');
    //   console.log('No message was deleted')
    //   console.log('************************');
    //   console.log();
    // }


};

var logNote = (note) => {
  //break  on this line and use inspect and repl to display the information
  debugger;
  console.log('************************');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}

module.exports = {
  addNote,
  getAll,
  readNote,
  deleteNote,
  logNote
};
