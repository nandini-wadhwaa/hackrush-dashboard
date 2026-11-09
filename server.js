const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const DB = path.join(__dirname, "db.json");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const read = () => (fs.existsSync(DB) ? JSON.parse(fs.readFileSync(DB, "utf8")) : []);
app.get("/api/submissions", (req, res) => res.json(read()));
app.post("/api/submissions", (req, res) => {
  const s = req.body;
  if (!s.team || !s.idea || !Array.isArray(s.members) || s.members.length < 3 || s.members.length > 5)
    return res.status(400).json({ error: "Invalid submission" });
  const all = read(); all.push(s);
  fs.writeFileSync(DB, JSON.stringify(all, null, 2));
  res.json({ ok: true });
});
app.listen(3000, () => console.log("HackRush dashboard → http://localhost:3000"));