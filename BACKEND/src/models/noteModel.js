const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema ({
    type: {
        type: String,
        required: true,
        default: "note"
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 40
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxLength: 5000
    },
    tags: {
        type: [String],
        required: false,
        default: [],
        // maxLength: 10
        
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },

    deadline: {
        type: Date,
        required: false
    },

    folder: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Note', NoteSchema);