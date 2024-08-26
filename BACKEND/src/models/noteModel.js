const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema ({
    type: {
        type: String,
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
        validate: [arrayLimit, `{PATH} exceeds the limit of 5.`]
        
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

function arrayLimit(val) {
    return val.length <= 5;
}

module.exports = mongoose.model('Note', NoteSchema);