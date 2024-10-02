const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema ({
    type: {
        type: String,
        default: 'note'
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 40,
        validate: (v) => v.trim().length > 0, // Ensure title is not just white space
        message: 'Title cannot be empty',
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
        validate: {
            validator: (val) => val.length <= 5,
            message: `{VALUE} exceeds the limit of 5.`,
        }
        
    },
    deadline: {
        type: Date,
        required: false
    },
    folder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
        required: false
    },
    backgroundColor: {
        type: String,
        default: '#ffffff'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Note', NoteSchema);