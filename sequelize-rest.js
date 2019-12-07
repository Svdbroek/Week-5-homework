//decided to do the work in a singlefile for github purposes
const Sequelize = require("sequelize");
const express = require("express");
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:cheesecake@localhost:5431/postgres";
const db = new Sequelize(databaseUrl);

// syncing the db
db.sync({ alter: true })
  .then(console.log("database connected"))
  .then(createMovies)
  .catch(console.error);

// defining a model

const Movie = db.define("movie", {
  title: {
    type: Sequelize.STRING,
    unique: true
    //using unique so the database doesn't fill up wit copies of the dummy data on server reset, not sure how to handle the error
  },
  yearOfRealease: {
    type: Sequelize.INTEGER
  },
  synopsys: {
    type: Sequelize.STRING
  }
});
//creating some data
function createMovies() {
  Movie.create({
    title: "Star Wars: Episode I - the Phantom Menace",
    yearOfRealease: 1999,
    synopsys: "Turmoil has engulfed the Galactic Republic..."
  });
  Movie.create({
    title: "Paprika",
    yearOfRealease: 2006,
    synopsys:
      "Paprika, a therapist, must save the day when a machine that allows therapists to enter the dreams of their patients is stolen"
  });

  Movie.create({
    title: "Hoodwinked",
    yearOfRealease: 2005,
    synopsys:
      "Grizzly and Stork are critter cops who are investigating a disturbance of the peace between Granny, her granddaughter Little Red Riding Hood, a Big Bad Wolf and a Woodsman..."
  });
}
// creating the express app server

const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const parserMiddleware = bodyParser.json();

//some middleware

app.use(parserMiddleware);
//endpoints

app.post("/movie", (req, res, nxt) => {
  Movie.create(req.body)
    .then(object => res.send(object))
    .catch(err => nxt(err));
});

app.get("/movie", (req, res, nxt) => {
  const limit = req.query.limit || 25;
  const offset = req.query.offset || 0;
  Movie.findAndCountAll({ limit, offset })
    .then(result => res.send({ Movies: result.rows, total: result.count }))
    .catch(error => next(error));
});

app.get("/movie/:id", (req, res, nxt) => {
  Movie.findByPk(req.params.id)
    .then(info => res.send(info))
    .catch(err => nxt(err));
});

app.put("/movie/:id", (req, res, nxt) => {
  Movie.findByPk(req.params.id)
    .then(movie => {
      if (movie) {
        movie.update(req.body).then(movie => res.send(movie));
      } else {
        nxt();
      }
    })
    .catch(err => nxt(err));
});

app.delete("/movie/:id", (req, res, nxt) => {
  Movie.findByPk(req.params.id)
    .then(movie => movie.destroy())
    .catch(err => nxt(err));
});

app.listen(port, console.log(`listening for requests on port ${port}`));
