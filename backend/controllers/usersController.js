const Users = require("../modal/Users")
const Notes = require("../modal/notesSchema");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
const secretkey = process.env.SECRETKEY
const usersController = {
    CreateUser: async (req, res) => {
        console.log(req.body);
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) return res.json({ message: "all fields are required" });
            const emailExists = await Users.findOne({ email: email })
            console.log(emailExists);
            if (emailExists) {
                return res.json({ message: 'Email already exists' });
            } else {
                const encryptedPassword = await bcrypt.hash(password, 10)
                console.log(encryptedPassword);
                const user = await Users.create({
                    name: name,
                    email: email,
                    password: encryptedPassword,

                })
                const data = await user.save();
                res.status(200).json({ message: "Registration Successfull", data: data })
            }
        } catch (error) {
            res.json({ message: "Internal Server Error" })
        }
    },
    USERLOGIN: async (req, res) => {
        const { email, password } = req.body;

        const userExists = await Users.findOne({ email: email })
        if (userExists) {
            const isMAtched = await bcrypt.compare(password, userExists.password)
            console.log(isMAtched);
            if (isMAtched === true) {

                jwt.sign({ userExists }, secretkey, { expiresIn: "1d" }, ((err, token) => {
                    if (err) {
                        res.json({ message: "token generation failed", error: err })
                    } else {
                        res.json({ message: "Login Successfull", login: true, token: token })
                    }

                }))

            } else {
                res.json({ message: "Invalid Cradentials", login: false })
            }

        }
        else {
            res.json({ message: "Invalid Cradentials" })
        }
    }
    ,
    createNote: async (req, res) => {
        console.log(req.body);
        try {
            const { title, description } = req.body;
            if (!title || !description) return res.status(201).json({ message: "all fields are required" })
            const note = await Notes.create({
                title: title,
                description: description,
            })
            const data = await note.save();
            res.status(200).json({ message: "Note added Successfully", data: data })
        } catch (error) {
            res.json({ message: "Internal Server Error" })
        }
    },
    getNotes: async (req, res) => {
        try {
            const data = await Notes.find()
            if (data.length > 0) {
                res.status(200).json({ data: data, message: "Notes found" })
            } else {
                res.status(404).json({ message: 'No User Found' })
            }
        } catch (error) {
            res.json({ message: "Internal Server Error" })
        }
    },
    deleteNote: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await Notes.findByIdAndDelete(id)
            if (!user) {
                return res.status(201).json({ message: "User not found" });
            }
            res.status(200).json({ message: "Note Deleted successfully!" });
        } catch (error) {
            res.json({ message: "Internal Server Error" })
        }
    },
    updateNote: async (req, res) => {
        console.log(req.body);
        try {
            const user = await Notes.findOne({ _id: req.params.id })
            console.log(user);
            const updatedData = await Notes.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                },
            })
            if (updatedData) {
                res.json({ message: "Note updated successfully" })
            } else {
                res.json({ message: "some error occured" })
            }

        } catch (error) {
            return res.json({ message: "Internal Server Error" })
        }
    }
}
module.exports = usersController;