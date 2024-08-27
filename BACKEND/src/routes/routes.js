const express = require('express');
const router = express.Router();
const { addNote, getNotes, getNote, deleteNote, updateNote } = require("../controllers/note")
const { addFolder, getFolders, deleteFolder, updateFolder } = require("../controllers/folder")

router.post('/add-note', addNote)
    .get('/get-notes', getNotes)
    .delete('/delete-note/:id', deleteNote)
    .put('/update-note/:id', updateNote)

    .get('/get-note/:id', getNote)
    .post('/add-folder', addFolder)
    .get('/get-folders', getFolders)
    .delete('/delete-folder/:id', deleteFolder)
    .put('/update-folder/:id', updateFolder)

     // test
    .get('/', () => {
        res.send("Hello world!")
    })

module.exports = router;