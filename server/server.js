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

const util = require("util");

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

// SOME EXAMPLE
app.get("/api/home", (req, res)=>{
    res.json({message: "HELLO WORLD ", ppl: ['razi', 'el', 'rashad']})
})

// MY PATH TO THE LOCAL XML FILE  
app.get("/api/file", async(req, res) => {
    let filePath = req.query.path;
    if (!filePath) {
        return res.status(400).json({ error: 'No file path provided' });
    }
 // Remove surrounding quotes if present
 filePath = filePath.trim().replace(/^"(.*)"$/, '$1');
 const sanitizedPath = path.normalize(filePath);

 try {
    // READ LIBRARY
    const stats = await fs.promises.stat(sanitizedPath);

    // IF IS LIBRARY
    if (stats.isDirectory()) {

        // READ THE FOLDER
        const files = await readdir(sanitizedPath);
        
        // TAKE ONLY XML FILES
        const xmlFiles = files.filter(file => path.extname(file) === '.xml');
        const allFilesContent = [];

        for (let file of xmlFiles) {
            const content = await readFile(path.join(sanitizedPath, file), 'utf8');
            allFilesContent.push(content);
        }

        res.json({ contents: allFilesContent });
    } else {
        const data = await readFile(sanitizedPath, 'utf8');
        res.json({ contents: [data] }); // Send as an array for consistency
    }
} catch (err) {
    console.error("Error processing file or directory:", err);
    res.status(500).json({ error: 'Error processing file or directory' });
}
});

// IF THE SERVER IS UP AND RUNNING I GET THIS 
app.listen(PORT, ()=>{
    console.log(`Server uo with port ${PORT}`);
})