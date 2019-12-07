const express = require("express");
const bodyParser = require("body-parser");
const parserMiddleware = bodyParser.json();
const app = express();
const port = 3000;

app.use(parserMiddleware);

app.post("/message", (req, res, nxt) => {
  console.log(req.body.text),
    res.send({ message: "Message received loud and clear" });
});

app.listen(port, console.log(`listening on ${port}`));
