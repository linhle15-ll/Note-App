const FolderSchema = require('../models/folderModel')
exports.addFolder = async(req, res) => {
    const { name, files } = req.body;

    try {
        // Validate input
        if (!name || !Array.isArray(files)) {
            return res.status(400).json({message: 'A folder must have a name and files.'})
        }

        const newFolder = new Folder({
            name,
            files
        })

        await newFolder.save();
        res.status(200).json({message: 'Folder added successfully.', newFolder})
    } catch {
        console.error('Error adding folder: ', error);
        res.status(500).json({message: 'Server error'})
    }
}

// Get notes from database
exports.getFolders = async(req, res) => {
    try {
        const folders = await FolderSchema.find().sort({ updatedAt: -1 });
        res.status(200).json(folders)
    } catch (error) {
        console.error("Error fetching folders: ", error);
        res.status(500).json({message: "Server error"})
    }
}

exports.getFolderById = async(req, res) => {
    
}

exports.deleteFolder = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFolder = await Folder.findByIdAndDelete(id);
        if (!deletedFolder) {
            return res.status(404).json({ message: 'Folder not found' });
        }
        res.status(200).json({ message: 'Folder deleted successfully.' });
    } catch (error) {
        console.error("Error deleting folder: ", error);
        res.status(500).json({ message: 'Error deleting folder' });
    }
}

exports.updateFolder = async(req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        // validate input
        if (!name) {
            res.status(400).json({ message: 'Name is required to update a folder.'})
        }

        const updatedFolder = await FolderSchema.findByIdAndUpdate(
            id, 
            {name}, 
            {new: true, runValidators: true}, // runValidators: ensure the name adheres to the scheme validation
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
}