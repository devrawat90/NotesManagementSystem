const mongoose = require("mongoose")

const userLoginSchema = mongoose.Schema({
    name: { type: String },
    email: {
        type: String,
        required: true
    },
    password: { type: String },
    createdAt: {
        type: Date,
        default: Date.now // Setting a default value to the current date and time
    }
})
const Users = mongoose.model("USERS", userLoginSchema)
module.exports = Users;
