const mongoose = require("mongoose")

const FolderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 40
    },
    files: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Note', // Reference to Note model
        default: [],
    },
})

module.exports = mongoose.model("Folder", FolderSchema)