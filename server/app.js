const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/video", (req, res) => {
  console.log(req);
  console.log("test");
  res.send("Video is being processed");
});
