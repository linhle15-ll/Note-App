const express = require('express');
const router = express.Router();
const { addNote,getNotes, deleteNote, updateNote } = require("../controllers/note")

router.post('/add-note', addNote)
    .get('/get-notes', getNotes)
    .delete('/delete-note/:id', deleteNote)
    .put('/update-note/:id', updateNote)

    // test
    .get('/', () => {
        res.send("Hello world!")
    })

module.exports = router;