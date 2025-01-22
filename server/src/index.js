const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "Setup works perfectly!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
