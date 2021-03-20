import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.json({ message: "Test" });
});

app.listen(3333);
//https://www.youtube.com/watch?v=rCeGfFk-uCk 10:04
//https://www.youtube.com/watch?v=vAV4Vy4jfkc 08:37
