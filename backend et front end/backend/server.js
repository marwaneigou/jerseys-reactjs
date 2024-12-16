const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const dataPath = path.join(__dirname, "jerseys.json");

const readData = () => {
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify([]));
  }
  const fileData = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(fileData);
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
};

app.post("/api/jerseys", upload.single("image"), (req, res) => {
  const jerseys = readData();
  const newJersey = {
    id: Date.now(),
    name: req.body.name,
    description: req.body.description,
    color: req.body.color,
    image: `/uploads/${req.file.filename}`,
  };
  jerseys.push(newJersey);
  writeData(jerseys);
  res.status(201).json(newJersey);
});

app.get("/api/jerseys", (req, res) => {
  const jerseys = readData();
  res.json(jerseys);
});

app.get("/api/jerseys/:id", (req, res) => {
  const jerseys = readData();
  const jersey = jerseys.find((j) => j.id === parseInt(req.params.id));
  if (!jersey) return res.status(404).json({ error: "Jersey not found" });
  res.json(jersey);
});

app.put("/api/jerseys/:id", upload.single("image"), (req, res) => {
  const jerseys = readData();
  const jerseyIndex = jerseys.findIndex((j) => j.id === parseInt(req.params.id));
  if (jerseyIndex === -1) return res.status(404).json({ error: "Jersey not found" });

  const jersey = jerseys[jerseyIndex];
  jersey.name = req.body.name || jersey.name;
  jersey.description = req.body.description || jersey.description;
  jersey.color = req.body.color || jersey.color;

  if (req.file) {
    fs.unlinkSync(path.join(__dirname, jersey.image));
    jersey.image = `/uploads/${req.file.filename}`;
  }

  jerseys[jerseyIndex] = jersey;
  writeData(jerseys);
  res.json(jersey);
});

app.delete("/api/jerseys/:id", (req, res) => {
  const jerseys = readData();
  const jerseyIndex = jerseys.findIndex((j) => j.id === parseInt(req.params.id));
  if (jerseyIndex === -1) return res.status(404).json({ error: "Jersey not found" });

  const [deletedJersey] = jerseys.splice(jerseyIndex, 1);
  fs.unlinkSync(path.join(__dirname, deletedJersey.image));
  writeData(jerseys);
  res.json(deletedJersey);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
