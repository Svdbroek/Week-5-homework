const express = require("express");
const bodyParser = require("body-parser");
const parserMiddleware = bodyParser.json();
const app = express();
const port = 3000;

app.use(parserMiddleware);

app.post("/message", (req, res, nxt) => {
  if (req.body.text) {
    console.log(req.body.text),
      res.send({ message: "Message received loud and clear" });
  } else {
    res.status(400).send("Bad request");
  }
});

app.listen(port, console.log(`listening on ${port}`));
