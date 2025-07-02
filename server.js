const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// MongoDB Model
const Registration = require("./models/Registration"); // adjust path if needed

// Registration Route
app.post("/api/register", async (req, res) => {
  const { leaderName, phone, ffid, members } = req.body;

  try {
    const existingUser = await Registration.findOne({ phone });

    if (existingUser) {
      return res.status(409).json({ message: "User already registered" });
    }

    const newEntry = new Registration({ leaderName, phone, ffid, members });
    await newEntry.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
