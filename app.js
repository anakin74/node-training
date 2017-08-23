console.log('Starting app.');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
var command = argv._[0];

console.log(argv);

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);

  //wat komt er terug?
  console.log('test voor return result: ', note);
  // als het fout ging is de note gelijk aan undefined, en dus moet er een bericht komen die meldt dat er iets mis is
  if (note === 'undefined'){
    console.log('something went wrong, most likely a note with this title already exists.');
  } else {

    console.log('A new note with title: ' + note.title + ' was just created');
  }


} else if(command === 'list') {
  notes.getAll();
} else if(command === 'read') {
  var bericht = notes.readNote(argv.title); //dit zorgt dat de return value van de functie in note.js in de  var bericht wordt gestopt

  if (bericht) { //de return value is een array, en als daar iets in zit dan zorgt de code hieronder voor het tonen daarvan
    console.log('note was found');
    notes.logNote(bericht);  
  }
  else{ //zit er niet in de array, die is dan 'undefined' dan wordt de else clause gebruikt en de foutmelding getoond
    console.log("note not found");
  }



} else if(command === 'remove') {
  var noteRemoved = notes.deleteNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}
