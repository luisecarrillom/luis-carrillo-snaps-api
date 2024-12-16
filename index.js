const express = require("express");
const cors = require("cors");
const photosRoutes = require("./routes/photos");
const tagsRoutes = require("./routes/tags");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/photos", express.static(path.join(__dirname, "public/images")));


app.use("/api/photos", photosRoutes);
app.use("/api/tags", tagsRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
