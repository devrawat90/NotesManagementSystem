const express = require("express");
const app = express();
const dotenv = require("dotenv");
const route = require("./routes/routes");
const mongoose = require("mongoose")
const cors = require("cors") // allow browser origns
dotenv.config()
const PORT = process.env.PORT; //import port from dotenv
const url = process.env.DBURL; //import url from dotenv
const path = require("path")
app.use(express.json()) //  to read data as json from frontend
// cors for local server
// app.use(cors())

// cors for live server
app.use(
    cors({
        origin: ["https://euphonious-cendol-e73ba8.netlify.app", "https://65c53304c4c9ae0c55ab378a--euphonious-cendol-e73ba8.netlify.app", "http://localhost:3001"], // Replace with your React frontend's URL
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);

//  connect database
mongoose.connect(url).then(() => {
    console.log("database connected");
}).catch((err) => {
    console.log(err);
})

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(route)  //user routes
app.listen(PORT, () => {
    console.log(`server is runing on port ${PORT}`);
})

