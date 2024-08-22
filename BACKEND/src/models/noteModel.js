const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema ({
    type: {
        type: String,
        default: note
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
        default: [],
        // maxLength: 10
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },

    deadline: {
        type: Date,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Note', NoteSchema);