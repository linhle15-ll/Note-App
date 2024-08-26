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
        required: true,
        type: [mongoose.Schema.Types.ObjectId], //???
        default: [],
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Folder", FolderSchema)