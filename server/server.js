// USING EXPRESS LIBRARY
const express = require("express")
const app = express()

// USING CORS LIBRARY TO ALLOW API CALLS FROM THE FRONTEND TO THE BACKEND
const cors = require("cors")
app.use(cors())

// OUR PORT TO USE
const PORT = 8080

// USING FS TO READ FROM FILE 
const fs = require("fs");

// USING PATH TO THE FILE 
const path = require("path");

// SOME EXAMPLE
app.get("/api/home", (req, res)=>{
    res.json({message: "HELLO WORLD ", ppl: ['razi', 'el', 'rashad']})
})

// MY PATH TO THE LOCAL XML FILE  
app.get("/api/file", (req, res) => {
    const filePath = path.join('C:', 'Users', 'dev01User', 'Desktop', 'xmlFiles', 'namaExample2.xml');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).json({ error: 'Error reading file' });
        }
        res.json({ content: data });
    });
});

// IF THE SERVER IS UP AND RUNNING I GET THIS 
app.listen(PORT, ()=>{
    console.log(`Server uo with port ${PORT}`);
})