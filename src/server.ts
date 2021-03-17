import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.json({ message: "Test" });
});

app.listen(3333);
