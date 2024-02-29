const mongoose = require("mongoose")

const notesSchema = mongoose.Schema({
    adminid: { type: String },
    title: { type: String },
    description: { type: String },
    dueDate: { type: String },
    status: { type: String },
    createdAt: {
        type: Date,
        default: Date.now // Setting a default value to the current date and time
    }
})
const Notes = mongoose.model("NOTES", notesSchema)
module.exports = Notes;
