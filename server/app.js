const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/video", (req, res) => {
  console.log(req.body.file);
  res.send("Video is being processed");
});
