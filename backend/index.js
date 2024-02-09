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
app.use(cors({
    origin: [
        "https://65c5914e96caa7486f2287a2--sweet-cupcake-a0d729.netlify.app",
        "https://euphonious-cendol-e73ba8.netlify.app",
        "http://localhost:3001",
        "http://localhost:3000",
        // Add other allowed origins as needed
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: ["Content-Type"] // Specify the headers you want to expose
}));

//  connect database
mongoose.connect(url).then(() => {
    console.log("database connected");
}).catch((err) => {
    console.log(err);
})
app.use(route)  //user routes
app.listen(PORT, () => {
    console.log(`server is runing on port ${PORT}`);
})

