// USING EXPRESS LIBRARY
const express = require("express");
const app = express();

// USING CORS LIBRARY TO ALLOW API CALLS FROM THE FRONTEND TO THE BACKEND
const cors = require("cors");
app.use(cors());

// OUR PORT TO USE
const PORT = 8080;

// USING FS TO READ FROM FILE
const fs = require("fs");

// USING PATH TO THE FILE
const path = require("path");

const util = require("util");

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

// 11111111
// מעתיק נתיבים מקובץ טקסט במחשב כדי לקחת את הלינקים לקבצים משם
app.get("/api/filePaths", (req, res) => {
  const filePath = "C:\\Users\\dev01User\\Desktop\\DocPath\\paths.txt";
  const requestedPath = decodeURIComponent(req.query.path);;

  console.log("Requested path:", requestedPath);

  try {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");

    let directoryPaths = [];

    lines.forEach((line) => {
      const match = line.match(/path\d+\s*=\s*(.+)/i);
      if (match && match[1]) {
        const dirPath = match[1].trim();
        if (!requestedPath || dirPath.startsWith(requestedPath)) {
          directoryPaths.push(dirPath);
        }
      }
    });

    console.log("Directory paths:", directoryPaths);

    if (directoryPaths.length === 0) {
      res.status(404).json({ error: "No matching paths found" });
      return;
    }

    let filePaths = [];
    let directoriesProcessed = 0;

    directoryPaths.forEach((directoryPath) => {
      fs.readdir(directoryPath, (err, files) => {
        directoriesProcessed++;

        if (err) {
          console.error(`Error reading directory ${directoryPath}:`, err);
          if (directoriesProcessed === directoryPaths.length) {
            res.status(404).json({ error: "Error reading directories" });
          }
          return;
        }

        files.forEach((file) => {
          const fileFullPath = path.join(directoryPath, file);
          filePaths.push(fileFullPath);
        });

        if (directoriesProcessed === directoryPaths.length) {
          res.json(filePaths);
        }
      });
    });
  } catch (err) {
    console.error("Error reading paths file:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 22222222
// מעתיק נתיבים מקובץ טקסט כדי להביא מידע מתיקייה מסויימת
app.get("/api/paths", async (req, res) => {
  const filePath = "C:\\Users\\dev01User\\Desktop\\DocPath\\docPaths.txt";
  try {
    const data = await readFile(filePath, "utf8");
    const pathsArray = data.split("\n").map((line) => line.split(": ")[1]);
    res.json(pathsArray);
  } catch (err) {
    console.error("Error reading paths file:", err);
    res
      .status(500)
      .json({ error: "Error reading paths file", message: err.message });
  }
});


// XML לקרוא קבצי
app.get("/api/file", async (req, res) => {
  let filePath = decodeURIComponent(req.query.path);;
  if (!filePath) {
    return res.status(400).json({ error: "No file path provided" });
  }
  // Remove surrounding quotes if present
  filePath = filePath.trim().replace(/^"(.*)"$/, "$1");
  const sanitizedPath = path.normalize(filePath);

  try {
    // READ LIBRARY
    const stats = await fs.promises.stat(sanitizedPath);

    // IF IS LIBRARY
    if (stats.isDirectory()) {
      // READ THE FOLDER
      const files = await readdir(sanitizedPath);

      // TAKE ONLY XML FILES
      const xmlFiles = files.filter((file) => path.extname(file) === ".xml");
      const allFilesContent = [];
      const creationTimes = [];

      for (let file of xmlFiles) {
        const filePath = path.join(sanitizedPath, file);
        const content = await readFile(filePath, "utf8");
        const fileStats = await fs.promises.stat(filePath);
        const creationTime = fileStats.birthtime;

        allFilesContent.push(content);
        creationTimes.push(creationTime);
      }

      res.json({ contents: allFilesContent, creationTimes: creationTimes });
    } else {
      const data = await readFile(sanitizedPath, "utf8");
      const fileStats = await fs.promises.stat(sanitizedPath);
      const creationTime = fileStats.birthtime;

      res.json({ contents: [data], creationTimes: [creationTime] });
    }
  } catch (err) {
    console.error("Error processing file or directory:", err);
    res.status(500).json({ error: "Error processing file or directory" });
  }
});

// 333333333
// בודק אם שדרים תקועים
  const directoryPath = "C:\\Users\\dev01User\\Desktop\\stuckXML";
  const thirtyMinutes = 2 * 60 * 1000;
  const scanInterval = 2 * 60 * 1000; 

let stuckFiles = [];

// סורק תיקייה לבדוק אם יש שדר תקוע
function scanDirectory() {
  try {
    const files = fs.readdirSync(directoryPath);
    stuckFiles = files.filter(file => {
        const filePath = path.join(directoryPath, file);
        const stat = fs.statSync(filePath);
        const timeDiff = Date.now() - stat.birthtime.getTime(); // Time difference in milliseconds
        console.log(timeDiff);
        console.log(thirtyMinutes);
        
        return timeDiff >= thirtyMinutes;
    }).map(file => ({
      filePath: path.join(directoryPath, file),
      folderPath: directoryPath
    }));
    
    console.log(`Directory scanned at ${new Date().toLocaleString()}. Stuck files:`, stuckFiles);
  } catch (err) {
    console.error('Error scanning directory:', err);
  }
}

// מתחיל סריקה
scanDirectory();

// סורק כל 10 דקות
setInterval(scanDirectory, scanInterval);

app.get('/api/checkStuckFiles', (req, res) => {
  res.json({ stuckFiles });
});


//בדיקת שרתי נמה אם פעילים
app.get('/api/nama1', (req, res) => {
  res.status(200).json({ message: 'Endpoint nama1 works!' });
});
app.get('/api/nama2', (req, res) => {
  res.status(200).json({ message: 'Endpoint nama2 works!' });
});

// IF THE SERVER IS UP AND RUNNING I GET THIS
app.listen(PORT, () => {
  console.log(`Server uo with port ${PORT}`);
});
