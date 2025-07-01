const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ffmax", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Error: ", err));

const RegSchema = new mongoose.Schema({
  leaderName: String,
  phone: String,
  ffid: String,
  members: String,
});
const Registration = mongoose.model("Registration", RegSchema);

app.post("/api/register", async (req, res) => {
  const { leaderName, phone, ffid, members } = req.body;
  try {
    const newReg = new Registration({ leaderName, phone, ffid, members });
    await newReg.save();
    res.status(200).json({ message: "Registration saved" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
