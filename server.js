// require express 
const express = require("express");
// require path
const path = require("path");
// require fs to read and write files
const fs = require("fs");


// create app const which would be the express server
const app = express();
// initial ports
const PORT = process.env.PORT || 9001;

// create a global array for the notes
let notesData = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Develop/public")));

// api call response for all the ntoes, and sends results to browser as an array of objects. 
// reads the data from json file

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


// writes the new note to json file

app.post("/api/notes", function(req, res) {
    try{
        notesData = fs.readFileSync("./Develop/db/db.json", "utf8");
        console.log(notesData);

        notesData = JSON.parse(motesData);
        req.body.id = notesData.length;

        notesData.push(req.body);
        notesData = JSON.stringify(notesData);

        fs.writeFile("./Develop/db/db.json", notesData, "utf8", function(err) {
            // error handling
            if (err) throw err;
          });
          res.json(JSON.parse(notesData));
    } catch (err) {
        throw err;
        console.log(err);
    }
});

// delete a note

app.delete("/api/notes/:id", function(req,res) {
    try {
        notesData = fs.readFileSync("./Develop/db/db.json", "utf8");

        notesData = JSON.parse(notesData);
        noteData = notesData.filter(function (note) {
            return note.id != req.params.id;
        });
        notesdata = JSON.stringify(notesData);
        fs.writeFile(".Develop/db/db.json", notesData, "utf8", function(err) {
            if (err) throw err;
        });

        res.send(JSON.parse(notesData));
    } catch (err) {
        throw err;
        console.log(err);
    }
});

// HTML GET request

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"))
});

app.get("api/notes", function(req, res) {
    return res.sendFile(path.json(__dirname, "Develop/db/db.json"));
});

app.listen(PORT, function() {
    console.log("Server is listening on " = PORT);
});