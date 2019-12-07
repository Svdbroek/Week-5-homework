const express = require("express");
const bodyParser = require("body-parser");
const parserMiddleware = bodyParser.json();
const app = express();
const port = 3000;

let count = 0;

function counterMiddleware(req, res, nxt) {
  count++;
  if (count > 5) {
    res.status(429).send("too many requests");
  } else nxt();
}

app.use(counterMiddleware);
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
