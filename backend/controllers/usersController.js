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
                        res.json({ message: "Login Successfull", login: true, token: token, adminid: userExists._id })
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
            const { title, description, adminid, dueDate } = req.body;
            if (!title || !description || !adminid || !dueDate) return res.status(201).json({ message: "all fields are required" })
            const note = await Notes.create({
                title: title,
                adminid: adminid,
                description: description,
                dueDate: dueDate,
                status: "Pending"
            })
            const data = await note.save();
            res.json({ message: "Note added Successfully", data: data })
        } catch (error) {
            res.json({ message: "Internal Server Error" })
        }
    },
    getNotes: async (req, res) => {
        const id = req.params.id
        console.log(id);
        try {
            const data = await Notes.find({ adminid: id })
            // console.log(data);
            if (data.length > 0) {
                res.json({ data: data, message: "Notes found" })
            } else {
                res.json({ message: 'no record found' })
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
                    dueDate: req.body.dueDate
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
    },
    Notestatusupdate: async (req, res) => {
        try {
            const User = await Notes.findOne({ _id: req.params.id });
            console.log(User);
            const updatedData = await Notes.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        status: req.body.selectedValue
                    }
                }
            );

            if (updatedData) {
                res.json({ message: "Note updated successfully", data: updatedData });
            } else {
                res.json({ message: "Error: Note not found" });
            }
        } catch (error) {
            return res.json({ message: "Internal Server Error" });
        }
    }
}
module.exports = usersController;