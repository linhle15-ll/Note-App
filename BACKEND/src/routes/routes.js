const express = require('express');
const router = express.Router();
const { addNote,getNotes, deleteNote, editNote } = require("../controllers/note")
router.post('/add-note', addNote)
    .post('/get-notes', getNotes)
    .delete('/delete-note/:id', deleteNote)
    .put('/update-note/:id', editNote)
