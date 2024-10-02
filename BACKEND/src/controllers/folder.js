const FolderSchema = require('../models/folderModel')
exports.addFolder = async(req, res) => {
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
}

// Get notes from database
exports.getFolders = async(req, res) => {
    try {
        const folders = await FolderSchema.find().sort({ updatedAt: -1 });
        res.status(200).json(folders)
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

exports.deleteFolder = async(req, res) => {
    const { id } = req.params;
    try {
        await FolderSchema.findByIdAndDelete(id)
        res.status(200).json({message: 'Folder deleted successfully.'})
    } catch (error) {
        res.status(500).json({message: 'Error deleting'})
    }
}

exports.updateFolder = async(req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedFolder = await FolderSchema.findByIdAndUpdate(
            id, 
            {
                name, 
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
}