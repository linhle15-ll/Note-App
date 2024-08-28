const express = require('express');
const router = express.Router();
const NoteSchema = require('../models/noteModel')
const FolderSchema = require('../models/folderModel')
const { addNote, getNotes, getNote, deleteNote, updateNote } = require("../controllers/note")
const { addFolder, getFolders, deleteFolder, updateFolder } = require("../controllers/folder")

router.post('/add-note', async(req, res) => {
    const { title, content, tags, deadline, folder, backgroundColor } = req.body; // handle case when tags is an empty array

    const newNote = NoteSchema({
        title,
        content,
        tags: tags || [],
        deadline,
        folder, 
        backgroundColor
    })

    try {
        if (!title || !content) {
            return res.status(400).json({message: 'Title and content fields must be filled.'})
        }

        await newNote.save();
        res.status(200).json({message: 'Note added successfully.'})
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
})
    .get('/get-notes', async(req, res) => {
        try {
            const notes = await NoteSchema.find().sort({ updatedAt: -1 });
            res.status(200).json(notes)
        } catch (error) {
            res.status(500).json({message: "Server error"})
        }
    })
    .delete('/delete-note/:id', async(req, res) => {
        const { id } = req.params;
        try {
            await NoteSchema.findByIdAndDelete(id)
            res.status(200).json({message: 'Note deleted successfully.'})
        } catch (error) {
            res.status(500).json({message: 'Error deleting'})
        }
    })
    
    .put('/update-note/:id', async(req, res) => {
        const { id } = req.params;
        const { title, content, tags, deadline, folder, backgroundColor} = req.body;
    
        try {
            const updatedNote = await NoteSchema.findByIdAndUpdate(
                id, 
                {
                    title,
                    content,
                    tags,
                    deadline,
                    folder,
                    backgroundColor
                }, 
                {new: true}
            );
    
            if (!updatedNote) {
                res.status(404).json({message: 'Note not found'})
            }
            res.status(200).json({
                message: "Note updated successfully",
                updatedNote
            });
    
        } catch (error) {
            console.error("Error updating note ", error)
            res.status(500).json({message: 'Error updating note'})
        }
    })

    .get('/get-note/:id', async(req, res) => {
        const { id } = req.params; 
        try {
            const note = await NoteSchema.findById(id)
    
            res.status(200).json(note)
    
        } catch (error) {
            res.status(500).json({message: "Server error"})
        }
    })

    .post('/add-folder', async(req, res) => {
        const { name, files } = req.body;
    
        const newFolder = FolderSchema({
            name,
            files
        })
    
        try {
            if (!name || !files) {
                return res.status(400).json({message: 'A folder must have a name and files.'})
            }
    
            await newFolder.save();
            res.status(200).json({message: 'Folder added successfully.'})
        } catch (error) {
            res.status(500).json({message: "Server error"})
        }
    })
    
    .get('/get-folders', async(req, res) => {
        try {
            const folders = await FolderSchema.find().sort({ updatedAt: -1 });
            res.status(200).json(folders)
        } catch (error) {
            res.status(500).json({message: "Server error"})
        }
    })
    .delete('/delete-folder/:id', async(req, res) => {
        const { id } = req.params;
        try {
            await FolderSchema.findByIdAndDelete(id)
            res.status(200).json({message: 'Folder deleted successfully.'})
        } catch (error) {
            res.status(500).json({message: 'Error deleting'})
        }
    })

    .put('/update-folder/:id', async(req, res) => {
    const { id } = req.params;
    const { name, files } = req.body;

    try {
        const updatedFolder = await FolderSchema.findByIdAndUpdate(
            id, 
            {
                name, 
                // files
            }, 
            {new: true}
        );

        if (!updatedFolder) {
            res.status(404).json({message: 'Folder not found'})
        }
        res.status(200).json({
            message: "Folder updated successfully",
            updatedFolder
        });

    } catch (error) {
        console.error("Error updating folder ", error)
        res.status(500).json({message: 'Error updating folder'})
    }
})

     // test
    .get('/', () => {
        res.send("Hello world!")
    })

module.exports = router;