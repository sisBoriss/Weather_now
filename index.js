const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("src"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html")); // Убедитесь, что путь к файлу правильный
});

app.listen(8080, () => {
  console.log("Server is started");
});
