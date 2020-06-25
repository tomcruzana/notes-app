const yargs = require("yargs");
const notes = require("./notes");

yargs.command({
	command: "add",
	describe: "Add a new note",
	builder:{
		title: {
			describe: "Note title",
			demandOption: true,
			type: "string"
		},
		body: {
			describe: "Note body",
			demandOption: true,
			type: "string"
		}
	},
	handler(argv){
		notes.addNote(argv.title.toLowerCase(), argv.body.toLowerCase());
	}
});

yargs.command({
	command: "remove",
	describe: "Remove a new note",
	builder:{
		title: {
			describe: "Note title",
			demandOption: true,
			type: "string"
		}
	},
	handler(argv){
		notes.removeNote(argv.title.toLowerCase());
	}
});

yargs.command({
	command: "read",
	describe: "Read a new note",
	builder:{
		title: {
			describe: "Read/find a note",
			demandOption: true,
			type: "string"
		}
	},
	handler(argv){
		notes.readNote(argv.title.toLowerCase());
	}
});

yargs.command({
	command: "list",
	describe: "List a new note",
	handler(){
		notes.listNotes();
	}
});

yargs.command({
	command: "removeall",
	describe: "Remove all notes",
	handler(){
		notes.removeAll();
	}
});

yargs.parse(); //processes the args
