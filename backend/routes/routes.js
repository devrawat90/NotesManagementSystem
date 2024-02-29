const router = require("express").Router()
const usersController = require("../controllers/usersController")
const verifyToken = require("../middlewares/Verifytoken")
router.get("/get", (req, res) => {
    res.send("default api")
})
router.post("/registeruser", usersController.CreateUser) //register new user
router.post("/userlogin", usersController.USERLOGIN) //user Login
router.post("/createnote", usersController.createNote) //create new note
router.get("/getnote/:id", verifyToken, usersController.getNotes) // get all notes
router.post("/deletenote/:id", usersController.deleteNote) // delete note
router.post("/updatenote/:id", usersController.updateNote) // update note
router.post("/updatenotestatus/:id", usersController.Notestatusupdate) // update note status
module.exports = router;

