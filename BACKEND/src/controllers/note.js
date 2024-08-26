const NoteSchema = require('../models/noteModel')

exports.addNote = async(req, res) => {
    const { title, content, tags, deadline, folder } = req.body; // handle case when tags is an empty array

    const newNote = NoteSchema({
        title,
        content,
        tags: tags || [],
        deadline,
        folder
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
}

// Get notes from database
exports.getNotes = async(req, res) => {
    try {
        const notes = await NoteSchema.find().sort({ updatedAt: -1 });
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

exports.deleteNote = async(req, res) => {
    const { id } = req.params;
    try {
        await NoteSchema.findByIdAndDelete(id)
        res.status(200).json({message: 'Note deleted successfully.'})
    } catch (error) {
        res.status(500).json({message: 'Error deleting'})
    }
}

exports.updateNote = async(req, res) => {
    const { id } = req.params;
    const { title, content, tags, deadline, folder } = req.body;

    try {
        const updatedNote = await NoteSchema.findByIdAndUpdate(
            id, 
            {
                title,
                content,
                tags,
                deadline,
                folder
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
}