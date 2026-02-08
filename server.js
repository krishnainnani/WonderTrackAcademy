const path = require("path");
const fs = require("fs/promises");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const dataDir = path.join(__dirname, "data");
const submissionsFile = path.join(dataDir, "join-us.jsonl");

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/join", async (req, res) => {
  const payload = {
    childName: req.body.childName?.trim(),
    childAge: req.body.childAge?.trim(),
    grade: req.body.grade?.trim(),
    schoolName: req.body.schoolName?.trim(),
    programInterest: Array.isArray(req.body.programInterest)
      ? req.body.programInterest
      : req.body.programInterest
        ? [req.body.programInterest]
        : [],
    parentName: req.body.parentName?.trim(),
    parentEmail: req.body.parentEmail?.trim(),
    parentPhone: req.body.parentPhone?.trim(),
    city: req.body.city?.trim(),
    notes: req.body.notes?.trim(),
    createdAt: new Date().toISOString(),
    source: "join-us-form"
  };

  if (!payload.childName || !payload.parentName || !payload.parentPhone) {
    return res.status(400).json({
      ok: false,
      message: "Please provide child name, parent name, and parent phone."
    });
  }

  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.appendFile(submissionsFile, `${JSON.stringify(payload)}\n`, "utf-8");
    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, message: "Unable to save submission." });
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${port}`);
});
