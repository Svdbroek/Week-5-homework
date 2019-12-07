//decided to do the work in a singlefile for github purposes
const Sequelize = require("sequelize");
const express = require("express");
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:cheesecake@localhost:5431/postgres";
const db = new Sequelize(databaseUrl);

// syncing the db
db.sync()
  .then(console.log("database connected"))
  .catch(console.error);

// defining a model

const Movie = db.define("movie", {
  title: {
    type: Sequelize.STRING
  },
  yearOfRealease: {
    type: Sequelize.INTEGER
  },
  synopsys: {
    type: Sequelize.STRING
  }
});
// creating some movies
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

// creating the express app server

const app = express();
const port = process.env.PORT || 4000;

app.listen(port, console.log(`listening on requests on port ${port}`));
