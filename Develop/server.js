// require express 
const express = require("express");
// require path
const path = require("path");
// require fs to read and write files
const fs = require("fs");


// create app const which would be the express server
const app = express();
// initial ports
const PORT = process.env. PORT || 5000;

// create a global array for the notes
let notes = [];

// api call response for all the ntoes, and sends results to browser as an array of objects. 
app.get("/api/notes", function(err, res) {
    try {
        notesData = fs.readFileSync("Develop/db/db.json", "utf8");
        console.log("hello");
        notesData = JSON.parse(notesData);
    } catch (err) {
        console.log(err);
    }
    res.json(notesData);
});

// reads the data from json file
// writes the new note to json file
// delete a note


