const NoteSchema = require('../models/noteModel')

exports.addNote = async(req, res) => {
    const { title, content, tags = [], deadline, folder, backgroundColor } = req.body; // handle case when tags is an empty array

    // Validate input
    if (!title || !content) {
        return res.status(400).json({message: 'Title and content fields must be filled.'})
    }

    const newNote = NoteSchema({
        title,
        content,
        tags,
        deadline,
        folder, 
        backgroundColor
    })

    try {
        await newNote.save();
        res.status(200).json({message: 'Note added successfully.'})
    } catch (error) {
        console.error("Error adding note: ", error);
        res.status(500).json({message: "Server error", error: error.message})
    }
}

// Get notes from database
exports.getNotes = async(req, res) => {
    try {
        const notes = await NoteSchema.find().sort({ updatedAt: -1 });
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error fetching notes: ", error);
        res.status(500).json({message: "Server error"})
    }
}

exports.getNote = async(req, res) => {
    const { id } = req.params; 
    try {
        const note = await NoteSchema.findById(id)
        if (!note){
            return res.status(404).json({ message: "Note not found."})
        }
        res.status(200).json(note)

    } catch (error) {
        console.error("Error fetching note: ", error);
        res.status(500).json({message: "Server error"})
    }
}

exports.deleteNote = async(req, res) => {
    const { id } = req.params;
    try {
        const deletedNote = await NoteSchema.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found.'})  // return 404 if note not found in database before deleting it. 400 would be returned if the note exists but something else went wrong. 500 is for server errors. 200 is for success.
        }
        res.status(200).json({message: 'Note deleted successfully.'})
    } catch (error) {
        console.error("Error deleting note: ", error);
        res.status(500).json({message: 'Error deleting', error: error.message})
    }
}

exports.updateNote = async(req, res) => {
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
            {new: true, runValidators: true}, // ensure validation on update
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
        res.status(500).json({message: 'Error updating note', error: error.message})
    }
}